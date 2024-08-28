import React, { useContext } from "react";
import Word from "./word";
import { WordListContext } from "../providers/words_list_provider";
import { ActiveIndexContext } from "../providers/active_index_provider";
import { WordsStatesContext } from "../providers/words_states_provider";
import { getGlobalIndex, getInputValue } from "../utils/utils";
import { LETTERS_COUNT } from "../utils/consts";

const isWordEmtpy = (word: string[]) => word[0] == '';

export default function WordsContainer() {
    const { words, setWords, updateWordsLetter } = useContext(WordsStatesContext);
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

    return (
        <>
            <div className="words-container">
                {words.map((word, wIndex) =>
                    !isVisible(word, wIndex) ? (
                        <Word onLetterChange={(event, lIndex) => onLetterChange(event, wIndex, lIndex)}
                            onLetterFocus={lIndex => onLetterFocus(wIndex, lIndex)}
                            key={wIndex}
                            word={word} />
                    ) : ''
                )}
            </div>
        </>
    );
}