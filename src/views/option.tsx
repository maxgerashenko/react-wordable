import { MouseEventHandler, useContext } from 'react';
import './option.css';
import { getTotalOptions } from '../utils/utils';
import { LetterStatusContext } from '../providers/letter_status_provider';
import React from 'react';

export default function Option({ word, onWordClick }: { word: string, onWordClick: MouseEventHandler<HTMLButtonElement> }) {
    const letterStatusMap = useContext(LetterStatusContext);

    return (
        <>
            <div className="word">
                <button onClick={onWordClick}>
                    {word.toUpperCase()} <h6>{getTotalOptions(word, letterStatusMap)}</h6>
                </button>
            </div>
        </>
    );
}
