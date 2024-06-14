"use client";

import { useState, useEffect } from "react";
import { Vocabulary } from "../types/vocabulary";
import { FaHome } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const NewWord = () => {
  // Retrieve stored vocabularies from local storage, or initialize to an empty array
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>(() => {
    if (typeof window !== "undefined") {
      const savedVocabularies = localStorage.getItem("vocabularies");
      return savedVocabularies ? JSON.parse(savedVocabularies) : [];
    }
    return [];
  });

  const [vocabulary, setVocabulary] = useState<Omit<Vocabulary, "wordId">>({
    word: "",
    meanings: { isFirstMeaning: true, turkishMeanings: [], sideNotes: [] },
    englishExpression: "",
    exampleSentences: [],
    imageUrl: "",
    type: "",
    tags: [],
  });

  // Save vocabularies to local storage whenever vocabularies state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("vocabularies", JSON.stringify(vocabularies));
    }
  }, [vocabularies]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setVocabulary(prev => ({ ...prev, [name]: value }));
  };

  const handleMeaningsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    type: "turkishMeanings" | "sideNotes"
  ) => {
    const { value } = e.target;
    setVocabulary(prev => ({
      ...prev,
      meanings: {
        ...prev.meanings,
        [type]: value.split("/"),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !vocabulary.word ||
      !vocabulary.meanings.turkishMeanings.length ||
      !vocabulary.englishExpression ||
      !vocabulary.exampleSentences.length ||
      !vocabulary.type
    ) {
      alert("Please fill in all the required fields marked with *.");
      return;
    }

    const newVocabulary: Vocabulary = {
      ...vocabulary,
      wordId: (vocabularies.length + 1).toString(),
    };
    setVocabularies(prev => [...prev, newVocabulary]);

    console.log(newVocabulary);

    // Reset form after submission
    setVocabulary({
      word: "",
      meanings: { isFirstMeaning: true, turkishMeanings: [], sideNotes: [] },
      englishExpression: "",
      exampleSentences: [],
      imageUrl: "",
      type: "",
      tags: [],
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8 text-custom-2">Add New Word</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="text"
          name="word"
          placeholder="Word *"
          value={vocabulary.word}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="turkishMeanings"
          placeholder="Turkish Meanings (slash separated) *"
          value={vocabulary.meanings.turkishMeanings.join("/")}
          onChange={e => handleMeaningsChange(e, "turkishMeanings")}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="sideNotes"
          placeholder="Side Notes (slash separated)"
          value={vocabulary.meanings.sideNotes.join("/")}
          onChange={e => handleMeaningsChange(e, "sideNotes")}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="englishExpression"
          placeholder="English Expression *"
          value={vocabulary.englishExpression}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="exampleSentences"
          placeholder="Example Sentences (slash separated) *"
          value={vocabulary.exampleSentences.join("/")}
          onChange={e =>
            setVocabulary(prev => ({
              ...prev,
              exampleSentences: e.target.value.split("/"),
            }))
          }
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={vocabulary.imageUrl}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="type"
          placeholder="Type *"
          value={vocabulary.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="tags"
          placeholder="Tags (slash separated)"
          value={vocabulary.tags.join("/")}
          onChange={e =>
            setVocabulary(prev => ({
              ...prev,
              tags: e.target.value.split("/"),
            }))
          }
          className="w-full px-4 py-2 border rounded"
        />
        <div className="flex items-center justify-start gap-5">
          <Button type="submit" variant={"customSm1"}>
            Save
          </Button>
          <Link href="/" passHref>
            <Button variant={"customSm1"}>
              <FaHome />
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewWord;
