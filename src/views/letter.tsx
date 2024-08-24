import React from "react";

const statusMap: { [key: number]: string } = {
    0: 'status-empty',
    1: 'status-exist',
    2: 'status-match',
};

export default function Letter({ letter, status, onDoubleClick, onInputFocus, onInputChange }) {
    return (
        <>
            <div
                // key={'' + lIndex}
                className={'input-letter ' + statusMap[status]}
                onDoubleClick={onDoubleClick}
            >
                <input
                    maxLength={1}
                    value={letter.toUpperCase()}
                    onFocus={onInputFocus}
                    onChange={onInputChange}
                />
            </div>
        </>
    );
}

// getLetterStatus(wIndex, lIndex)
// onInputFocus(getGlobalIndex(wIndex, lIndex))
// onDoubleClick(wIndex, lIndex)
// onInputChange(event as unknown as InputEvent, wIndex, lIndex)