import { Pokemon } from "@/data/models/pokemon";
import { PokemonSpecies } from "@/data/models/pokemon-species";
import { GetServerSidePropsContext } from "next";

type PokemonDetailsPageProps = {pokemon: Pokemon, species: PokemonSpecies};
export default function PokemonDetailsPage({pokemon, species} : PokemonDetailsPageProps) {

    return (
        <>
            <p>{pokemon.name} details!</p>
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