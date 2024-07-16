// /components/vocabulary-detail/VocabularyDetailHeader.tsx

import React from "react";
import { Vocabulary } from "../../app/types/vocabulary";

interface VocabularyDetailHeaderProps {
  vocabulary: Vocabulary;
}

export const VocabularyDetailHeader: React.FC<VocabularyDetailHeaderProps> = ({
  vocabulary,
}) => {
  return (
    <div className="flex items-center justify-center w-full py-8 bg-gray-200">
      <div className="max-w-3xl px-6">
        <h1 className="text-4xl font-bold mb-4">{vocabulary.word}</h1>
        <p className="text-lg text-gray-600">
          {vocabulary.meanings.turkishMeanings.join(", ")}
        </p>
        {/* Add more details to display in the header */}
      </div>
    </div>
  );
};
