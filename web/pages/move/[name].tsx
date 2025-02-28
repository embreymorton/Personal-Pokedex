import PokeCard from "@/components/PokeCard";
import TypeCard from "@/components/TypeCard";
import { Move } from "@/data/models/move";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";


type MoveDetailsPageProps = {move : Move}
export default function MoveDetailsPage({move} : MoveDetailsPageProps) {

    const router = useRouter();

    return (
        <div className="p-6 bg-slate-300">
            <button className="bg-white text-black text-2xl min-w-24 h-10 border-4 border-slate-700 rounded-xl mb-4" type="button" onClick={() => router.back()}> Back </button>

            <div className="flex flex-row items-center justify-center gap-4">
                <div className="p-6 bg-white text-black border-4 border-slate-700 rounded-xl w-80 text-center">
                    <h1 className="text-6xl mb-4">{move.name}</h1>
                    <p className="text-2xl"> {move.flavor_text_entries[0].flavor_text}</p>
                </div>

                <div className="p-6 bg-white text-black border-4 border-slate-700 rounded-xl w-80 text-2xl">
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <p> Type: </p>
                        <TypeCard name={move.type.name} />
                    </div>
                    <p className="text-center mt-4"> Power: {move.power || "N/A"}</p>
                    <p className="text-center mt-4"> Accuracy: {move.accuracy || "N/A"}</p>
                </div>
            </div>

            <h2 className="flex text-5xl font-bold items-center justify-center p-4 text-slate-700"> Learned By </h2>
            <div className="flex flex-wrap gap-8 w-full items-center justify-center">
                    {move.learned_by_pokemon ? (
                      move.learned_by_pokemon.map((pokemon) => (
                        <div key={pokemon.name} className="">
                          <PokeCard name={pokemon.name}/>
                        </div>
            
                      ))
                    ) : null}
                  </div>
            
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) { 
    const name = context.params!.name as string;

    const response = await fetch(`https://pokeapi.co/api/v2/move/${name}`);
    const data = await response.json() as Move;

    return {
        props: {
            move: data
        }
    }
}