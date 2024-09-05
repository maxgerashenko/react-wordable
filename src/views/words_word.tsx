import Letter from "./words_letter";

export default function Word({ word,
    wordStates,
    onLetterChange,
    onLetterFocus,
    onLetterDoubleClick }: {
        word: string[],
        wordStates: number[][],
        onLetterChange: (event: Event, lIndex: number) => {},
        onLetterFocus: (lIndex: number) => {},
        onLetterDoubleClick: (lIndex: number) => {}
    }) {

    return (
        <>
            <div className="letters-container">
                {word.map((letter: string, lIndex: number) => (
                    <Letter
                        onDoubleClick={() => onLetterDoubleClick(lIndex)}
                        onInputChange={(event: Event) => onLetterChange(event, lIndex)}
                        onInputFocus={() => onLetterFocus(lIndex)}
                        state={wordStates[lIndex]}
                        key={lIndex}
                        letter={letter} />
                ))}
            </div>
        </>
    );
}