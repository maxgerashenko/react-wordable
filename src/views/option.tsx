import { useContext } from 'react';
import './option.css';
import { getTotalOptions } from '../utils/utils';
import { LetterStatusContext } from './letter_status_context_provider';
import React from 'react';

export default function Option({ word }: { word: string }) {
    const letterStatusMap = useContext(LetterStatusContext);

    const onWordClick = (word: string) => { };

    return (
        <>
            <div className="word">
                <button onClick={() => onWordClick(word)}>
                    {word.toUpperCase()} <h6>{getTotalOptions(word, letterStatusMap)}</h6>
                </button>
            </div>
        </>
    );
}
