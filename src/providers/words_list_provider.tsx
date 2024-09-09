import { Dispatch, ReactNode, SetStateAction, useCallback, useContext, useState } from "react";
import { createContext } from "react";
import { words as wordsData } from '../data/words.ts';
import { common_words as commonWords } from "../data/common_words.ts";
import { WordsStatesContext } from "./words_states_provider.tsx";
import { LETTER_STATES } from "../utils/consts.ts";


export const WordListContext = createContext<{
    wordsList: string[],
    updateWordsList: (wordsList: string[]) => Dispatch<SetStateAction<string[]>> | void,
    filterByStatus: (
        wordsList: string[],
        letter: string,
        letterStatus: number,
        lIndex: number,
    ) => string[],
    wordsDataArray: string[],
    commonWordsArray: string[],
}>({
    wordsList: [],
    updateWordsList: () => { },
    filterByStatus: () => [],
    wordsDataArray: [],
    commonWordsArray: [],
});

export function WordListProvider({ children }: { children: ReactNode }) {
    const wordsDataArray = wordsData.split('\n');
    const commonWordsArray = commonWords.split('\n');
    const [wordsList, setWordsList] = useState<string[]>(['other', ...wordsDataArray]);
    const { greenLettersMapIndex } = useContext(WordsStatesContext);

    const updateWordsList = (wordsList: string[]) => {
        if (wordsList.indexOf('snail') > 0) {
            wordsList = ['snail', ...wordsList];
        }
        return setWordsList(wordsList);
    }

    // FIX GREY and GREEN STATUS CONNER CASE
    // OTHER
    // SURGE
    // MERGE
    // ANSER SHOULD BE DIRGE
    const filterByStatus = (
        wordsList: string[],
        letter: string,
        letterStatus: number,
        lIndex: number
    ) =>
        letter.trim() === ''
            ? wordsList
            : (letterStatus === LETTER_STATES.GREY && !(letter in greenLettersMapIndex))
                ? wordsList.filter((word) => !word.includes(letter))
                : (letterStatus === LETTER_STATES.YELLOW && !(letter in greenLettersMapIndex))
                    ? wordsList.filter(
                        (word) => word.includes(letter) && word[lIndex] !== letter
                    )
                    : wordsList.filter((word) => word[lIndex] === letter);

    return (
        <>
            <WordListContext.Provider value={{
                wordsList,
                updateWordsList,
                filterByStatus,
                wordsDataArray,
                commonWordsArray,
            }}>
                {children}
            </WordListContext.Provider>
        </>
    )
}