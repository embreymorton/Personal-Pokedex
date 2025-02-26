import { Pokemon } from "@/data/models/pokemon";
import { PokemonSpecies } from "@/data/models/pokemon-species";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

type PokemonDetailsPageProps = {pokemon: Pokemon, species: PokemonSpecies};
export default function PokemonDetailsPage({pokemon, species} : PokemonDetailsPageProps) {

    const router = useRouter();

    return (
        <>
            <p>{pokemon.name} details!</p>
            {pokemon.moves.map((move, index) => (
                <Link href={`/move/${move.move.name}`} key={index}>
                    <p>{move.move.name}</p>
                </Link>
                
            ))}
            <button type="button" onClick={() => router.back()}> Back </button>
        </>

    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const name = context.params!.name as string;
    
    const responsePokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const dataPokemon = await responsePokemon.json() as unknown as Pokemon;

    const responseSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
    const dataSpecies = await responseSpecies.json() as unknown as PokemonSpecies;

    return {
        props: {
            pokemon: dataPokemon,
            species: dataSpecies
        }
    }


}