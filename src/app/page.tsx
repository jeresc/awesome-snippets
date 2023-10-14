import { Toaster } from "react-hot-toast";
import dynamic from "next/dynamic";

const SnippetEditor = dynamic(() => import("@/components/SnippetEditor"), {
  ssr: false,
});
const SnippetForm = dynamic(() => import("@/components/SnippetForm"), {
  ssr: false,
});
const SnippetList = dynamic(() => import("@/components/SnippetList"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <aside className="col-span-4 bg-zinc-950">
        <SnippetForm />
        <SnippetList />
      </aside>
      <main className="col-span-8 flex justify-center items-center bg-neutral-950">
        <SnippetEditor />
        <Toaster />
      </main>
    </>
  );
}
