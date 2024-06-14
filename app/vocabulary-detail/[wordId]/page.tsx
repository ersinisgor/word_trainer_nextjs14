"use client";

import { useEffect, useState } from "react";
import { Vocabulary } from "../../types/vocabulary";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaHome } from "react-icons/fa";

const VocabularyDetail = ({ params }: { params: { wordId: string } }) => {
  const { wordId } = params;
  const [vocabulary, setVocabulary] = useState<Vocabulary | null>(null);

  useEffect(() => {
    if (!wordId) return; // Ensure wordId is available before proceeding

    const storedVocabularies = localStorage.getItem("vocabularies");
    if (storedVocabularies) {
      const vocabularies: Vocabulary[] = JSON.parse(storedVocabularies);
      const selectedVocabulary = vocabularies.find(v => v.wordId === wordId);
      setVocabulary(selectedVocabulary || null);
    }
  }, [wordId]);

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
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl font-bold mb-8 text-custom-2">
        {vocabulary.word}
      </h1>
      <ul className="w-full max-w-md space-y-4">
        <li className="p-4 border rounded">
          <h2 className="text-2xl font-bold text-custom-7 mb-3">
            {vocabulary.word}
          </h2>
          <p className="text-xl text-custom-9">
            Meanings: {vocabulary.meanings.turkishMeanings.join(" / ")}
          </p>
          <p className="text-xl text-custom-9">
            Side Notes: {vocabulary.meanings.sideNotes.join(" / ")}
          </p>
          <p className="text-xl text-custom-9">
            English Expression: {vocabulary.englishExpression}
          </p>
          <p className="text-xl text-custom-9">
            Example Sentences: {vocabulary.exampleSentences.join(" / ")}
          </p>
          <p className="text-xl text-custom-9">Type: {vocabulary.type}</p>
          <p className="text-xl text-custom-9">
            Tags: {vocabulary.tags.join(" / ")}
          </p>
          {vocabulary.imageUrl && (
            <Image
              src={vocabulary.imageUrl}
              alt={vocabulary.word}
              width={500}
              height={500}
              className="mt-2"
            />
          )}
        </li>
      </ul>
      <div className="flex space-x-4 mt-8">
        <Link href="/vocabulary-list" passHref>
          <Button variant={"customSm1"}>Back</Button>
        </Link>
        <Link href="/" passHref>
          <Button variant={"customSm1"}>
            <FaHome />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VocabularyDetail;
