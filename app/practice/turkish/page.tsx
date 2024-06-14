import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TurkishPractice() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-custom-9">
        Turkish Practices
      </h1>
      <div className="flex  items-center gap-8">
        <Link href="/flash-card" passHref>
          <Button variant={"customBig3"} size={"big1"}>
            Flash Card
          </Button>
        </Link>
        <Link href="/multiple-choice" passHref>
          <Button variant={"customBig7"} size={"big1"}>
            Multiple Choice
          </Button>
        </Link>
        <Link href="/writing" passHref>
          <Button variant={"customBig1"} size={"big1"}>
            Writing
          </Button>
        </Link>
        <Link href="/in-sentence" passHref>
          <Button variant={"customBig4"} size={"big1"}>
            In Sentence
          </Button>
        </Link>
        <Link href="/match" passHref>
          <Button variant={"customBig5"} size={"big1"}>
            Match
          </Button>
        </Link>
      </div>
    </main>
  );
}
