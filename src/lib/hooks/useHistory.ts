import React from "react";
import { IHistory } from "../types";

export const useHistory = () => {
  const [history, setHistory] = React.useState<IHistory[]>([]);

  const saveToHistory = (
    sentence: string,
    transformedSentence: string,
    type: string
  ) => {
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    const newHistory = [
      { sentence, transformedSentence, type },
      ...history.splice(0, 7),
    ];
    setHistory(newHistory);
    localStorage.setItem("history", JSON.stringify(newHistory));
  };

  const loadHistory = () => {
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    setHistory(history);
  };

  return { history, saveToHistory, loadHistory };
};
