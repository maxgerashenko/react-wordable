import React from 'react';
import { useState, useCallback, useEffect, useContext } from 'react';
import './App.css';

import { getLocalIndex, focusEl, getTotalOptions } from './utils/utils.ts';
import { Options } from './views/options.tsx';
import WordsContainer from './views/words_contianer.tsx';
import { Title } from './views/title.tsx';
import { ActiveIndexContext } from './providers/active_index_provider.tsx';
import { WordsStatesContext } from './providers/words_states_provider.tsx';
import { WordListContext } from './providers/words_list_provider.tsx';
import { LetterStatusContext } from './providers/letter_status_provider.tsx';
import { LETTERS_COUNT } from './utils/consts.ts';


function App() {
  // console.clear();
  const { activeIndex, setActiveIndex } = useContext(ActiveIndexContext);
  const { words, setWords, states, setStates } = useContext(WordsStatesContext);
  const { filterByStatus, wordsDataArray, updateWordsList, commonWordsArray } = useContext(WordListContext);
  const letterStatusMap = useContext(LetterStatusContext);

  const getFiltered = (words: string[][]) => words
    .reduce((pre, letters) => [...pre, ...letters], [])
    .filter((el) => el != '')
    .reduce(
      (pre: string[], letter: string, index: number) =>
        filterByStatus(
          pre,
          letter,
          states[getLocalIndex(index)[0]][getLocalIndex(index)[1]],
          getLocalIndex(index)[1] // letterIndex
        ),
      wordsDataArray,
    );

  const updateFiltered = useCallback(() => {
    updateWordsList(getFiltered(words)
      .toSorted((a, b) => getTotalOptions(b, letterStatusMap) - getTotalOptions(a, letterStatusMap))
      .toSorted((a, b) => commonWordsArray.indexOf(b) - commonWordsArray.indexOf(a)));
  }, [words, states]);

  useEffect(() => {
    focusEl(activeIndex);
  }, []); // On init

  useEffect(() => {
    if (words[0][0] == '') return;
    focusEl(activeIndex + 1);

    if (words[0][LETTERS_COUNT - 1] == '') return;
    updateFiltered();
  }, [words]);

  useEffect(() => {
    if (words[0][LETTERS_COUNT - 1] == '') return;
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
