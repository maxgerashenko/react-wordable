import { createContext } from 'react';
import { letters as letterStatus } from '../../data/letters'

interface LetterStatusMap {
    [key: string]: number
}

export const LetterStatusContext = createContext<LetterStatusMap>(
    (letterStatus.split('\n')
        .map((el: string) => el.split(':'))
        .reduce((lettersStatsMap: LetterStatusMap, [letter, options]: [string, number]) =>
            ({ ...lettersStatsMap, ...{ [letter]: Number(options) } }), {})) as unknown as LetterStatusMap);
