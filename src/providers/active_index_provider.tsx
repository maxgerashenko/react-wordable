import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import { createContext } from "react";


export const ActiveIndexContext = createContext<{
    activeIndex: number,
    setActiveIndex: Dispatch<SetStateAction<number>>
}>({ activeIndex: 0, setActiveIndex: () => { } });

export function ActiveIndexProvider({ children }: { children: ReactNode }) {
    const [activeIndex, setActiveIndex] = useState<number>(0);

    return (
        <>
            <ActiveIndexContext.Provider value={{ activeIndex, setActiveIndex }}>
                {children}
            </ActiveIndexContext.Provider>
        </>
    )
}