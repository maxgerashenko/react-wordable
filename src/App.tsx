import { useState, useCallback, useEffect, useContext } from 'react';
import './App.css';
import { common_words as commonWords } from './data/common_words.ts';
import { getLocalIndex, focusNextEl } from './utils/utils.ts';
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

  const updateState = useCallback(
    (wIndex: number, lIndex: number, newState?: number) => {
      let newStates = [...states];
      if (newState === null) return;
      newStates[wIndex]![lIndex]! = newState;
      // let letter = words[wIndex][lIndex];
      // let newStates = states.map((word, wI) =>
      //   word.map((oldState, lI) =>
      //     newState == null
      //       ? wI > 0 && states[wI - 1][lI] === 2
      //         ? 2
      //         : oldState
      //       : (words[wI][lI] === letter && oldState === 0) ||
      //         (wIndex == wI && lIndex == lI)
      //         ? newState
      //         : oldState
      //   )
      // );

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

      setStates(newStates);
    }
    , []);

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

  const updateFilter = () => {
    // const filtered = getFiltered(words);
    // filtered.sort((a, b) => getTotalOptions(b,) - getTotalOptions(a));
    // filtered.sort((a, b) => commonData.indexOf(b) - commonData.indexOf(a));

    // setWordsList(filtered);
  };

  useEffect(() => {
    focusNextEl(-1);
  }, []); // On init

  useEffect(() => {
    updateFilter();
    focusNextEl(activeIndex);
  }, [words]);

  useEffect(() => {
    updateFilter();
  }, [states]);

  // const onInputChange = (event: InputEvent, wIndex: number, lIndex: number) => {
  //   let newWords = [...words];
  //   newWords[wIndex] = [...words[wIndex]];
  //   newWords[wIndex][lIndex] = input;
  //   setWords(newWords);
  //   (event.target as HTMLInputElement).blur();
  // };

  // const handleClick = useCallback((wIndex: number, lIndex: number) => {
  //   let newState = (states[wIndex][lIndex] + 1) % 3;
  //   updateState(wIndex, lIndex, newState);
  //   updateFilter();
  // }, []);


  // research
  // for (let ascii_code = 97; ascii_code <= 122; ascii_code++) {
  //   let letter = String.fromCharCode(ascii_code);
  //   console.log(letter);
  //   let newWords = [...words];
  //   newWords[0][0] = letter;

  //   let filtered = getFiltered(newWords);
  //   console.log(filtered.length);
  // }

  const onInputFocus = (index: number) => {
    setActiveIndex(index);
  }

  return (
    <>
      <Title />
      <WordsContainer />
      <Options />
    </>
  );
}

export default App;
