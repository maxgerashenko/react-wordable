import React from "react";
import './option.css';

export default function Option({ word }: { word: string }) {
    const getTotalOptions = (word: string) => word.length;
    const onWordClick = (word: string) => { };

    return (
        <>
            <div className="word">
                <button onClick={() => onWordClick(word)}>
                    {word.toUpperCase()} <h6>{getTotalOptions(word)}</h6>
                </button>
            </div>
        </>
    );
}
