"use client";

import { useState } from "react";
import { vocabularies } from "../data/vocabularies";
import Image from "next/image";

const PracticeWord = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const vocabulary = vocabularies[currentWordIndex];

  const handleNextWord = () => {
    setCurrentWordIndex(prev => (prev + 1) % vocabularies.length);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Practice Word</h1>
      <div className="w-full max-w-md space-y-4">
        <div className="text-xl font-semibold">{vocabulary.word}</div>
        <div>{vocabulary.englishExpression}</div>
        <div>{vocabulary.meanings.turkishMeanings.join(", ")}</div>
        <div>{vocabulary.exampleSentences.join(" ")}</div>
        {/* <Image
          src={vocabulary.imageUrl}
          alt={vocabulary.word}
          className="w-full h-48 object-cover"
          width={800}
          height={500}
        /> */}
        <button
          onClick={handleNextWord}
          className="px-4 py-2 bg-custom-1 text-white rounded"
        >
          Next Word
        </button>
      </div>
    </div>
  );
};

export default PracticeWord;
