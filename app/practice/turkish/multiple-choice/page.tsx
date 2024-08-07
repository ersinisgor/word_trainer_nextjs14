"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { MdTipsAndUpdates } from "react-icons/md";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Vocabulary {
  _id: string;
  word: string;
  meanings: {
    isFirstMeaning: boolean;
    turkishMeanings: string[];
    sideNotes: string[];
  };
  englishExpression: string;
  exampleSentences: {
    originalSentence: string;
    clozeSentence: string;
    hiddenWord: string;
    _id: string;
  }[];
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
  const [showHint, setShowHint] = useState<boolean>(false);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [askedWords, setAskedWords] = useState<Set<string>>(new Set());

  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const setNewQuestion = useCallback(
    (vocabularies: Vocabulary[]) => {
      console.log("Setting new question");
      const remainingVocabularies = vocabularies.filter(
        v => !askedWords.has(v._id)
      );
      if (remainingVocabularies.length === 0) {
        alert("You've gone through all the words!");
        return;
      }
      const randomWord =
        remainingVocabularies[
          Math.floor(Math.random() * remainingVocabularies.length)
        ];
      const correctMeaning = randomWord.meanings.turkishMeanings[0];
      const incorrectMeanings = vocabularies
        .filter(v => v._id !== randomWord._id)
        .map(v => v.meanings.turkishMeanings[0]);

      const shuffledOptions = shuffleArray([
        correctMeaning,
        ...incorrectMeanings.slice(0, 3),
      ]);

      setCurrentWord(randomWord);
      setOptions(shuffledOptions);
      setSelectedOption(null);
      setIsCorrect(null);
      setShowHint(false);
    },
    [askedWords]
  );

  const fetchVocabularies = async () => {
    try {
      const response = await axios.get("/api/vocabularies");
      if (response.status === 200) {
        return response.data; // Assuming response.data is an array of vocabularies
      } else {
        throw new Error("Failed to fetch vocabularies");
      }
    } catch (error) {
      console.error("Error fetching vocabularies:", error);
      // Handle error (e.g., show error message, fallback UI)
      return []; // Return empty array or handle error state as needed
    }
  };

  // Update useEffect to fetch vocabularies from API
  useEffect(() => {
    const fetchAndSetVocabularies = async () => {
      try {
        const fetchedVocabularies = await fetchVocabularies();
        setVocabularies(fetchedVocabularies);
        setNewQuestion(fetchedVocabularies);
      } catch (error) {
        console.error("Error fetching and setting vocabularies:", error);
        // Handle error as needed (e.g., show error message)
      }
    };

    fetchAndSetVocabularies();
  }, [setNewQuestion]);

  const handleOptionClick = (option: string) => {
    console.log("Option clicked:", option);
    setSelectedOption(option);
    const correct = option === currentWord?.meanings.turkishMeanings[0];
    setIsCorrect(correct);
    console.log("Is correct:", correct);

    if (correct) {
      setTimeout(() => {
        setCorrectCount(prevCount => {
          console.log("Updating correct count:", prevCount + 1);
          return prevCount + 1;
        });
        setAskedWords(prevAskedWords => {
          console.log(
            "Updating asked words:",
            prevAskedWords.add(currentWord!._id)
          );
          return new Set(prevAskedWords.add(currentWord!._id));
        });
        setNewQuestion(vocabularies);
      }, 2000); // Wait for 2 seconds before moving to the next question
    } else {
      setTimeout(() => {
        setNewQuestion(vocabularies);
      }, 3000); // Wait for 3 seconds before moving to the next question
    }
  };

  const handleHintClick = () => {
    setShowHint(true);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-2xl text-white mb-24">
        Correct Answers: {correctCount}
      </div>
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
        <CardFooter className="flex flex-col gap-4">
          <div className="flex gap-4 justify-center">
            {options.slice(0, 2).map(option => (
              <Button
                key={option}
                variant={"customSm2"}
                className={`${
                  selectedOption === option
                    ? isCorrect
                      ? "bg-custom-2"
                      : "bg-custom-7"
                    : selectedOption !== null &&
                      option === currentWord?.meanings.turkishMeanings[0]
                    ? "bg-custom-2"
                    : showHint &&
                      option === currentWord?.meanings.turkishMeanings[0]
                    ? "bg-custom-2"
                    : "bg-custom-1 text-custom-2"
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
                      ? "bg-custom-2"
                      : "bg-custom-7"
                    : selectedOption !== null &&
                      option === currentWord?.meanings.turkishMeanings[0]
                    ? "bg-custom-2"
                    : showHint &&
                      option === currentWord?.meanings.turkishMeanings[0]
                    ? "bg-custom-2"
                    : "bg-custom-1 text-custom-2"
                }`}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </Button>
            ))}
          </div>
        </CardFooter>
      </Card>
      <div className="flex gap-4 mt-10">
        <Button variant={"customSm1"} onClick={handleHintClick}>
          <MdTipsAndUpdates className="mr-2" />
          Hint
        </Button>
        <Button
          variant={"customSm1"}
          onClick={() => setNewQuestion(vocabularies)}
        >
          Next Question
        </Button>
      </div>
    </main>
  );
};

export default MultipleChoice;
