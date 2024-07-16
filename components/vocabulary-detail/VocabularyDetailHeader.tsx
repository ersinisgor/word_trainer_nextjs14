// components/vocabulary-detail/VocabularyDetailHeader.tsx

"use client";

import { Vocabulary } from "../../app/types/vocabulary";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface VocabularyDetailHeaderProps {
  vocabulary: Vocabulary;
}

const VocabularyDetailHeader: React.FC<VocabularyDetailHeaderProps> = ({
  vocabulary,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-5xl font-bold mb-8 text-custom-2">
        {vocabulary.word}
      </h1>
      <ul className="w-full max-w-md space-y-4">
        <li className="p-4 border rounded">
          <p className="text-xl text-custom-9">
            Meanings: {vocabulary.meanings.turkishMeanings.join(" / ")}
          </p>
          <p className="text-xl text-custom-9">
            Side Notes: {vocabulary.meanings.sideNotes.join(" / ")}
          </p>
          <p className="text-xl text-custom-9">
            English Expression: {vocabulary.englishExpression}
          </p>
          {vocabulary.exampleSentences.map((example, index) => (
            <div key={index}>
              <p className="text-xl text-custom-9">
                Original Sentence: {example.originalSentence}
              </p>
              <p className="text-xl text-custom-9">
                Cloze Sentence: {example.clozeSentence}
              </p>
              <p className="text-xl text-custom-9">
                Hidden Word: {example.hiddenWord}
              </p>
            </div>
          ))}
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
        <Link href={`/update-vocabulary/${vocabulary._id}`} passHref>
          <Button variant={"customSm1"}>Edit</Button>
        </Link>
      </div>
    </div>
  );
};

export default VocabularyDetailHeader;
