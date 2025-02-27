
type TypeCardProps = {
    name: string
}

interface Dictionary<T> {
    [key: string]: T;
}

const typeColors: Dictionary<string> = {
    "bug": "#5A9542",
    "dark": "#656565",
    "dragon": "#FF5B50",
    "electric": "#F4CD48",
    "fairy": "#FFAEE2",
    "fighting": "#E45629",
    "fire": "#FF6A2E",
    "flying": "#00C3E9",
    "ghost": "#735795",
    "grass": "#83C555",
    "ground": "#A78B43",
    "ice": "#00C0E1",
    "normal": "#98A3A6",
    "poison": "#BB73BE",
    "psychic": "#FF54AC",
    "rock": "#A0802E",
    "steel": "#BCAFAF",
    "water": "#00B9B9"
}

export default function TypeCard({name}: TypeCardProps) {

    return (
        <>
            <div style={{ backgroundColor: typeColors[name] }} className="flex flex-row w-24 h-8 items-center justify-center rounded-xl">
                <p className="text-xl"> {name} </p>
            </div>
        </>
    )

}