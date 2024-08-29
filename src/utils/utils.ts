import { ChangeEvent } from 'react';
import { LETTERS_COUNT } from './consts'

export const getGlobalIndex = (wIndex: number, lIndex: number) =>
    wIndex * LETTERS_COUNT + lIndex;

export const getLocalIndex = (index: number): number[] => [
    ~~(index / LETTERS_COUNT),
    index % LETTERS_COUNT,
];

export const focusEl = (index: number) => {
    document.getElementsByTagName('input')[index]?.focus();
};

export const getTotalOptions = (word: string, lettersStatsMap: { [key: string]: number }) =>
    word.split('').reduce((sum, letter) => sum + lettersStatsMap[letter], 0);

export const getInputValue = (event: ChangeEvent<HTMLInputElement>) =>
    ((event.target as HTMLInputElement)?.value ?? '')
        .split('')
        .reverse()[0] + '';