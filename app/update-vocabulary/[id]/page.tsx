// /app/update-vocabulary/[id]/page.tsx

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { Vocabulary } from "../../types/vocabulary";
import { UpdateVocabularyForm } from "../../../components/update-vocabulary/UpdateVocabularyForm";
import Link from "next/link";

const UpdateVocabularyPage = () => {
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
      <UpdateVocabularyForm
        id={id.toString()}
        updatedVocabulary={updatedVocabulary}
        setUpdatedVocabulary={setUpdatedVocabulary}
      />
    </div>
  );
};

export default UpdateVocabularyPage;
