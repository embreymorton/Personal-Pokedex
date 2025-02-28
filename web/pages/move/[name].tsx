import PokeCard, { formatName } from "@/components/PokeCard";
import TypeCard from "@/components/TypeCard";
import { Move } from "@/data/models/move";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";


type MoveDetailsPageProps = {move : Move}
export default function MoveDetailsPage({move} : MoveDetailsPageProps) {

    const router = useRouter();

    return (
        <div className="p-6 bg-slate-300">
            <button className="bg-white text-slate-700 text-3xl w-48 h-16 border-[6px] border-slate-700 rounded-xl mb-4 ml-32" type="button" onClick={() => router.back()}> Back </button>

            <div className="flex flex-col items-center justify-center gap-4">
                <div className="p-8 bg-white text-slate-700 border-8 border-slate-700 rounded-xl min-w-80 max-w-[1200px] text-center">
                    <h1 className="text-9xl mb-6 font-bold">{formatName(move.name)}</h1>
                    <p className="text-5xl"> {move.flavor_text_entries[0].flavor_text}</p>
                </div>

                <div className="p-8 bg-white text-slate-700 border-8 border-slate-700 rounded-xl w-96 text-4xl">
                    <div className="flex flex-row gap-2 items-center justify-center">
                        <p><strong>Type:</strong></p>
                        <TypeCard name={move.type.name} />
                    </div>
                    <p className="text-center mt-4"><strong>Power:</strong> {move.power || "N/A"}</p>
                    <p className="text-center mt-4"><strong>Accuracy:</strong> {move.accuracy || "N/A"}</p>
                </div>
            </div>

            <h2 className="flex text-5xl font-bold items-center justify-center p-4 text-slate-700 mt-8"> Learned By </h2>
            <div className="grid grid-cols-4 gap-4 max-w-[85rem] mx-auto">
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