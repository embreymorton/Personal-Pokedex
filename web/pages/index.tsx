/** Home page. */

import PokeCard from "@/components/PokeCard";
import { Pokedex } from "@/data/models/pokedex";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

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
  <div className="h-screen p-6">
    <div className="flex flex-row items-center justify-center p-6">
      <button className="mr-4 text-5xl bg-[#F0F0F0] text-slate-700 w-72 h-20" onClick={() => setPage(page - 1)} disabled={page <= 0}>Previous</button>
      <button className="text-5xl bg-[#F0F0F0] text-slate-700 w-72 h-20" onClick={() => setPage(page + 1)} disabled={page >= maxPage - 1}>Next</button>
    </div>
    
    {isLoading ? <p>Loading...</p> : null}
    {error ? <p>Error: {error.message}</p> : null}

    <div className="flex flex-wrap gap-4 w-full items-center justify-center">
      {data ? (
        data.results.map((pokemon) => (
          <PokeCard key={pokemon.name} name={pokemon.name}/>
        ))
      ) : null}
    </div>
    
  </div>
)
}
