import PokeCard from "@/components/PokeCard";
import { Pokemon } from "@/data/models/pokemon";
import { PokemonSpecies } from "@/data/models/pokemon-species";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { formatName } from "@/components/PokeCard";
import TypeCard from "@/components/TypeCard";

interface PokemonSize {
    height: number | string
    weight: number | string
}
function convertPokemonSize(size: PokemonSize): PokemonSize {
    const heightInFeet = (size.height as number) * 0.328084; // 1 decimeter = 0.328084 feet
    const feet = Math.floor(heightInFeet);
    const inches = Math.round((heightInFeet - feet) * 12);
    const weightInPounds = (size.weight as number) * 0.220462; // 1 hectogram = 0.220462 pounds

    return {
        height: `${feet}' ${inches.toString().padStart(2, '0')}"`,
        weight: weightInPounds.toFixed(1) + ' lbs'
    };
}

type PokemonDetailsPageProps = {pokemon: Pokemon, species: PokemonSpecies};
export default function PokemonDetailsPage({pokemon, species} : PokemonDetailsPageProps) {

    const router = useRouter();

    const size: PokemonSize = convertPokemonSize({height: pokemon.height, weight: pokemon.weight});

    return (
        <div className="p-4">
            <button className="bg-[#F0F0F0] text-black text-2xl w-20 rounded-xl mb-4" type="button" onClick={() => router.back()}> Back </button>

            <div className="flex flex-row items-center justify-center gap-8">
                <PokeCard name={pokemon.name} ></PokeCard>
                <div className="flex flex-col w-80 gap-4 ">
                    <h1 className="text-4xl"> {formatName(pokemon.name)} </h1>
                    <p>{species.flavor_text_entries[0].flavor_text}</p>
                    {pokemon.types.map((type) => (
                        <div key={type.slot}>
                            <p> Type {type.slot} </p>
                            <TypeCard name={type.type.name}></TypeCard>
                        </div>
                    ))}
                    <p>Height: {size.height}</p>
                    <p>Weight: {size.weight}</p>
                </div>
            </div>

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
            
        </div>

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