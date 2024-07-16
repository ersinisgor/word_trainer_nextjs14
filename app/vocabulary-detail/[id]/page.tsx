"use client";

// /app/vocabulary-detail/[id]/page.tsx

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { Vocabulary } from "../../types/vocabulary";
import { VocabularyDetailHeader } from "../../../components/vocabulary-detail/VocabularyDetailHeader";
import Link from "next/link";

const VocabularyDetailPage = () => {
  const { id } = useParams();
  const [vocabulary, setVocabulary] = useState<Vocabulary | null>(null);

  useEffect(() => {
    if (id) {
      console.log("ID from useParams:", id); // Add this line for debugging
      const vocabId = Array.isArray(id) ? id[0] : id;
      fetchVocabulary(vocabId);
    }
  }, [id]);

  const fetchVocabulary = async (vocabId: string) => {
    try {
      const response = await axios.get(`/api/vocabularies/${vocabId}`);
      console.log("API response:", response.data); // Add this line for debugging
      setVocabulary(response.data);
    } catch (error) {
      console.error("Failed to fetch vocabulary:", error);
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
      {/* Render VocabularyDetailHeader component */}
      <VocabularyDetailHeader vocabulary={vocabulary} />

      {/* Render the rest of your vocabulary detail content */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mb-8 text-custom-2">
          Vocabulary Detail
        </h1>
        <p className="text-5xl font-bold mb-8 text-custom-7">
          {vocabulary.word}
        </p>
        {/* Add more details about the vocabulary here */}
      </div>
    </div>
  );
};

export default VocabularyDetailPage;
