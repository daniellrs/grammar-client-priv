import React from "react";
import { api } from "../api";
import { ICheckGrammarResponse } from "../api/types";

export const useCheckGrammar = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [grammar, setGrammar] = React.useState<ICheckGrammarResponse>();

  const checkGrammar = async (sentence: string) => {
    try {
      setLoading(true);
      const response = await api.checkGrammar(sentence);
      setGrammar(response);
    } finally {
      setLoading(false);
    }
  };

  return { loading, grammar, setGrammar, checkGrammar };
};
