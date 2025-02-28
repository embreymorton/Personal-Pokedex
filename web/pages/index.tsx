/** Home page. */

import PokeCard from "@/components/PokeCard";
import { Pokedex } from "@/data/models/pokedex";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Image from 'next/image';
import logo from "../assets/logo.png";

export default function Home() {

  const [page, setPage] = useState<number>(0);
  const maxPokemon = 1205;
  const maxPage = Math.ceil(maxPokemon / 50);
  const fetcher = async (): Promise<Pokedex> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${page*50}`);
    const data = await response.json() as unknown as Pokedex;
    return data;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['pokedex', page],
    queryFn: fetcher
  }); 

  return (
    <div className="p-6 bg-slate-300">
      <div className="flex flex-row items-center justify-center">
        <Image src={logo} alt="PokéDex Logo" width={128} height={128} className="w-32 h-32 mr-4"/>
        <h1 className="flex items-center justify-center text-8xl font-bold text-black"> PokéDex </h1>
        <Image src={logo} alt="PokéDex Logo" width={128} height={128} className="w-32 h-32 ml-4"/>
      </div>
      <div className="flex flex-row items-center justify-center p-6 gap-8">
        <button className=" text-4xl bg-white text-black w-72 h-20 font-bold rounded-2xl border-[6px] border-black hover:bg-gray-50" onClick={() => setPage(page - 1)} disabled={page <= 0}>Previous</button>
        <button className="text-4xl bg-white text-black w-72 h-20 font-bold rounded-2xl border-[6px] border-black hover:bg-gray-50" onClick={() => setPage(page + 1)} disabled={page >= maxPage - 1}>Next</button>
      </div>
      
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p>Error: {error.message}</p> : null}

      <div className="grid grid-cols-4 gap-4 max-w-[85rem] mx-auto">
        {data ? (
          data.results.map((pokemon) => (
            <div key={pokemon.name} className="">
              <PokeCard name={pokemon.name}/>
            </div>

          ))
        ) : null}
      </div>

      <div className="flex flex-row items-center justify-center p-6">
        <button className="mr-4 text-4xl bg-white text-black w-72 h-20 font-bold rounded-2xl border-[6px] border-black hover:bg-gray-50" onClick={() => setPage(page - 1)} disabled={page <= 0}>Previous</button>
        <button className="text-4xl bg-white text-black w-72 h-20 font-bold rounded-2xl border-[6px] border-black hover:bg-gray-50" onClick={() => setPage(page + 1)} disabled={page >= maxPage - 1}>Next</button>
      </div>
    </div>
  )
}
