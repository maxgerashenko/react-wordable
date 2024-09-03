import React, { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "react";
import { words as wordsData } from '../data/words.ts';
import { common_words as commonWords} from "../data/common_words.ts";


export const WordListContext = createContext<{
    wordsList: string[],
    setWordsList: Dispatch<SetStateAction<string[]>>,
    filterByStatus: (
        wordsList: string[],
        letter: string,
        letterStatus: number,
        lIndex: number,
    ) => string[],
    wordsDataArray: string[],
    commonWordsArray: [],
}>({
    wordsList: [],
    setWordsList: () => { },
    filterByStatus: () => [],
    wordsDataArray: [],
    commonWordsArray: [],
});


export function WordListProvider({ children }) {
    const wordsDataArray = wordsData.split('\n');
    const commonWordsArray = commonWords.split('\n');
    const [wordsList, setWordsList] = useState<string[]>(wordsDataArray);

    const filterByStatus = (
        wordsList: string[],
        letter: string,
        letterStatus: number,
        lIndex: number
    ) =>
        letter.trim() === ''
            ? wordsList
            : letterStatus === 0
                ? wordsList.filter(
                    (word) => !word.includes(letter)
                    // || (word.includes(letter) && word[lIndex] != letter)
                )
                : letterStatus === 1
                    ? wordsList.filter(
                        (word) => word.includes(letter) && word[lIndex] !== letter
                    )
                    : // letterStatus === 2
                    wordsList.filter((word) => word[lIndex] === letter);

    return (
        <>
            <WordListContext.Provider value={{
                wordsList,
                setWordsList,
                filterByStatus,
                wordsDataArray,
                commonWordsArray,
            }}>
                {children}
            </WordListContext.Provider>
        </>
    )
}