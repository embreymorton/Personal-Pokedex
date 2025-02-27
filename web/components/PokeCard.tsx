import { Pokemon } from "@/data/models/pokemon";
import { useQuery } from "@tanstack/react-query";
import Image from 'next/image';
import Link from "next/link";
import { useState } from "react";
import TypeCard from "./TypeCard";

type PokeCardProps = {
    name: string;
  };

export default function PokeCard({ name }: PokeCardProps) {

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

    function formatPokedexIndex(num: number, length: number = 4): string {
        return num.toString().padStart(length, '0');
    }

    function formatName(name: string): string {
        return name
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    return (
        <div>
            <Link href={`/pokemon/${name}`}>
                <div className="flex flex-col p-4 rounded-xl bg-[#F0F0F0] w-72 items-center">
                    <div className="text-slate-700 text-4xl mr-auto">
                        {data ? <p>{formatPokedexIndex(data.id)}</p> : null}
                    </div>
                
                    <button onClick={() => setDirection(!direction)}>
                        <Image src={data?.sprites?.front_default || ''} alt={data?.name || 'Pokemon'} width={180} height={180} />  
                    </button>
     
                    <div className="text-slate-700 text-2xl">
                        <p> {data ? <p>{formatName(data.name)}</p> : null} </p>
                    </div>

                    <div className="flex flex-row gap-2 p-2">
                        {data?.types.map((type) => (
                            <TypeCard key={type.type.name} name={type.type.name}></TypeCard>
                        ))}
                    </div>
                </div>
            </Link>

            {/* <button onClick={() => setDirection(!direction)}>
                {direction ? 
                <Image src={data?.sprites?.front_default || ''} alt={data?.name || 'Pokemon'} width={196} height={196} /> : 
                <Image src={data?.sprites?.back_default  || ''} alt={data?.name || 'Pokemon'} width={196} height={196} />}   
             </button> */}
            
        </div>
        

    )
}