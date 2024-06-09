import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Vocabulary Practice</h1>
      <div className="space-y-4">
        <Link
          href="/new-word"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          New Word
        </Link>
        <Link
          href="/practice-word"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Practice Word
        </Link>
      </div>
    </main>
  );
}
