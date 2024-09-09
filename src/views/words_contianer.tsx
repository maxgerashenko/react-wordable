import { ChangeEvent, useCallback, useContext } from "react";
import Word from "./words_word";
import { WordListContext } from "../providers/words_list_provider";
import { ActiveIndexContext } from "../providers/active_index_provider";
import { WordsStatesContext } from "../providers/words_states_provider";
import { deepCopy, getGlobalIndex, getInputValue } from "../utils/utils";
import { LETTERS_COUNT, STATES_COUNT } from "../utils/consts";

const isWordEmtpy = (word: string[]) => word[0] == '';

export default function WordsContainer() {
    const { states, updateStates, words, setWords } = useContext(WordsStatesContext);
    const { wordsList } = useContext(WordListContext);
    const { setActiveIndex } = useContext(ActiveIndexContext);

    const isWordlistEmpty = wordsList.length <= 1;
    const isPrevWordEmpty = (wIndex: number) =>
        (wIndex > 0 && words[wIndex - 1][LETTERS_COUNT - 1] === '')
    const isVisible = (word: string[], wIndex: number) =>
        (isWordlistEmpty && isWordEmtpy(word)) || isPrevWordEmpty(wIndex);
    const onLetterChange = (
        event: ChangeEvent<HTMLInputElement>,
        wIndex: number,
        lIndex: number) => {
        const letter = getInputValue(event);
        const newWords = deepCopy(words);
        newWords[wIndex][lIndex] = letter;
        setWords(newWords);
        // updateWordsLetter(words, wIndex, lIndex, letter);
        (event.target as HTMLInputElement).blur();
    };
    const onLetterFocus = (wIndex: number, lIndex: number) =>
        setActiveIndex(getGlobalIndex(wIndex, lIndex));

    const handleLetterDoubleClick = useCallback((wIndex: number, lIndex: number) => {
        const currentState = states[wIndex][lIndex];
        const newState = (currentState + 1) % STATES_COUNT;
        updateStates(wIndex, lIndex, newState);
    }, [states]);

    return (
        <>
            <div className="words-container">
                {words.map((word, wIndex) =>
                    !isVisible(word, wIndex) ? (
                        <Word
                            onLetterChange={(
                                event: ChangeEvent<HTMLInputElement>,
                                lIndex: number) => onLetterChange(event, wIndex, lIndex)}
                            onLetterFocus={(lIndex: number) =>
                                onLetterFocus(wIndex, lIndex)}
                            onLetterDoubleClick={(lIndex: number) =>
                                handleLetterDoubleClick(wIndex, lIndex)}
                            wordStates={states[wIndex]}
                            key={wIndex}
                            word={word} />
                    ) : ''
                )}
            </div>
        </>
    );
}