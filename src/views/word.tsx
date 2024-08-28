import React from "react";
import Letter from "./letter";

export default function Word({ word, onLetterChange }) {

    return (
        <>
            <div className="letters-container">
                {word.map((letter, lIndex) => (
                    <Letter
                        onInputChange={(input) => onLetterChange(input, lIndex)}
                        key={lIndex}
                        letter={letter} />
                ))}
            </div>
        </>
    );
}