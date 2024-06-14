"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Vocabulary } from "../types/vocabulary";
import { Button } from "@/components/ui/button";
import { FaHome, FaTimes } from "react-icons/fa";

const VocabularyList = () => {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);

  useEffect(() => {
    const storedVocabularies = localStorage.getItem("vocabularies");
    if (storedVocabularies) {
      setVocabularies(JSON.parse(storedVocabularies));
    }
  }, []);

  const handleDeleteWord = (wordId: string) => {
    const updatedVocabularies = vocabularies.filter(
      vocabulary => vocabulary.wordId !== wordId
    );
    setVocabularies(updatedVocabularies);
    localStorage.setItem("vocabularies", JSON.stringify(updatedVocabularies));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-24 ">
      <div className="self-end mb-10">
        <Link href="/">
          <Button variant={"customSmIcon"}>
            <FaHome />
          </Button>
        </Link>
      </div>
      <h1 className="text-4xl font-bold mb-8 text-custom-4">Vocabulary List</h1>
      <ul className="w-full max-w-md space-y-4">
        {vocabularies.map(vocabulary => (
          <li
            key={vocabulary.wordId}
            className="p-4 border rounded flex justify-between"
          >
            <Link
              href={`/vocabulary-detail/${vocabulary.wordId}`}
              className="text-xl font-bold text-custom-9"
            >
              {vocabulary.word}
            </Link>
            <Button
              className="bg-custom-7 text-custom-1 hover:bg-custom-6 hover:text-custom-3"
              size="icon"
              onClick={() => handleDeleteWord(vocabulary.wordId)}
            >
              <FaTimes />
            </Button>
          </li>
        ))}
      </ul>
      {/* <div className="mt-8">
        <Link href="/">
          <Button variant={"customSm1"}>
            <FaHome />
          </Button>
        </Link>
      </div> */}
    </div>
  );
};

export default VocabularyList;
