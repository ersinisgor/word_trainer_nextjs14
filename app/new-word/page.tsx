"use client";

import { useState } from "react";
import { Vocabulary } from "../types/vocabulary";
import { FaHome } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";

const NewWord = () => {
  const [vocabulary, setVocabulary] = useState<Omit<Vocabulary, "_id">>({
    word: "",
    meanings: { isFirstMeaning: true, turkishMeanings: [], sideNotes: [] },
    englishExpression: "",
    exampleSentences: [
      { originalSentence: "", hiddenWord: "", clozeSentence: "" },
      { originalSentence: "", hiddenWord: "", clozeSentence: "" },
      { originalSentence: "", hiddenWord: "", clozeSentence: "" },
    ],
    imageUrl: "",
    type: "",
    tags: [],
  });

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

  const handleExampleSentenceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setVocabulary(prev => {
      const updatedExampleSentences = [...prev.exampleSentences];
      updatedExampleSentences[index] = {
        ...updatedExampleSentences[index],
        [name]: value,
      };
      return { ...prev, exampleSentences: updatedExampleSentences };
    });
  };

  const generateClozeSentence = (sentence: string, hiddenWord: string) => {
    const underscore = "_".repeat(hiddenWord.length);
    return sentence.replace(new RegExp(hiddenWord, "gi"), underscore);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !vocabulary.word ||
      !vocabulary.meanings.turkishMeanings.length ||
      !vocabulary.englishExpression ||
      !vocabulary.exampleSentences.length
    ) {
      alert("Please fill in all the required fields marked with *.");
      return;
    }

    const lowercaseVocabulary = {
      word: vocabulary.word.toLowerCase(),
      meanings: {
        isFirstMeaning: vocabulary.meanings.isFirstMeaning,
        turkishMeanings: vocabulary.meanings.turkishMeanings.map(str =>
          str.toLowerCase()
        ),
        sideNotes: vocabulary.meanings.sideNotes.map(str => str.toLowerCase()),
      },
      englishExpression: vocabulary.englishExpression.toLowerCase(),
      exampleSentences: vocabulary.exampleSentences.map(example => ({
        ...example,
        originalSentence: example.originalSentence.toLowerCase(),
        clozeSentence: generateClozeSentence(
          example.originalSentence.toLowerCase(),
          example.hiddenWord.toLowerCase()
        ),
        hiddenWord: example.hiddenWord.toLowerCase(),
      })),
      imageUrl: vocabulary.imageUrl.toLowerCase(),
      type: vocabulary.type.toLowerCase(),
      tags: vocabulary.tags.map(str => str.toLowerCase()),
    };

    console.log("Submitting vocabulary:", lowercaseVocabulary);

    try {
      const response = await axios.post(
        "/api/vocabularies",
        lowercaseVocabulary
      );
      console.log("Vocabulary added:", response.data);

      // Reset form after submission
      setVocabulary({
        word: "",
        meanings: { isFirstMeaning: true, turkishMeanings: [], sideNotes: [] },
        englishExpression: "",
        exampleSentences: [
          { originalSentence: "", hiddenWord: "", clozeSentence: "" },
          { originalSentence: "", hiddenWord: "", clozeSentence: "" },
          { originalSentence: "", hiddenWord: "", clozeSentence: "" },
        ],
        imageUrl: "",
        type: "",
        tags: [],
      });
    } catch (error: any) {
      if (
        error.response &&
        error.response.data.error === "Duplicate word entry"
      ) {
        alert("This word already exists in the database.");
      } else {
        console.error("Error adding vocabulary:", error);
      }
    }
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
        {vocabulary.exampleSentences.map((example, index) => (
          <div key={index}>
            <input
              type="text"
              name="originalSentence"
              placeholder={`Example Sentence ${index + 1} *`}
              value={example.originalSentence}
              onChange={e => handleExampleSentenceChange(e, index)}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="hiddenWord"
              placeholder={`Hidden Word ${index + 1} *`}
              value={example.hiddenWord}
              onChange={e => handleExampleSentenceChange(e, index)}
              className="w-full px-4 py-2 border rounded mt-2"
            />
          </div>
        ))}
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
          placeholder="Type"
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
          <Link href="/">
            <Button variant={"customSmIcon"}>
              <FaHome />
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default NewWord;
