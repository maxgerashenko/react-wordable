import React, { useContext } from "react";
import Word from "./word";
import { WordListContext } from "../providers/words_list_provider";

export default function WordsContainer({
    words,
}: {
    words: string[][],
}) {
    const { wordsList, setWordsList } = useContext(WordListContext);

    const isWordlistEmpty = wordsList.length <= 1;
    const isWordEmtpy = (word: string[]) => word[0] == '';
    const isPrevWordEmpty = (wIndex: number) => (wIndex > 0 && words[wIndex - 1][0] === '')
    const isVisible = (word: string[], wIndex: number) =>
        (isWordlistEmpty && isWordEmtpy(word)) || isPrevWordEmpty(wIndex);

        const {activeIndex, setActiveIndex} = useContext(ActiveIndexContext);
        

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