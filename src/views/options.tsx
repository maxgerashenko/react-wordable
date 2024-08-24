import React, { useContext } from "react";
import Option from "./option";
import "./options.css";
import { WordListContext } from "../providers/words_list_provider";
import { ActiveIndexContext } from "../providers/active_index_provider";
import { WordsStatesContext } from "../providers/words_states_provider";
import { LETTERS_COUNT, WORDS_COUNT } from "../utils/consts";
import { getGlobalIndex } from "../utils/utils";


export function Options() {
  const { wordsList } = useContext(WordListContext);
  const { activeIndex, setActiveIndex } = useContext(ActiveIndexContext);
  const { words, setWords } = useContext(WordsStatesContext);

  const onWordClick = (word: string) => {
    let start =
      words.reduce(
        (start: number | null, word: string, index: number) =>
          word[0] === '' && start == null ? index : start,
        null
      ) ?? WORDS_COUNT - 1;

    let newWords = [...words];
    newWords[start as unknown as number] = word.split('');

    setActiveIndex(getGlobalIndex(start as unknown as number, LETTERS_COUNT - 1));
    setWords(newWords);
  };

  return (
    <>
      <h1>{wordsList.length}</h1>
      <div className="word-box">
        {
          wordsList.map(
            (word, index) => (
              <Option
                key={index}
                word={word}
                onWordClick={() => onWordClick(word)} />))
        }
      </div>
    </>
  );
}