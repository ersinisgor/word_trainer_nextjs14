"use client";

import { useState } from "react";
import { Vocabulary } from "../types/vocabulary";

const NewWord = () => {
  const [vocabulary, setVocabulary] = useState<Vocabulary>({
    word: "",
    wordId: "",
    meanings: { isFirstMeaning: true, turkishMeanings: [], sideNotes: [] },
    englishExpression: "",
    exampleSentences: [],
    imageUrl: "",
    type: "",
    tags: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setVocabulary(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add logic to save the vocabulary
    console.log(vocabulary);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Add New Word</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="text"
          name="word"
          placeholder="Word"
          value={vocabulary.word}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="turkishMeanings"
          placeholder="Turkish Meanings"
          value={vocabulary.meanings.turkishMeanings.join(", ")}
          onChange={e =>
            setVocabulary(prev => ({
              ...prev,
              meanings: {
                ...prev.meanings,
                turkishMeanings: e.target.value.split(", "),
              },
            }))
          }
          className="w-full px-4 py-2 border rounded"
        />
        {/* Add more fields for other properties */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default NewWord;
