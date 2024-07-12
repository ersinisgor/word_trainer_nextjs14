"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { Vocabulary } from "../../types/vocabulary";

const PracticeWord = () => {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const response = await axios.get("/api/vocabularies");
        setVocabularies(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch vocabularies");
        setLoading(false);
      }
    };

    fetchVocabularies();
  }, []);

  const handleNextWord = () => {
    setCurrentWordIndex(prev => (prev + 1) % vocabularies.length);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const vocabulary = vocabularies[currentWordIndex];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">Practice Word</h1>
      <div className="w-full max-w-md space-y-4">
        <div className="text-xl font-semibold">{vocabulary.word}</div>
        <div>{vocabulary.englishExpression}</div>
        <div>{vocabulary.meanings.turkishMeanings.join(", ")}</div>
        <div>{vocabulary.exampleSentences.join(" ")}</div>
        {/* Uncomment the below lines if you want to display the image */}
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
