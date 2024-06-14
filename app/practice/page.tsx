import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function PracticeWord() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8 text-custom-9">Practice For</h1>
      <div className="flex  items-center gap-8">
        <Link href="/practice/english" passHref>
          <Button variant={"customBig1"} size={"big1"}>
            English
          </Button>
        </Link>
        <Link href="/practice/turkish" passHref>
          <Button variant={"customBig7"} size={"big1"}>
            Turkish
          </Button>
        </Link>
      </div>
      <div className="flex space-x-4 mt-8">
        <Link href="/" passHref>
          <Button variant={"customSm1"}>
            <FaHome />
          </Button>
        </Link>
      </div>
    </main>
  );
}
