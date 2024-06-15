import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function TurkishPractice() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 ">
      <div className="self-end mb-10">
        <Link href="/">
          <Button variant={"customSmIcon"}>
            <FaHome />
          </Button>
        </Link>
      </div>
      <h1 className="text-4xl font-bold mb-8 text-custom-9">
        Turkish Practices
      </h1>
      <div className="flex flex-wrap items-center gap-8 justify-center md:gap-4">
        <Link href="/practice/turkish/flash-card">
          <Button variant={"customBig3"} size={"big1"}>
            Flash Card
          </Button>
        </Link>
        <Link href="/practice/turkish/multiple-choice">
          <Button variant={"customBig7"} size={"big1"}>
            Multiple Choice
          </Button>
        </Link>
        <Link href="/practice/turkish/writing">
          <Button variant={"customBig1"} size={"big1"}>
            Writing
          </Button>
        </Link>
        <Link href="/practice/turkish/in-sentence">
          <Button variant={"customBig4"} size={"big1"}>
            In Sentence
          </Button>
        </Link>
        <Link href="/practice/turkish/match">
          <Button variant={"customBig5"} size={"big1"}>
            Match
          </Button>
        </Link>
      </div>
    </main>
  );
}
