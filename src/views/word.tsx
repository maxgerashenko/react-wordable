import React from "react";
import Letter from "./letter";

export default function Word({ word, onLetterChange, onLetterFocus }) {

    return (
        <>
            <div className="letters-container">
                {word.map((letter, lIndex) => (
                    <Letter
                        onInputChange={(event) => onLetterChange(event, lIndex)}
                        onInputFocus={() => onLetterFocus(lIndex)}
                        key={lIndex}
                        letter={letter} />
                ))}
            </div>
        </>
    );
}