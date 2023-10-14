import SnippetEditor from "@/components/SnippetEditor";
import SnippetForm from "@/components/SnippetForm";
import SnippetList from "@/components/SnippetList";

export default function Home() {
  return (
    <>
      <aside className="col-span-3 bg-zinc-950">
        <SnippetForm />
        <SnippetList />
      </aside>
      <main className="col-span-9 flex justify-center items-center bg-neutral-950">
        <SnippetEditor />
      </main>
    </>
  );
}
