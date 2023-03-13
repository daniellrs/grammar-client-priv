import React from "react";
import { api } from "../api";

export const useRandomSentence = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [sentence, setSentence] = React.useState<string>();

  const getRandomSentence = async () => {
    try {
      setLoading(true);
      const response = await api.randomSentence();
      setSentence(response.sentence);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sentence, setSentence, getRandomSentence };
};
