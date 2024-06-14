import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-custom-9">
        Vocabulary Practice
      </h1>
      <div className="flex  items-center gap-8">
        <Link href="/new-word" passHref>
          <Button variant={"customBig1"} size={"big1"}>
            New Word
          </Button>
        </Link>
        <Link href="/practice-word" passHref>
          <Button variant={"customBig7"} size={"big1"}>
            Practice
          </Button>
        </Link>
        <Link href="/vocabulary-list" passHref>
          <Button variant={"customBig3"} size={"big1"}>
            Word List
          </Button>
        </Link>
      </div>
    </main>
  );
}
