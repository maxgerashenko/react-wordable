import React, { useContext } from "react";
import Word from "./word";
import { WordListContext } from "../providers/words_list_provider";
import { ActiveIndexContext } from "../providers/active_index_provider";
import { WordsStatesContext } from "../providers/words_states_provider";

export default function WordsContainer() {
    const { words, setWords } = useContext(WordsStatesContext);
    const { wordsList, setWordsList } = useContext(WordListContext);
    const { activeIndex, setActiveIndex } = useContext(ActiveIndexContext);

    const isWordlistEmpty = wordsList.length <= 1;
    const isWordEmtpy = (word: string[]) => word[0] == '';
    const isPrevWordEmpty = (wIndex: number) => (wIndex > 0 && words[wIndex - 1][0] === '')
    const isVisible = (word: string[], wIndex: number) =>
        (isWordlistEmpty && isWordEmtpy(word)) || isPrevWordEmpty(wIndex);

    return (
        <>
            <div className="words-container">
                {words.map((word, wIndex) =>
                    !isVisible(word, wIndex) ? (
                        <Word key={wIndex} word={word} />
                    ) : ''
                )}
            </div>
        </>
    );
}