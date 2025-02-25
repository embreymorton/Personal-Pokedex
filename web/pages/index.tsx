/** Home page. */

import { Pokedex } from "@/data/models/pokedex";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {

  const [page, setPage] = useState<number>(0);
  const [pokedex, setPokedex] = useState<Pokedex>();


  const fetcher = async (): Promise<Pokedex> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=50&offset=${page*50 + 1}`);
    const data = await response.json() as unknown as Pokedex;
    setPokedex(data);
    return data;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['pokedex', page],
    queryFn: fetcher
}); 



return (
  <div>
      {isLoading ? <p>Loading...</p> : null}
      {error ? <p>Error: {error.message}</p> : null}
      {data ? <p>{data.results.length}</p> : null}
  </div>
)
}
