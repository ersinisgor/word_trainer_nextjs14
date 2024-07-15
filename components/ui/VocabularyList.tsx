"use client";

import { useState, useEffect } from "react";
import { Vocabulary } from "../../app/types/vocabulary";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const VocabularyList = () => {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedVocabularies = localStorage.getItem("vocabularies");
      if (savedVocabularies) {
        setVocabularies(JSON.parse(savedVocabularies));
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8 text-custom-2">Vocabulary List</h1>
      {vocabularies.length > 0 ? (
        <ul className="w-full max-w-md space-y-4">
          {vocabularies.map(vocabulary => (
            <li key={vocabulary._id} className="p-4 border rounded">
              <h2 className="text-2xl font-bold">{vocabulary.word}</h2>
              <p>Meanings: {vocabulary.meanings.turkishMeanings.join(" / ")}</p>
              <p>Side Notes: {vocabulary.meanings.sideNotes.join(" / ")}</p>
              <p>English Expression: {vocabulary.englishExpression}</p>
              <p>
                Example Sentences: {vocabulary.exampleSentences.join(" / ")}
              </p>
              <p>Type: {vocabulary.type}</p>
              <p>Tags: {vocabulary.tags.join(" / ")}</p>
              {vocabulary.imageUrl && (
                <Image
                  src={vocabulary.imageUrl}
                  alt={vocabulary.word}
                  className="mt-2"
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-custom-7">No vocabularies found.</p>
      )}
      <div className="flex items-center justify-start gap-5 mt-8">
        <Link href="/" passHref>
          <Button variant={"customSm1"}>
            <FaHome />
          </Button>
        </Link>
        <Link href="/new-word" passHref>
          <Button variant={"customSm1"}>Add New Word</Button>
        </Link>
      </div>
    </div>
  );
};

export default VocabularyList;
