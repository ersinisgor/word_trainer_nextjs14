"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Vocabulary } from "../../types/vocabulary";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const UpdateVocabulary = () => {
  const router = useRouter();
  const { wordId } = useParams();
  const [vocabulary, setVocabulary] = useState<Vocabulary | null>(null);
  const [updatedVocabulary, setUpdatedVocabulary] = useState<
    Omit<Vocabulary, "wordId">
  >({
    word: "",
    meanings: { isFirstMeaning: true, turkishMeanings: [], sideNotes: [] },
    englishExpression: "",
    exampleSentences: [],
    imageUrl: "",
    type: "",
    tags: [],
  });

  useEffect(() => {
    if (!wordId) return; // Ensure wordId is available before proceeding

    const storedVocabularies = localStorage.getItem("vocabularies");
    if (storedVocabularies) {
      const vocabularies: Vocabulary[] = JSON.parse(storedVocabularies);
      const selectedVocabulary = vocabularies.find(v => v.wordId === wordId);
      setVocabulary(selectedVocabulary || null);
      if (selectedVocabulary) {
        setUpdatedVocabulary(selectedVocabulary);
      }
    }
  }, [wordId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedVocabularies = localStorage.getItem("vocabularies");
    if (storedVocabularies) {
      const vocabularies: Vocabulary[] = JSON.parse(storedVocabularies);
      const updatedVocabularies = vocabularies.map(v =>
        v.wordId === wordId ? { ...v, ...updatedVocabulary } : v
      );
      localStorage.setItem("vocabularies", JSON.stringify(updatedVocabularies));
      router.push("/vocabulary-list");
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
        <textarea
          name="exampleSentences"
          placeholder="Example Sentences (slash separated) *"
          value={updatedVocabulary.exampleSentences.join("/")}
          onChange={e =>
            setUpdatedVocabulary(prev => ({
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
          <Link href={`/vocabulary-detail/${vocabulary.wordId}`} passHref>
            <Button variant={"customSm1"}>Cancel</Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateVocabulary;
