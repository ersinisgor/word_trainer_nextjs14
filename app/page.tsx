import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-white">
        Vocabulary Practice
      </h1>
      <div className="flex  items-center gap-8">
        <Link
          href="/new-word"
          className="flex items-center justify-center w-40 h-60 p-1 bg-custom-2 text-custom-5 text-xl rounded-xl text-center font-semibold hover:bg-custom-4 hover:text-custom-3"
        >
          New Word
        </Link>
        <Link
          href="/practice-word"
          className="flex items-center justify-center w-40 h-60 p-1 bg-custom-3 text-custom-5 font-semibold text-xl rounded-xl text-center hover:bg-custom-4 hover:text-custom-3"
        >
          Practice
        </Link>
      </div>
    </main>
  );
}
