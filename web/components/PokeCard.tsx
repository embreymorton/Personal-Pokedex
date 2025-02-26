import { Pokemon } from "@/data/models/pokemon";
import { useQuery } from "@tanstack/react-query";
import Image from 'next/image';

type PokeCardProps = {
    name: string;
    url: string;
  };

export default function PokeCard({ name, url }: PokeCardProps) {

    const fetcher = async (): Promise<Pokemon> => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        const data = await response.json() as unknown as Pokemon;
        return data;
    }

    const { data, error, isLoading } = useQuery({
        queryKey: ['Pokemon', name],
        queryFn: fetcher
      });

    return (
        <div className="flex">
            <Image src={data?.sprites?.front_default || ''} alt={data?.name || 'Pokemon'} width={96} height={96} />
            {data ? <p>{data.name}</p> : null}
        </div>

    )
}