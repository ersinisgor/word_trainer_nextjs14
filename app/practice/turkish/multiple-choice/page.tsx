"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

interface Vocabulary {
  wordId: string;
  word: string;
  meanings: {
    isFirstMeaning: boolean;
    turkishMeanings: string[];
    sideNotes: string[];
  };
  englishExpression: string;
  exampleSentences: string[];
  imageUrl: string;
  type: string;
  tags: string[];
}

const MultipleChoice = () => {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>([]);
  const [currentWord, setCurrentWord] = useState<Vocabulary | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const setNewQuestion = useCallback((vocabularies: Vocabulary[]) => {
    const randomWord =
      vocabularies[Math.floor(Math.random() * vocabularies.length)];
    const correctMeaning = randomWord.meanings.turkishMeanings[0];
    const incorrectMeanings = vocabularies
      .filter(v => v.wordId !== randomWord.wordId)
      .map(v => v.meanings.turkishMeanings[0]);

    const shuffledOptions = shuffleArray([
      correctMeaning,
      ...incorrectMeanings.slice(0, 3),
    ]);

    setCurrentWord(randomWord);
    setOptions(shuffledOptions);
    setSelectedOption(null);
    setIsCorrect(null);
  }, []);

  useEffect(() => {
    const storedVocabularies = localStorage.getItem("vocabularies");
    if (storedVocabularies) {
      const parsedVocabularies: Vocabulary[] = JSON.parse(storedVocabularies);
      setVocabularies(parsedVocabularies);
      setNewQuestion(parsedVocabularies);
    }
  }, [setNewQuestion]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsCorrect(option === currentWord?.meanings.turkishMeanings[0]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="self-end mb-10">
        <Link href="/">
          <Button variant={"customSmIcon"}>
            <FaHome />
          </Button>
        </Link>
      </div>
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">{currentWord?.word}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center">
            Which Turkish meaning is the correct fit for this English word?
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <div className="flex gap-4 justify-center">
            {options.slice(0, 2).map(option => (
              <Button
                key={option}
                variant={"customSm2"}
                className={`${
                  selectedOption === option
                    ? isCorrect
                      ? "bg-green-500"
                      : "bg-red-500"
                    : "bg-custom-3"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Button>
            ))}
          </div>
          <div className="flex gap-4 justify-center">
            {options.slice(2, 4).map(option => (
              <Button
                key={option}
                variant={"customSm2"}
                className={`${
                  selectedOption === option
                    ? isCorrect
                      ? "bg-green-500"
                      : "bg-red-500"
                    : "bg-custom-3"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Button>
            ))}
          </div>
          {isCorrect !== null && (
            <Button
              variant={"customSm1"}
              onClick={() => setNewQuestion(vocabularies)}
            >
              Next Question
            </Button>
          )}
        </CardFooter>
      </Card>
    </main>
  );
};

export default MultipleChoice;
