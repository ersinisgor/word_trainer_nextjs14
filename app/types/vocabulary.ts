export interface Vocabulary {
  _id: string;
  word: string;
  meanings: {
    isFirstMeaning: boolean;
    turkishMeanings: string[];
    sideNotes: string[];
  };
  englishExpression: string;
  exampleSentences: {
    originalSentence: string;
    clozeSentence: string;
    hiddenWord: string;
  }[];
  imageUrl: string;
  type: string;
  tags: string[];
}
