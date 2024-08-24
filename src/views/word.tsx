import Letter from "./letter";

export default function Word({ word }) {
    return (
        <>
            <div className="letters-container">
                {word.map((letter, lIndex) => (
                    <Letter key={lIndex} letter={letter} />
                ))}
            </div>
        </>
    );
}