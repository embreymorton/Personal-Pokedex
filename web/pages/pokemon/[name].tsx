import PokeCard from "@/components/PokeCard";
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
            <button type="button" onClick={() => router.back()}> Back </button>
            <h1 className="text-4xl">{pokemon.name} details!</h1>

            <PokeCard name={pokemon.name} ></PokeCard>

            {pokemon.types.map((type) => (
                <p key={type.slot}> Type {type.slot}: {type.type.name}</p>
            ))}

            <p> Description: {species.flavor_text_entries[0].flavor_text}</p>

            {species.evolves_from_species ? 
            <div>
                <p className="text-2xl">Evolves From</p>
                <PokeCard name={species.evolves_from_species.name} ></PokeCard> 
            </div>
            : null}

            <h2 className="text-2xl font-bold"> Moves </h2>
            {pokemon.moves.map((move, index) => (
                <Link href={`/move/${move.move.name}`} key={index}>
                    <p>{move.move.name}</p>
                </Link>
            ))}
            
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