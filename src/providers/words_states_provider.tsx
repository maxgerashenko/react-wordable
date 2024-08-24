import React, { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "react";
import { LETTERS_COUNT, WORDS_COUNT } from "../utils/consts";


const getMatrix = (value) => Array(WORDS_COUNT).fill(null).fill(Array(LETTERS_COUNT).fill(value));

export const WordsStatesContext = createContext<{
    words: string[][],
    setWords: Dispatch<SetStateAction<string[][]>>,
    states: number[][],
    setStates: Dispatch<SetStateAction<number[][]>>
}>({
    words: [[]], setWords: () => { },
    states: [[]], setStates: () => { },
});

export function WordsStatesProvider({ children }) {
    const [words, setWords] = useState<string[][]>(getMatrix(''));
    const [states, setStates] = useState<number[][]>(getMatrix(0));

    return (
        <>
            <WordsStatesContext.Provider value={{ words, setWords, states, setStates }}>
                {children}
            </WordsStatesContext.Provider>
        </>
    )
}