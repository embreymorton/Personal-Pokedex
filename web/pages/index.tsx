/** Home page. */

import PokeCard from "@/components/PokeCard";
import { Pokedex } from "@/data/models/pokedex";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {

  const [page, setPage] = useState<number>(0);

  const maxPage = 27;

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
  <div>
    <button onClick={() => setPage(page + 1)} disabled={page >= maxPage - 1}>Next Page</button>
    <button onClick={() => setPage(page - 1)} disabled={page <= 0}>Previous Page</button>
    
    {isLoading ? <p>Loading...</p> : null}
    {error ? <p>Error: {error.message}</p> : null}
    {data ? (
      data.results.map((pokemon) => (
        <PokeCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
      ))
    ) : null}
  </div>
)
}
