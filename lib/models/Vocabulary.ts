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
  clozeSentences: { original: string; cloze: string }[];
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
    clozeSentences: [{ original: String, cloze: String }],
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

// Function to generate cloze-deleted sentence
const generateClozeSentence = (word: string, sentence: string) => {
  const underscore = "_".repeat(word.length);
  return sentence.replace(new RegExp(word, "gi"), underscore);
};

//new RegExp(word, "gi"):

//RegExp is a built-in object in JavaScript used for matching patterns in strings.
//It creates a regular expression object based on the word and the flags "gi":
//"g" stands for global match, meaning it finds all matches rather than stopping after the first match.
//"i" stands for case-insensitive match, meaning it ignores case distinctions when matching.

//sentence.replace(...):

//This method is called on the sentence string.
//It searches for matches of the regular expression (RegExp) created earlier (new RegExp(word, "gi")).
//When a match is found (where word occurs in sentence):
//It replaces each match with the string specified by underscore

// Pre-save middleware to process fields
VocabularySchema.pre("save", function (next) {
  // 'this' refers to the document being saved
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

  const wordToStudy = this.word;
  this.clozeSentences = this.exampleSentences.map(sentence => ({
    original: sentence,
    cloze: generateClozeSentence(wordToStudy, sentence),
  }));
  this.imageUrl = this.imageUrl ? normalizeText(this.imageUrl) : "";
  this.type = cleanWhitespace(this.type.toLowerCase());
  this.tags = sanitizeAndNormalizeArray(this.tags);
  next();
});

// Export the model
const Vocabulary =
  models.Vocabulary || model<IVocabulary>("Vocabulary", VocabularySchema);
export default Vocabulary;
