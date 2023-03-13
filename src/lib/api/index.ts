import axios from "axios";
import { getDummyBearer } from "./auth";
import {
  ICheckGrammarResponse,
  ICurrentDateResponse,
  IRandomSentenceResponse,
  ISentenceTypesResponse,
  ITransformSentenceResponse,
} from "./types";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

axiosInstance.interceptors.request.use(async (config) => {
  if (config.url === "/current-date") return config;

  const bearer = await getDummyBearer();
  config.headers.Authorization = bearer;
  return config;
});

export const api = {
  async currentDate() {
    const { data } = await axiosInstance.get<ICurrentDateResponse>(
      "/current-date"
    );
    return data;
  },
  async sentenceTypes() {
    const { data } = await axiosInstance.get<ISentenceTypesResponse>(
      "/sentence-types"
    );
    return data;
  },
  async randomSentence() {
    const { data } = await axiosInstance.get<IRandomSentenceResponse>(
      "/random-sentence"
    );
    return data;
  },
  async checkGrammar(sentence: string) {
    const { data } = await axiosInstance.get<ICheckGrammarResponse>(
      "/check-grammar",
      {
        params: {
          sentence,
        },
      }
    );
    return data;
  },
  async transformSentence(sentence: string, type: string) {
    const { data } = await axiosInstance.get<ITransformSentenceResponse>(
      "/transform-sentence",
      {
        params: {
          sentence,
          type,
        },
      }
    );
    return data;
  },
};
