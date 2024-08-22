import React from "react";
import Option from "./option";
import "./options.css";


export function Options({ options }: { options: string[] }) {
  return (
    <>
      <h1>{options.length}</h1>
      <div className="word-box">
        {
          options.map((word, index) => (<Option key={index} word={word} />))
        }
      </div>
    </>
  );
}