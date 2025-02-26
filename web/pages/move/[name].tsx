import { Move } from "@/data/models/move";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";


type MoveDetailsPageProps = {move : Move}
export default function MoveDetailsPage({move} : MoveDetailsPageProps) {

    const router = useRouter();

    return (
        <>
        <button type="button" onClick={() => router.back()}> Back </button>
        <h1 className="text-4xl">{move.name} details!</h1>
        <p> Description: {move.flavor_text_entries[0].flavor_text}</p>
        <p> Type: {move.type.name}</p>
        <p> Power: {move.power}</p>
        <p> Accuracy: {move.accuracy}</p>
        </>
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