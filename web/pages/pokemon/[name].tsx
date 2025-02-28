import { useState } from "react";
import PokeCard, { formatPokedexIndex } from "@/components/PokeCard";
import { Pokemon } from "@/data/models/pokemon";
import { PokemonSpecies } from "@/data/models/pokemon-species";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { formatName } from "@/components/PokeCard";
import TypeCard, { typeColors } from "@/components/TypeCard";
import Image from "next/image";
import BackButton from "@/components/BackButton";

interface PokemonSize {
  height: number | string;
  weight: number | string;
}

function convertPokemonSize(size: PokemonSize): PokemonSize {
  const heightInFeet = (size.height as number) * 0.328084;
  const feet = Math.floor(heightInFeet);
  const inches = Math.round((heightInFeet - feet) * 12);
  const weightInPounds = (size.weight as number) * 0.220462;

  return {
    height: `${feet}' ${inches.toString().padStart(2, "0")}"`,
    weight: weightInPounds.toFixed(1) + " lbs",
  };
}

type PokemonDetailsPageProps = { pokemon: Pokemon; species: PokemonSpecies };

export default function PokemonDetailsPage({ pokemon, species }: PokemonDetailsPageProps) {
  const size: PokemonSize = convertPokemonSize({ height: pokemon.height, weight: pokemon.weight });
  const [direction, setDirection] = useState<boolean>(true);

  return (
    <div className="p-6 bg-slate-300 dark:bg-gray-900 min-h-screen transition-colors">

      {/* Back Button */}
      <BackButton />

      {/* Pokémon Info */}
      <div className="flex flex-row items-center justify-center gap-8">
        <div
          className="bg-white dark:bg-gray-800 flex flex-col items-center justify-center w-[30rem] rounded-3xl border-[6px] border-slate-700 dark:border-gray-500"
          style={{ borderColor: typeColors[pokemon.types[0].type.name].background }}
        >
          <div className="text-slate-700 dark:text-white text-4xl mr-auto p-8">
            <p>{formatPokedexIndex(pokemon.id)}</p>
          </div>
          <h1 className="mb-2 text-7xl text-slate-700 dark:text-white font-bold"> {formatName(pokemon.name)} </h1>

          <button className="mb-4" onClick={() => setDirection(!direction)}>
            {direction ? (
              <Image src={pokemon.sprites?.front_default || ""} alt={pokemon.name || "Pokemon"} width={250} height={250} />
            ) : (
              <Image src={pokemon.sprites?.back_default || ""} alt={pokemon.name || "Pokemon"} width={250} height={250} />
            )}
          </button>
        </div>

        {/* Pokémon Stats & Description */}
        <div className="flex flex-col gap-4 max-w-[30rem]">
          <div className="flex bg-white dark:bg-gray-800 text-slate-700 dark:text-white p-4 rounded-xl border-[6px] border-slate-700 dark:border-gray-500">
            <p className="text-3xl text-center">{species.flavor_text_entries[0].flavor_text}</p>
          </div>

          <div className="flex flex-row gap-4">
            <div className="flex flex-col w-[550px] gap-2 bg-white dark:bg-gray-800 text-slate-700 dark:text-white p-4 rounded-xl border-[6px] border-slate-700 dark:border-gray-500 items-center">
              <div className="flex flex-row gap-10 mt-4 mb-4">
                {pokemon.types.map((type) => (
                  <div key={type.slot}>
                    <p className="text-3xl ml-1 mb-3 font-bold"> Type {type.slot} </p>
                    <TypeCard name={type.type.name}></TypeCard>
                  </div>
                ))}
              </div>
              <p className="text-3xl font-bold mb-2">Height: {size.height}</p>
              <p className="text-3xl font-bold mb-2">Weight: {size.weight}</p>
            </div>
          </div>
        </div>

        {/* Evolution Section */}
        {species.evolves_from_species ? (
          <div className="bg-white dark:bg-gray-800 p-4 w-[26rem] h-[30.5rem] border-[6px] rounded-2xl border-slate-700 dark:border-gray-500">
            <div className="flex flex-col items-center">
              <p className="text-2xl mt-2 mb-4 text-slate-700 dark:text-white font-bold">Evolves From</p>
              <PokeCard name={species.evolves_from_species.name} />
            </div>
          </div>
        ) : null}
      </div>

      {/* Moves Section */}
      <h2 className="flex text-6xl font-bold items-center justify-center p-4 mb-4 text-slate-700 dark:text-white mt-4"> Moves </h2>
      <div className="grid grid-cols-6 gap-4 max-w-[85rem] mx-auto">
        {pokemon.moves.map((move, index) => (
          <Link href={`/move/${move.move.name}`} key={index}>
            <div className="transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
              <div className="flex flex-row bg-white dark:bg-gray-800 items-center justify-center rounded-xl p-2 border-slate-700 dark:border-gray-500 border-4">
                <p className="text-slate-700 dark:text-white text-xl font-bold">{formatName(move.move.name)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
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