export interface ICurrentDateResponse {
  date: string;
}

export interface ISentenceTypesResponse {
  types: string[];
}

export interface IRandomSentenceResponse {
  sentence: string;
}

export interface ICheckGrammarResponse {
  correct: boolean;
  errors?: string;
}

export interface ITransformSentenceResponse {
  sentence: string;
}
