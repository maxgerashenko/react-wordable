import { Dispatch, SetStateAction, useCallback, useState, createContext, ReactNode } from "react";
import { LETTERS_COUNT, LETTER_STATES, WORDS_COUNT } from "../utils/consts";
import { deepCopy, getGlobalIndex } from "../utils/utils";


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

    const refreshStates = () => {
        const greenLettersMapIndex: { [key: string]: number } = states.reduce((mapIndex, word, wI) =>
            word.map((state, lI) => {
                let statesCopy = deepCopy(states);


                if (state === LETTER_STATES.GREEN &&
                    mapIndex[word[lI]] == null) {
                    mapIndex[word[lI]] = getGlobalIndex(wI, lI);
                }
                return state;
            }
            ), {} as { [key: string]: number });


        setStates(states.reduce(
            (oldStates, word, wI) => states.map(
                (oldState, lI) => {
                    let letter = words[wIndex][lIndex] as string;
                    if (!(letter in greenLettersMapIndex) ||
                        getGlobalIndex(wIndex, lIndex) <= greenLettersMapIndex[letter]) return oldState;
                    return LETTER_STATES.GREEN;
                }), deepCopy(states)));
                
    }



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

}

const updateStates = useCallback(
    (wIndex: number, lIndex: number, newState: number) => {
        let newStates = deepCopy(states);
        newStates[wIndex][lIndex] = newState;
        refreshStates();

        return setStates(newStates);
    }
    , []);

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