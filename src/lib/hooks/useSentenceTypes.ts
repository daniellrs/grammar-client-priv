import React from "react";
import { api } from "../api";
import { ISelectOption } from "../types";

export const useSentenceTypes = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [selected, setSelected] = React.useState<ISelectOption>();
  const [options, setOptions] = React.useState<ISelectOption[]>([]);

  const getSentenceTypes = async () => {
    try {
      setLoading(true);
      const response = await api.sentenceTypes();
      const typeOptions = response.types.map((t) => ({ value: t, label: t }));
      setSelected(typeOptions.find((t) => t.value === "Joke"));
      setOptions(typeOptions);
    } finally {
      setLoading(false);
    }
  };

  return { loading, selected, options, setSelected, getSentenceTypes };
};
