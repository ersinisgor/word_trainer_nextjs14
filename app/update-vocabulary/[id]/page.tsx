"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Vocabulary, ExampleSentence } from "../../types/vocabulary";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import axios from "axios";

const UpdateVocabulary = () => {
  const router = useRouter();
  const { id } = useParams();
  const [vocabulary, setVocabulary] = useState<Vocabulary | null>(null);
  const [updatedVocabulary, setUpdatedVocabulary] = useState<
    Omit<Vocabulary, "_id">
  >({
    word: "",
    meanings: { isFirstMeaning: true, turkishMeanings: [], sideNotes: [] },
    englishExpression: "",
    exampleSentences: [], // Ensure this is correctly typed
    imageUrl: "",
    type: "",
    tags: [],
  });

  useEffect(() => {
    if (!id) return;

    const fetchVocabulary = async () => {
      try {
        const response = await axios.get(`/api/vocabularies/${id}`);
        setVocabulary(response.data);
        const { _id, ...rest } = response.data;
        setUpdatedVocabulary(rest);
      } catch (error) {
        console.error("Failed to fetch vocabulary:", error);
      }
    };

    fetchVocabulary();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setUpdatedVocabulary(prev => ({ ...prev, [name]: value }));
  };

  const handleMeaningsChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    type: "turkishMeanings" | "sideNotes"
  ) => {
    const { value } = e.target;
    setUpdatedVocabulary(prev => ({
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
    setUpdatedVocabulary(prev => {
      const updatedExampleSentences = [...prev.exampleSentences];
      updatedExampleSentences[index] = {
        ...updatedExampleSentences[index],
        [name]: value,
      };
      return { ...prev, exampleSentences: updatedExampleSentences };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.put(`/api/vocabularies/${id}`, updatedVocabulary);
      router.push("/vocabulary-list");
    } catch (error) {
      console.error("Failed to update vocabulary:", error);
    }
  };

  if (!vocabulary) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold mb-8 text-custom-7">
          Vocabulary Not Found
        </h1>
        <div className="flex space-x-4">
          <Link
            href="/vocabulary-list"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Back
          </Link>
          <Link href="/" className="px-4 py-2 bg-green-500 text-white rounded">
            Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 my-2">
      <h1 className="text-4xl font-bold mb-8 text-custom-2">
        Update Vocabulary
      </h1>
      <h1 className="text-5xl font-bold mb-8 text-custom-7">
        {vocabulary.word}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <textarea
          name="turkishMeanings"
          placeholder="Turkish Meanings (slash separated) *"
          value={updatedVocabulary.meanings.turkishMeanings.join("/")}
          onChange={e => handleMeaningsChange(e, "turkishMeanings")}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="sideNotes"
          placeholder="Side Notes (slash separated)"
          value={updatedVocabulary.meanings.sideNotes.join("/")}
          onChange={e => handleMeaningsChange(e, "sideNotes")}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="englishExpression"
          placeholder="English Expression *"
          value={updatedVocabulary.englishExpression}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />

        {updatedVocabulary.exampleSentences.map((example, index) => (
          <div key={index}>
            <input
              type="text"
              name="originalSentence"
              placeholder="Original Sentence"
              value={example.originalSentence}
              onChange={e => handleExampleSentenceChange(e, index)}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="clozeSentence"
              placeholder="Cloze Sentence"
              value={example.clozeSentence}
              onChange={e => handleExampleSentenceChange(e, index)}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="text"
              name="hiddenWord"
              placeholder="Hidden Word"
              value={example.hiddenWord}
              onChange={e => handleExampleSentenceChange(e, index)}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
        ))}

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={updatedVocabulary.imageUrl}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="type"
          placeholder="Type *"
          value={updatedVocabulary.type}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
        />
        <textarea
          name="tags"
          placeholder="Tags (slash separated)"
          value={updatedVocabulary.tags.join("/")}
          onChange={e =>
            setUpdatedVocabulary(prev => ({
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
          <Link href={`/vocabulary-detail/${id}`} passHref>
            <Button variant={"customSm1"}>Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateVocabulary;
