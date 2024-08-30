import { useState, useCallback, useEffect, useContext } from 'react';
import './App.css';
import { common_words as commonWords } from './data/common_words.ts';
import { getLocalIndex, focusEl } from './utils/utils.ts';
import { LETTERS_COUNT } from './utils/consts.ts'
import { Options } from './views/options.tsx';
import WordsContainer from './views/words_contianer.tsx';
import { Title } from './views/title.tsx';
import React from 'react';
import { ActiveIndexContext } from './providers/active_index_provider.tsx';
import { WordsStatesContext } from './providers/words_states_provider.tsx';


function App() {
  // console.clear();
  const { activeIndex, setActiveIndex } = useContext(ActiveIndexContext);
  const { words, setWords, states, setStates } = useContext(WordsStatesContext)

  const commonData = commonWords.split('\n');

  const filterByStatus = (
    filtered: string[],
    letter: string,
    letterStatus: number,
    lIndex: number
  ) =>
    letter.trim() === ''
      ? filtered
      : letterStatus === 0
        ? filtered.filter(
          (word) => !word.includes(letter)
          // || (word.includes(letter) && word[lIndex] != letter)
        )
        : letterStatus === 1
          ? filtered.filter(
            (word) => word.includes(letter) && word[lIndex] !== letter
          )
          : // letterStatus === 2
          filtered.filter((word) => word[lIndex] === letter);

  // const getFiltered = (words: string[][]) => {
  //   let allLetters = words
  //     .reduce((letters, word) => [...letters, ...word], [])
  //     .filter((el) => el != '');

  //   let letters = words.reduce((letters, word) => [...letters, ...word], []);
  //   let filtered = letters.reduce(
  //     (filtered: string[], letter: string, index: number) =>
  //       filterByStatus(
  //         filtered,
  //         letter,
  //         states[getLocalIndex(index)[0]][getLocalIndex(index)[1]],
  //         getLocalIndex(index)[1] // letterIndex
  //       ),
  //     // data
  //     []
  //   );
  //   return filtered;
  // };

  const updateFiltered = () => {
    // const filtered = getFiltered(words);
    // filtered.sort((a, b) => getTotalOptions(b,) - getTotalOptions(a));
    // filtered.sort((a, b) => commonData.indexOf(b) - commonData.indexOf(a));

    // setWordsList(filtered);
  };

  useEffect(() => {
    focusEl(activeIndex);
  }, []); // On init

  useEffect(() => {
    updateFiltered();
  
    if (words[0][0] == '') return;
    focusEl(activeIndex + 1);
  }, [words]);

  useEffect(() => {
    updateFiltered();
  }, [states]);

  // research
  // for (let ascii_code = 97; ascii_code <= 122; ascii_code++) {
  //   let letter = String.fromCharCode(ascii_code);
  //   console.log(letter);
  //   let newWords = [...words];
  //   newWords[0][0] = letter;

  //   let filtered = getFiltered(newWords);
  //   console.log(filtered.length);
  // }

  return (
    <>
      <Title />
      <WordsContainer />
      <Options />
    </>
  );
}

export default App;
