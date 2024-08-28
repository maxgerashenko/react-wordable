import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { createContext } from "react";
import { LETTERS_COUNT, WORDS_COUNT } from "../utils/consts";


const getMatrix = (value) => Array(WORDS_COUNT).fill(null).fill(Array(LETTERS_COUNT).fill(value));

export const WordsStatesContext = createContext<{
    words: string[][],
    setWords: Dispatch<SetStateAction<string[][]>>,
    states: number[][],
    setStates: Dispatch<SetStateAction<number[][]>>,
    updateWordsLetter: (words: any, wIndex: any, lIndex: any, letter: any) => void,
}>({
    words: [[]], setWords: () => { },
    states: [[]], setStates: () => { },
});

export function WordsStatesProvider({ children }) {
    const [words, setWords] = useState<string[][]>(getMatrix(''));
    const [states, setStates] = useState<number[][]>(getMatrix(0));

    const updateWordsLetter = (words, wIndex, lIndex, letter) => {
        let newWords = [...words];
        newWords[wIndex] = [...words[wIndex]];
        newWords[wIndex][lIndex] = letter;
        setWords(newWords);
    }

    const updateState = useCallback(
        (wIndex: number, lIndex: number, newState: number[][]) => {
            let newStates = [...states];

            newStates[wIndex]![lIndex]! = newState;
            // let letter = words[wIndex][lIndex];
            // let newStates = states.map((word, wI) =>
            //   word.map((oldState, lI) =>
            //     newState == null
            //       ? wI > 0 && states[wI - 1][lI] === 2
            //         ? 2
            //         : oldState
            //       : (words[wI][lI] === letter && oldState === 0) ||
            //         (wIndex == wI && lIndex == lI)
            //         ? newState
            //         : oldState
            //   )
            // );

            // let matchMap: { [key: string]: number[] } = {};
            // for (let j = 0; j < words.length; j++)
            //   for (let i = 0; i < words[i].length; i++) {
            //     if (newStates[j][i] !== 2) continue;
            //     matchMap[words[j][i]] = [j, i];
            //   }

            // let newWords = [...words];
            // for (let letter of Object.keys(matchMap)) {
            //   for (let j = 0; j < words.length; j++) {
            //     if (j <= matchMap[letter][0] || states[j][i] !== 2) continue;

            //     newStates[j][matchMap[letter][1]] === 2;
            //     newWords[j][matchMap[letter][1]] = letter;
            //   }
            // }

            setStates(newStates);
        }
        , []);

    return (
        <>
            <WordsStatesContext.Provider value={{
                words,
                setWords,
                states,
                setStates,
                updateWordsLetter
            }}>
                {children}
            </WordsStatesContext.Provider>
        </>
    )
}