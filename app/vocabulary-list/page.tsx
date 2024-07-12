"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { Vocabulary } from "../types/vocabulary";
import { Button } from "@/components/ui/button";
import { FaHome, FaTimes } from "react-icons/fa";

const VocabularyList = () => {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  console.log(vocabularies);

  useEffect(() => {
    const fetchVocabularies = async () => {
      try {
        const response = await axios.get("/api/vocabularies");
        setVocabularies(response.data);
      } catch (error) {
        console.error("Failed to fetch vocabularies:", error);
      }
    };

    fetchVocabularies();
  }, []);

  const handleDeleteWord = async (_id: string) => {
    try {
      await axios.delete(`/api/vocabularies/${_id}`);
      const updatedVocabularies = vocabularies.filter(
        vocabulary => vocabulary._id !== _id
      );
      setVocabularies(updatedVocabularies);
    } catch (error) {
      console.error("Failed to delete vocabulary:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 px-24">
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
            key={vocabulary._id}
            className="p-4 border rounded flex justify-between"
          >
            <Link
              href={`/vocabulary-detail/${vocabulary._id}`}
              className="text-xl font-bold text-custom-9"
            >
              {vocabulary.word}
            </Link>
            <Button
              className="bg-custom-7 text-custom-1 hover:bg-custom-6 hover:text-custom-3"
              size="icon"
              onClick={() => handleDeleteWord(vocabulary._id)}
            >
              <FaTimes />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VocabularyList;
