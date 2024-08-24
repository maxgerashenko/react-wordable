import React, { useContext } from "react";
import Option from "./option";
import "./options.css";
import { WordListContext } from "../providers/words_list_provider";


export function Options() {
  const { wordsList } = useContext(WordListContext);

  return (
    <>
      <h1>{wordsList.length}</h1>
      <div className="word-box">
        {
          wordsList.map((word, index) => (<Option key={index} word={word} />))
        }
      </div>
    </>
  );
}