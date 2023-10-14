"use client";
import { useSnippetsStore } from "@/store/snippetsStore";
import { twMerge } from "tailwind-merge";

interface IProps {
  snippetName: string;
}

function SnippetItem({ snippetName }: IProps) {
  const [setSelectedSnippetName, selectedSnippetName] = useSnippetsStore(
    (state) => [state.setSelectedSnippetName, state.selectedSnippetName],
  );
  return (
    <div
      className={twMerge(
        "py-1 px-2 cursor-pointer",
        selectedSnippetName === snippetName
          ? "bg-orange-200 text-orange-800"
          : "hover:bg-neutral-900",
      )}
      onClick={() => setSelectedSnippetName(snippetName)}
    >
      <h1>{snippetName}</h1>
    </div>
  );
}

export default SnippetItem;
