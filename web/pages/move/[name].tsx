import { Move } from "@/data/models/move";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";


type MoveDetailsPageProps = {move : Move}
export default function MoveDetailsPage({move} : MoveDetailsPageProps) {

    const router = useRouter();

    return (
        <div className="p-6 bg-slate-300 h-screen">
            <button className="bg-white text-black text-2xl w-24 h-10 border-4 border-slate-700 rounded-xl mb-4" type="button" onClick={() => router.back()}> Back </button>
            <h1 className="text-4xl">{move.name} details!</h1>
            <p> Description: {move.flavor_text_entries[0].flavor_text}</p>
            <p> Type: {move.type.name}</p>
            <p> Power: {move.power}</p>
            <p> Accuracy: {move.accuracy}</p>
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