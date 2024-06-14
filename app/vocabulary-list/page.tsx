"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Vocabulary } from "../types/vocabulary";
import { Button } from "@/components/ui/button";
import { FaHome } from "react-icons/fa";

const VocabularyList = () => {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);

  useEffect(() => {
    const storedVocabularies = localStorage.getItem("vocabularies");
    if (storedVocabularies) {
      setVocabularies(JSON.parse(storedVocabularies));
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8 text-custom-4">Vocabulary List</h1>
      <ul className="w-full max-w-md space-y-4">
        {vocabularies.map(vocabulary => (
          <li key={vocabulary.wordId} className="p-4 border rounded">
            <Link
              href={`/vocabulary-detail/${vocabulary.wordId}`}
              className="text-xl font-bold text-custom-9"
            >
              {vocabulary.word}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Link href="/" passHref>
          <Button variant={"customSm1"}>
            <FaHome />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default VocabularyList;
