import React, { Dispatch, SetStateAction, useState } from "react";
import { createContext } from "react";
import { words as wordsData } from '../data/words.ts';


export const ActiveIndexContext = createContext<{
    activeIndex: number,
    setActiveIndex: Dispatch<SetStateAction<number>>
}>({ activeIndex: 0, setActiveIndex: () => { } });

export function ActiveIndexProvider({ children }) {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <>
            <ActiveIndexContext.Provider value={{ activeIndex, setActiveIndex }}>
                {children}
            </ActiveIndexContext.Provider>
        </>
    )
}