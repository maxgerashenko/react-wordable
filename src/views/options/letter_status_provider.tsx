import { useContext } from "react";
import { LetterStatusContext } from "./letter_status_context";


export default function LetterStatusProvider({ children }) {
    let letterStatusContext = useContext(LetterStatusContext);

    return (
        <>
            <LetterStatusContext.Provider value={letterStatusContext}>
                {children}
            </LetterStatusContext.Provider>
        </>
    )
}