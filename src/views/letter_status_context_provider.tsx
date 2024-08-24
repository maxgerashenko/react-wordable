import { useContext } from "react";
import { createContext } from 'react';
import { letters as letterStatus } from '../data/letters'

interface LetterStatusMap {
    [key: string]: number
}

export const LetterStatusContext = createContext<LetterStatusMap>(
    (letterStatus.split('\n')
        .map((el: string) => el.split(':'))
        .reduce((lettersStatsMap: LetterStatusMap, [letter, options]: [string, number]) =>
            ({ ...lettersStatsMap, ...{ [letter]: Number(options) } }), {})) as unknown as LetterStatusMap);


export function LetterStatusProvider({ children }) {
    let letterStatusContext = useContext(LetterStatusContext);

    return (
        <>
            <LetterStatusContext.Provider value={letterStatusContext}>
                {children}
            </LetterStatusContext.Provider>
        </>
    )
}