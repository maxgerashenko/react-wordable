import Letter from "./letter";
import Word from "./word";

export default function WordsContainer({ words,
    isWordlistEmpty }: {
        words: string[][],
        isWordlistEmpty: boolean,
    }) {
    const isWordEmtpy = (word: string[]) => word[0] == '';
    const isPrevWordEmpty = (wIndex: number) => (wIndex > 0 && words[wIndex - 1][0] === '')
    const isVisible = (word: string[], wIndex: number) => (isWordlistEmpty && isWordEmtpy(word)) || isPrevWordEmpty(wIndex)

    return (
        <>
            <div className="words-container">
                {words.map((word, wIndex) =>
                    isVisible(word, wIndex) ? (
                        <Word key={wIndex} word={word} />
                    ) : ''
                )}
            </div>
        </>
    );
}