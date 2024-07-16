export interface ExampleSentence {
  originalSentence: string;
  clozeSentence: string;
  hiddenWord: string;
}

export interface Vocabulary {
  _id: string;
  word: string;
  meanings: {
    isFirstMeaning: boolean;
    turkishMeanings: string[];
    sideNotes: string[];
  };
  englishExpression: string;
  exampleSentences: ExampleSentence[];
  imageUrl: string;
  type: string;
  tags: string[];
}
