import React, { useCallback, useContext } from "react";
import Word from "./words_word";
import { WordListContext } from "../providers/words_list_provider";
import { ActiveIndexContext } from "../providers/active_index_provider";
import { WordsStatesContext } from "../providers/words_states_provider";
import { getGlobalIndex, getInputValue } from "../utils/utils";
import { LETTERS_COUNT } from "../utils/consts";
import { LetterStatusContext } from "../providers/letter_status_provider";

const isWordEmtpy = (word: string[]) => word[0] == '';

export default function WordsContainer() {
    const { states, setStates, words, setWords, updateWordsLetter } = useContext(WordsStatesContext);
    const { wordsList, setWordsList } = useContext(WordListContext);
    const { activeIndex, setActiveIndex } = useContext(ActiveIndexContext);

    const isWordlistEmpty = wordsList.length <= 1;
    const isPrevWordEmpty = (wIndex: number) => (wIndex > 0 && words[wIndex - 1][LETTERS_COUNT - 1] === '')
    const isVisible = (word: string[], wIndex: number) =>
        (isWordlistEmpty && isWordEmtpy(word)) || isPrevWordEmpty(wIndex);
    const onLetterChange = (event, wIndex: number, lIndex: number) => {
        let letter = getInputValue(event);
        updateWordsLetter(words, wIndex, lIndex, letter);
        (event.target as HTMLInputElement).blur();
    };
    const onLetterFocus = (wIndex: number, lIndex: number) =>
        setActiveIndex(getGlobalIndex(wIndex, lIndex));

    const handleLetterDoubleClick = useCallback((wIndex: number, lIndex: number) => {
        let newState = (states[wIndex][lIndex] + 1) % 3;
        updateState(wIndex, lIndex, newState);
    }, []);

    const updateState = useCallback(
        (wIndex: number, lIndex: number, newState: number) => {
            let newStates = [...states];
            newStates[wIndex]![lIndex]! = newState;

            // let letter = words[wIndex][lIndex];
            // newStates = states.map((word, wI) =>
            //     word.map((oldState, lI) =>
            //         newState == null
            //             ? wI > 0 && states[wI - 1][lI] === 2
            //                 ? 2
            //                 : oldState
            //             : (words[wI][lI] === letter && oldState === 0) ||
            //                 (wIndex == wI && lIndex == lI)
            //                 ? newState
            //                 : oldState
            //     )
            // );

            // let matchMap: { [key: string]: number[] } = {};
            // for (let j = 0; j < words.length; j++)
            //     for (let i = 0; i < words[i].length; i++) {
            //         if (newStates[j][i] !== 2) continue;
            //         matchMap[words[j][i]] = [j, i];
            //     }

            // let newWords = [...words];
            // for (let letter of Object.keys(matchMap)) {
            //     for (let j = 0; j < words.length; j++) {
            //         if (j <= matchMap[letter][0] || states[j][1 || '!!!!!!!'] !== 2) continue;

            //         newStates[j][matchMap[letter][1]] === 2;
            //         newWords[j][matchMap[letter][1]] = letter;
            //     }
            // }

            setStates(newStates);
        }
        , []);


    return (
        <>
            <div className="words-container">
                {words.map((word, wIndex) =>
                    !isVisible(word, wIndex) ? (
                        <Word
                            onLetterChange={(event, lIndex) => onLetterChange(event, wIndex, lIndex)}
                            onLetterFocus={lIndex => onLetterFocus(wIndex, lIndex)}
                            onLetterDoubleClick={lIndex => handleLetterDoubleClick(wIndex, lIndex)}
                            wordStates={states[wIndex]}
                            key={wIndex}
                            word={word} />
                    ) : ''
                )}
            </div>
        </>
    );
}