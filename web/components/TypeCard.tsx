interface Dictionary<T> {
    [key: string]: T;
}

const typeColors: Dictionary<{ background: string, text: string }> = {
    "bug": { background: "#5A9542", text: "white" },
    "dark": { background: "#656565", text: "white" },
    "dragon": { background: "#FF5B50", text: "white" },
    "electric": { background: "#F4CD48", text: "black" },
    "fairy": { background: "#FFAEE2", text: "black" },
    "fighting": { background: "#E45629", text: "white" },
    "fire": { background: "#FF6A2E", text: "white" },
    "flying": { background: "#00C3E9", text: "black" },
    "ghost": { background: "#735795", text: "white" },
    "grass": { background: "#83C555", text: "black" },
    "ground": { background: "#A78B43", text: "white" },
    "ice": { background: "#00C0E1", text: "black" },
    "normal": { background: "#98A3A6", text: "black" },
    "poison": { background: "#BB73BE", text: "white" },
    "psychic": { background: "#FF54AC", text: "white" },
    "rock": { background: "#A0802E", text: "white" },
    "steel": { background: "#BCAFAF", text: "black" },
    "water": { background: "#00B9B9", text: "white" }
}

type TypeCardProps = {
    name: string
}

export default function TypeCard({name}: TypeCardProps) {
    const colors = typeColors[name];
    return (
        <>
            <div style={{ backgroundColor: colors.background, color: colors.text }} className="flex flex-row w-24 h-8 items-center justify-center rounded-xl">
                <p className="text-xl"> {name} </p>
            </div>
        </>
    )
}