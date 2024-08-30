import React, { ChangeEvent } from "react";
import { getInputValue } from "../utils/utils";

const statesMap: { [key: number]: string } = {
    0: 'status-empty',
    1: 'status-exist',
    2: 'status-match',
};

export default function Letter({ letter, state, onDoubleClick, onInputFocus, onInputChange }) {
    const onDoubleClickLocal = event => {
        if (letter == '') return;
        onDoubleClick(event);
    }

    return (
        <>
            <div
                className={'input-letter ' + statesMap[state]}
                onDoubleClick={event => onDoubleClickLocal(event)}
            >
                <input
                    maxLength={1}
                    value={letter.toUpperCase()}
                    onFocus={onInputFocus}
                    onChange={onInputChange}
                />
            </div >
        </>
    );
}

// getLetterStatus(wIndex, lIndex)
// onInputFocus(getGlobalIndex(wIndex, lIndex))
// onDoubleClick(wIndex, lIndex)
// onInputChange(event as unknown as InputEvent, wIndex, lIndex)