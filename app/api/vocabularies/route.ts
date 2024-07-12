// app/api/vocabularies/route.ts
import { NextResponse, NextRequest } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Vocabulary from "../../../lib/models/Vocabulary";

export async function GET() {
  try {
    await dbConnect();

    const vocabularies = await Vocabulary.find();

    const reorderedResponse = vocabularies.map(item => {
      const doc = item.toObject();
      const { _id, word, ...rest } = doc;
      return { _id, word, ...rest };
    });

    return NextResponse.json(reorderedResponse, { status: 200 });
  } catch (error: any) {
    return new NextResponse("Error in fetcing vocabularies" + error.message, {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await dbConnect();

    const newVocabulary = new Vocabulary(body);
    await newVocabulary.save();

    return NextResponse.json(newVocabulary, { status: 201 });
  } catch (error: any) {
    return new NextResponse("Error in creating vocabulary" + error.message, {
      status: 500,
    });
  }
}
