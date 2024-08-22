import { useState, ChangeEvent, useCallback, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { words as wordsData } from './data/words.ts';
import { common_words as commonWords } from './data/common_words.ts';
import { debounce, throttle } from 'lodash';
import { letters as lettersStats } from './data/letters.ts';

const LETTERS_COUNT = 5;

function App() {
  console.clear();
  const lettersStatsArray = lettersStats.split('\n').map((el) => el.split(':'));
  const data = wordsData.split('\n');
  const commonData = commonWords.split('\n');
  const [words, setWords] = useState<string[][]>(
    Array(6).fill(null).fill(Array(LETTERS_COUNT).fill(''))
  );
  const [wordsList, setWordsList] = useState<string[]>(data);
  const [states, setStates] = useState<number[][]>(
    Array(6).fill(null).fill(Array(LETTERS_COUNT).fill(0))
  );
  const lettersStatsMap = {};
  for (let [letter, options] of lettersStatsArray)
    lettersStatsMap[letter] = Number(options);

  const getGlobalIndex = (wIndex: number, lIndex: number) =>
    wIndex * LETTERS_COUNT + lIndex;
  const getLocalIndex = (index: number): number[] => [
    ~~(index / LETTERS_COUNT),
    index % LETTERS_COUNT,
  ];

  const focusNextEl = (index) => {
    document.getElementsByTagName('input')[index + 1].focus();
  };

  const updateState = useCallback(
    (wIndex: number, lIndex: number, newState?: number) => {
      let letter = words[wIndex][lIndex];
      let newStates = states.map((word, wI) =>
        word.map((oldState, lI) =>
          newState == null
            ? wI > 0 && states[wI - 1][lI] === 2
              ? 2
              : oldState
            : (words[wI][lI] === letter && oldState === 0) ||
              (wIndex == wI && lIndex == lI)
            ? newState
            : oldState
        )
      );

      let matchMap = {};
      for (let j = 0; j < words.length; j++)
        for (let i = 0; i < words[i].lenght; i++) {
          if (newStates[j][i] !== 2) continue;
          matchMap[words[j][i]] = [j, i];
        }

      let newWords = [...words];
      for (let letter of Object.keys(matchMap)) {
        for (let j = 0; j < words.lenght; j++) {
          if (j <= matchMap[letter][0] || states[j][i] !== 2) continue;

          newStates[j][matchMap[letter][1]] === 2;
          newWords[j][matchMap[letter][1]] = letter;
        }
      }

      setStates(newStates, () => {
        alert('!!!!!!!!!!!!!!!');
      });
    }
  );

  const filterByStatus = (
    filtered: string[],
    letter: string,
    letterStatus: string,
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

  const getFiltered = (words: sting[]) => {
    let allLetters = words
      .reduce((letters, word) => [...letters, ...word], [])
      .filter((el) => el != '');

    let letters = words.reduce((letters, word) => [...letters, ...word], []);
    let filtered = letters.reduce(
      (filtered: string[], letter: string, index: number) =>
        filterByStatus(
          filtered,
          letter,
          states[getLocalIndex(index)[0]][getLocalIndex(index)[1]],
          getLocalIndex(index)[1] // letterIndex
        ),
      data
    );
    return filtered;
  };

  const updateFilter = () => {
    const filtered = getFiltered(words);
    filtered.sort((a, b) => getTotalOptions(b) - getTotalOptions(a));
    filtered.sort((a, b) => commonData.indexOf(b) - commonData.indexOf(a));

    setWordsList(filtered, () => {
      alert('!!!!!!!!!!!!!');
    });
  };

  const statusMap = {
    0: 'status-empty',
    1: 'status-exist',
    2: 'status-match',
  };
  const getLetterStatus = (wIndex: number, lIndex: number): string =>
    statusMap[states[wIndex][lIndex]];

  const getInputValue = (event: Event) => {
    let input = event?.target?.value ?? '';
    return input.split('').reverse()[0] + '';
  };

  useEffect(() => {
    updateFilter(words);
    console.log(wordsList.length);
  }, [words, states]);

  const onInputChange = (event: Event, wIndex: number, lIndex: number) => {
    let input = getInputValue(event);

    let newWords = [...words];
    newWords[wIndex] = [...words[wIndex]];
    newWords[wIndex][lIndex] = input;
    setWords(newWords);
    event.target.blur();
    setTimeout(() => focusNextEl(getGlobalIndex(wIndex, lIndex)), 2000);
    updateState(wIndex, lIndex);
  };

  const handleClick = useCallback((wIndex: number, lIndex: number) => {
    let newState = (states[wIndex][lIndex] + 1) % 3;
    updateState(wIndex, lIndex, newState);
    updateFilter();
  });

  const onWordClick = (event: Event, word: string) => {
    let start =
      words.reduce(
        (start, word, index) =>
          word[0] === '' && start == null ? index : start,
        null
      ) ?? 4;

    let newWords = [...words];
    newWords[start] = word.split('');

    setWords(newWords);
  };

  // research
  // for (let ascii_code = 97; ascii_code <= 122; ascii_code++) {
  //   let letter = String.fromCharCode(ascii_code);
  //   console.log(letter);
  //   let newWords = [...words];
  //   newWords[0][0] = letter;

  //   let filtered = getFiltered(newWords);
  //   console.log(filtered.length);
  // }

  const getTotalOptions = (word: string) =>
    word.split('').reduce((sum, letter) => sum + lettersStatsMap[letter], 0);

  return (
    <>
      <h1>Wordable</h1>
      <div>
        <a href="https://wordly.org/" target="_blank">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Wordle_Logo.svg"
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>

      <div className="words-container">
        {words.map((word, wIndex) =>
          (wordsList.length <= 1 && word[0] == '') ||
          (wIndex > 0 && words[wIndex - 1][4] === '') ? (
            ''
          ) : (
            <div key={word} className="letters-container">
              {word.map((letter, lIndex) => (
                <div
                  key={'' + lIndex}
                  className={'input-letter ' + getLetterStatus(wIndex, lIndex)}
                  onDoubleClick={() => handleClick(wIndex, lIndex)}
                >
                  <input
                    maxlength="1"
                    value={letter.toUpperCase()}
                    onChange={(event) => onInputChange(event, wIndex, lIndex)}
                  />
                </div>
              ))}
            </div>
          )
        )}
      </div>

      <h1>{wordsList.length}</h1>
      <div className="word-box">
        {wordsList.map((word, index) => (
          <div className="word" key={word}>
            <button onClick={(event) => onWordClick(event, word)}>
              {word.toUpperCase()} <h6>{getTotalOptions(word)}</h6>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
