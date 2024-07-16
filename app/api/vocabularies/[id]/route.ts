// app/api/vocabularies/[id]/route.ts
import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import Vocabulary from "../../../../lib/models/Vocabulary";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;

  try {
    const vocabulary = await Vocabulary.findById(id);
    if (!vocabulary) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json(vocabulary, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;
  const body = await request.json();

  try {
    const vocabulary = await Vocabulary.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });
    if (!vocabulary) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json(vocabulary, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  await dbConnect();
  const { id } = params;

  try {
    const deletedVocabulary = await Vocabulary.deleteOne({ _id: id });
    if (!deletedVocabulary) {
      return NextResponse.json({ success: false }, { status: 404 });
    }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
