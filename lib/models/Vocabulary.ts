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
    word: { type: String, required: true },
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

// Pre-save middleware to convert fields to lowercase
VocabularySchema.pre("save", function (next) {
  this.word = this.word.toLowerCase();
  this.meanings.turkishMeanings = this.meanings.turkishMeanings.map(str =>
    str.toLowerCase()
  );
  this.meanings.sideNotes = this.meanings.sideNotes.map(str =>
    str.toLowerCase()
  );
  this.englishExpression = this.englishExpression.toLowerCase();
  this.exampleSentences = this.exampleSentences.map(str => str.toLowerCase());
  this.imageUrl = this.imageUrl ? this.imageUrl.toLowerCase() : "";
  this.type = this.type.toLowerCase();
  this.tags = this.tags.map(str => str.toLowerCase());
  next();
});

// Export the model
const Vocabulary =
  models.Vocabulary || model<IVocabulary>("Vocabulary", VocabularySchema);
export default Vocabulary;
