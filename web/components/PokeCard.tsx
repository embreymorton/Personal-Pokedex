import { Pokemon } from "@/data/models/pokemon";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import TypeCard from "./TypeCard";
import { typeColors } from "./TypeCard";

export function formatName(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatPokedexIndex(num: number, length: number = 4): string {
  return num.toString().padStart(length, "0");
}

type PokeCardProps = {
  name: string;
  scale?: number;
};

export default function PokeCard({ name }: PokeCardProps) {
  const fetcher = async (): Promise<Pokemon> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const data = await response.json() as unknown as Pokemon;
    return data;
  };

  const { data } = useQuery({
    queryKey: ["Pokemon", name],
    queryFn: fetcher,
  });

  return (
    <div className="transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl dark:hover:shadow-xl">
      <Link href={`/pokemon/${name}`}>
        <div
          className="flex flex-col p-4 rounded-xl bg-white dark:bg-gray-800 w-80 h-[22rem] items-center border-[6px] dark:border-gray-600"
          style={{
            borderColor: data?.types?.[0]?.type?.name
              ? typeColors[data.types[0].type.name].background
              : "slategray",
          }}
        >
          {/* Pokedex Index */}
          {data && (
            <div className="text-slate-700 dark:text-white text-4xl mr-auto">
              <p>{formatPokedexIndex(data.id)}</p>
            </div>
          )}

          {/* Pokémon Image */}
          {data?.sprites?.front_default ? (
            <Image
              src={data.sprites.front_default}
              alt={formatName(data.name)}
              width={180}
              height={180}
            />
          ) : (
            <div className="w-[180px] h-[180px] bg-gray-200 dark:bg-gray-700 rounded-md"></div> // Placeholder if image is missing
          )}

          {/* Pokémon Name */}
          {data && (
            <div className="text-slate-700 dark:text-white text-2xl font-bold line-clamp-1">
              <p>{formatName(data.name)}</p>
            </div>
          )}

          {/* Pokémon Types */}
          <div className="flex flex-row gap-2 p-2">
            {data?.types?.map((type) => (
              <TypeCard key={type.type.name} name={type.type.name} />
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
