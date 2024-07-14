import { Schema, model, models, Document } from "mongoose";

// Define the interface for Vocabulary document
interface IVocabulary extends Document {
  word: string;
  meanings: {
    isFirstMeaning: boolean;
    turkishMeanings: string[];
    sideNotes: string[];
  };
  englishExpression: string;
  exampleSentences: string[];
  imageUrl?: string;
  type: string;
  tags: string[];
}

// Create the Vocabulary schema
const VocabularySchema = new Schema<IVocabulary>(
  {
    word: { type: String, required: true, unique: true },
    meanings: {
      isFirstMeaning: Boolean,
      turkishMeanings: [String],
      sideNotes: [String],
    },
    englishExpression: String,
    exampleSentences: [String],
    imageUrl: String,
    type: String,
    tags: [String],
  },
  { timestamps: true }
);

// Function to remove extra spaces and trim. Replaces multiple spaces with a single space and trims the string
const cleanWhitespace = (str: string) => str.replace(/\s+/g, " ").trim();

// Function to normalize text before capitalizing the first letter
const normalizeText = (sentence: string) =>
  cleanWhitespace(sentence.toLowerCase());

// Function to capitalize the first letter of a sentence
const capitalizeFirstLetter = (sentence: string) => {
  const cleanedSentence = cleanWhitespace(sentence);
  return cleanedSentence.charAt(0).toUpperCase() + cleanedSentence.slice(1);
};

// Helper function to sanitize and normalize an array of strings
const sanitizeAndNormalizeArray = (arr: string[]) => arr.map(normalizeText);

// Pre-save middleware to process fields
VocabularySchema.pre("save", function (next) {
  this.word = cleanWhitespace(this.word.toLowerCase());
  this.meanings.turkishMeanings = sanitizeAndNormalizeArray(
    this.meanings.turkishMeanings
  );
  this.meanings.sideNotes = sanitizeAndNormalizeArray(this.meanings.sideNotes);
  this.englishExpression = capitalizeFirstLetter(
    normalizeText(this.englishExpression)
  );
  this.exampleSentences = this.exampleSentences.map(sentence =>
    capitalizeFirstLetter(normalizeText(sentence))
  );
  this.imageUrl = this.imageUrl ? normalizeText(this.imageUrl) : "";
  this.type = cleanWhitespace(this.type.toLowerCase());
  this.tags = sanitizeAndNormalizeArray(this.tags);
  next();
});

// Export the model
const Vocabulary =
  models.Vocabulary || model<IVocabulary>("Vocabulary", VocabularySchema);
export default Vocabulary;
