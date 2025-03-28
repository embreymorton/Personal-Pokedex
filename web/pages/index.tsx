import PokeCard from "@/components/PokeCard";
import { Pokedex } from "@/data/models/pokedex";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Image from 'next/image';
import logo from "../assets/logo.png";

export default function Home() {
  const [page, setPage] = useState<number>(0);
  const maxPokemon = 1205;
  const maxPage = Math.ceil(maxPokemon / 48);

  const fetcher = async (): Promise<Pokedex> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=48&offset=${page * 48}`);
    const data = (await response.json()) as unknown as Pokedex;
    return data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["pokedex", page],
    queryFn: fetcher,
  });

  return (
    <div className="p-6 bg-slate-300 dark:bg-gray-900 min-h-screen transition-colors">

      {/* Header */}
      <div className="flex flex-row items-center justify-center">
        <Image src={logo} alt="PokéDex Logo" width={128} height={128} className="w-32 h-32 mr-4" />
        <h1 className="flex items-center justify-center text-8xl font-bold text-black dark:text-white">
          PokéDex
        </h1>
        <Image src={logo} alt="PokéDex Logo" width={128} height={128} className="w-32 h-32 ml-4" />
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-row items-center justify-center p-6 gap-8">
        <button
          className="text-4xl bg-white text-black dark:bg-gray-800 dark:text-white w-72 h-20 font-bold rounded-2xl border-[6px] border-black dark:border-white hover:bg-gray-50 dark:hover:bg-gray-600"
          onClick={() => setPage(page - 1)}
          disabled={page <= 0}
        >
          Previous
        </button>
        <button
          className="text-4xl bg-white text-black dark:bg-gray-800 dark:text-white w-72 h-20 font-bold rounded-2xl border-[6px] border-black dark:border-white hover:bg-gray-50 dark:hover:bg-gray-600"
          onClick={() => setPage(page + 1)}
          disabled={page >= maxPage - 1}
        >
          Next
        </button>
      </div>

      {/* Loading/Error Messages */}
        {isLoading && (
          <div className="flex items-center justify-center text-2xl text-black dark:text-white">
            <span className="animate-spin h-6 w-6 mr-2 border-4 border-t-transparent border-gray-900 dark:border-white rounded-full"></span>
            Loading...
          </div>
        )}

        {error && (
          <div className="bg-red-200 dark:bg-red-800 text-red-700 dark:text-red-300 p-4 rounded-md text-xl">
            ⚠️ Error: {error.message}
          </div>
        )}


      {/* Pokédex Grid */}
      <div className="grid grid-cols-4 gap-4 max-w-[85rem] mx-auto mb-20">
        {data &&
          data.results.map((pokemon) => (
            <div key={pokemon.name}>
              <PokeCard name={pokemon.name} />
            </div>
          ))}
      </div>
    </div>
  );
}
