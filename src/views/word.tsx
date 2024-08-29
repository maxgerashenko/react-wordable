import React from "react";
import Letter from "./letter";

export default function Word({ word, wordStates, onLetterChange, onLetterFocus, onLetterDoubleClick }) {

    return (
        <>
            <div className="letters-container">
                {word.map((letter, lIndex) => (
                    <Letter
                        onDoubleClick={event => onLetterDoubleClick(lIndex)}
                        onInputChange={(event) => onLetterChange(event, lIndex)}
                        onInputFocus={() => onLetterFocus(lIndex)}
                        state={wordStates[lIndex]}
                        key={lIndex}
                        letter={letter} />
                ))}
            </div>
        </>
    );
}