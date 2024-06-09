export interface Vocabulary {
  word: string;
  wordId: string;
  meanings: {
    isFirstMeaning: boolean;
    turkishMeanings: string[];
    sideNotes: string[];
  };
  englishExpression: string;
  exampleSentences: string[];
  imageUrl: string;
  type: string;
  tags: string[];
}
