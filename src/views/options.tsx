import React, { useContext } from "react";
import Option from "./option";
import "./options.css";
import { WordListContext } from "../providers/words_list_provider";
import { ActiveIndexContext } from "../providers/active_index_provider";


export function Options() {
  const { wordsList } = useContext(WordListContext);
  const {activeIndex, setActiveIndex} = useContext(ActiveIndexContext);

  const onWordClick = (word: string) => {
    //     let start =
    //       words.reduce(
    //         (start: number | null, word: string, index: number) =>
    //           word[0] === '' && start == null ? index : start,
    //         null
    //       ) ?? 4;

    //     let newWords = [...words];
    //     newWords[start as unknown as number] = word.split('');

    //     setWords(newWords);
    //     setActiveIndex((activeIndex) => activeIndex + 1);
  };

  return (
    <>
      <h1>{wordsList.length}</h1>
      <div className="word-box">
        {
          wordsList.map((word, index) => (<Option key={index} word={word} onWordClick={() => onWordClick(word)}/>))
        }
      </div>
    </>
  );
}