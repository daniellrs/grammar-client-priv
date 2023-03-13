import React from "react";
import { api } from "../api";

interface useTransformSentenceProps {
  saveToHistory: (
    sentence: string,
    transformedSentence: string,
    type: string
  ) => void;
}

export const useTransformSentence = (props: useTransformSentenceProps) => {
  const [loading, setLoading] = React.useState(false);
  const [sentence, setSentence] = React.useState<string>();

  const transformSentence = async (sentence?: string, type?: string) => {
    if (!sentence || !type) return;
    try {
      setLoading(true);
      const response = await api.transformSentence(sentence, type);
      setSentence(response.sentence);
      props.saveToHistory(sentence, response.sentence, type);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sentence, setSentence, transformSentence };
};
