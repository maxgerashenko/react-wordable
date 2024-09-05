import { Dispatch, SetStateAction, useCallback, useState, createContext, ReactNode } from "react";
import { LETTERS_COUNT, WORDS_COUNT } from "../utils/consts";


const getMatrix = (value: any) => Array(WORDS_COUNT)
    .fill(null)
    .fill(
        Array(LETTERS_COUNT).fill(value));

export const WordsStatesContext = createContext<{
    words: string[][],
    setWords: Dispatch<SetStateAction<string[][]>>,
    states: number[][],
    setStates: Dispatch<SetStateAction<number[][]>>,
}>({
    words: [[]], setWords: () => { },
    states: [[]], setStates: () => { },
});

export function WordsStatesProvider({ children }: { children: ReactNode }) {
    const [words, setWords] = useState<string[][]>(getMatrix(''));
    const [states, setStates] = useState<number[][]>(getMatrix(0));

    const updateState = useCallback(
        (wIndex: number, lIndex: number, newState: number) => {
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
            }}>
                {children}
            </WordsStatesContext.Provider>
        </>
    )
}