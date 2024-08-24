import React, { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "react";
import { words as wordsData } from '../data/words.ts';


interface LetterStatusMap {
    [key: string]: number
}

export const WordListContext = createContext<{
    wordsList: string[],
    setWordsList: Dispatch<SetStateAction<string[]>>
}>({ wordsList: [], setWordsList: () => { } });


export function WordListProvider({ children }) {
    const wordsArray = wordsData.split('\n');
    const [wordsList, setWordsList] = useState<string[]>(wordsArray);

    return (
        <>
            <WordListContext.Provider value={{ wordsList, setWordsList }}>
                {children}
            </WordListContext.Provider>
        </>
    )
}