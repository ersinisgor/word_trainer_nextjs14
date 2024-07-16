// /components/update-vocabulary/UpdateVocabularyForm.tsx

import React from "react";
import { Vocabulary } from "../../app/types/vocabulary";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

interface UpdateVocabularyFormProps {
  id: string;
  updatedVocabulary: Omit<Vocabulary, "_id">;
  setUpdatedVocabulary: React.Dispatch<
    React.SetStateAction<Omit<Vocabulary, "_id">>
  >;
}

export const UpdateVocabularyForm: React.FC<UpdateVocabularyFormProps> = ({
  id,
  updatedVocabulary,
  setUpdatedVocabulary,
}) => {
  const router = useRouter();

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

  return (
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
  );
};
