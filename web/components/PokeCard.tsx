import { Pokemon } from "@/data/models/pokemon";
import { useQuery } from "@tanstack/react-query";
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";

type PokeCardProps = {
    name: string;
    url: string;
  };

export default function PokeCard({ name, url }: PokeCardProps) {

    const [direction, setDirection] = useState<boolean>(true);

    const fetcher = async (): Promise<Pokemon> => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json() as unknown as Pokemon;
        return data;
    }

    const { data } = useQuery({
        queryKey: ['Pokemon', name],
        queryFn: fetcher
      });

    return (
        <div>
             <button onClick={() => setDirection(!direction)}>
                {direction ? <Image src={data?.sprites?.front_default || ''} alt={data?.name || 'Pokemon'} width={144} height={144} /> : 
                        <Image src={data?.sprites?.back_default || ''} alt={data?.name || 'Pokemon'} width={144} height={144} />}   
             </button>
            
            <Link href={`/pokemon/${name}`}>
                <div>
                    {data ? <p>{data.name}</p> : null}
                </div>
            </Link>
        
        </div>

    )
}