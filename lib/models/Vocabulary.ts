import { Schema, model, models } from "mongoose";

const VocabularySchema = new Schema(
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

const Vocabulary = models.Vocabulary || model("Vocabulary", VocabularySchema);

export default Vocabulary;
