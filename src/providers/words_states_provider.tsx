import { Dispatch, SetStateAction, useCallback, useState, createContext, ReactNode } from "react";
import { LETTERS_COUNT, LETTER_STATES, WORDS_COUNT } from "../utils/consts";
import { deepCopy, getGlobalIndex, getLocalIndex } from "../utils/utils";


const getMatrix = (value: any) => Array(WORDS_COUNT)
    .fill(null)
    .fill(
        Array(LETTERS_COUNT).fill(value));

export const WordsStatesContext = createContext<{
    words: string[][],
    setWords: Dispatch<SetStateAction<string[][]>>,
    states: number[][],
    setStates: Dispatch<SetStateAction<number[][]>>,
    updateStates: (wIndex: number, lIndex: number, newState: number) => Dispatch<SetStateAction<number[][]>>,
    refreshStates: () => void,
}>({
    words: [[]], setWords: () => { },
    states: [[]], setStates: () => { },
});

export function WordsStatesProvider({ children }: { children: ReactNode }) {
    const [words, setWords] = useState<string[][]>(getMatrix(''));
    const [states, setStates] = useState<LETTER_STATES[][]>(getMatrix(0));

    const refreshStates = useCallback(() => {
        const greenLettersMapIndex: { [key: string]: number } = {};
        for (let wI = 0; wI < states.length; wI++)
            for (let lI = 0; lI < states[wI].length; lI++) {
                const letter = words[wI][lI];
                const state = states[wI][lI];

                if (state === LETTER_STATES.GREEN &&
                    greenLettersMapIndex[letter] == null) {
                    greenLettersMapIndex[letter] = getGlobalIndex(wI, lI);
                }
            }

        setStates(deepCopy(states).map(
            (row: LETTER_STATES[], wI: number) => row.map(
                (state: LETTER_STATES, lI: number) => {
                    let letter = words[wI][lI] as string;
                    if (!(letter in greenLettersMapIndex) ||
                        getGlobalIndex(wI, lI) <= greenLettersMapIndex[letter] ||
                        lI !== getLocalIndex(greenLettersMapIndex[letter])[1]
                    ) return state;
                    return LETTER_STATES.GREEN;
                })));
    }, [states, words])



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


    const updateStates = useCallback(
        (wIndex: number, lIndex: number, newState: number) => {
            let newStates = deepCopy(states);
            newStates[wIndex][lIndex] = newState;
            return setStates(newStates);
        }
        , [states]);

    return (
        <>
            <WordsStatesContext.Provider value={{
                words,
                setWords,
                states,
                setStates,
                updateStates,
                refreshStates,
            }}>
                {children}
            </WordsStatesContext.Provider>
        </>
    )
}
