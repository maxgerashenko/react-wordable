import { useContext } from 'react';
import './option.css';
import { LetterStatusContext } from './letterStatusContext';
import { getTotalOptions } from '../../utils/utils';

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
