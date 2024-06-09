import { Vocabulary } from "../types/vocabulary";

export const vocabularies: Vocabulary[] = [
  {
    word: "passage",
    wordId: "1",
    meanings: {
      isFirstMeaning: true,
      turkishMeanings: ["pasaj", "paragraf"],
      sideNotes: ["bir bölüm", "kitaptan bir parça"],
    },
    englishExpression:
      "a short part of a book, poem, speech, piece of music etc.",
    exampleSentences: [
      "I read a passage from the book.",
      "The passage was about the history of the city.",
      "The passage was very difficult to understand",
    ],
    imageUrl: "https://example.com/passage.jpg",
    type: "noun",
    tags: ["B2", "Noun", "Pre-Intermediate Words"],
  },
  // Add more words here
];
