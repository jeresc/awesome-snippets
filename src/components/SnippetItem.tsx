"use client";
import { useSnippetsStore } from "@/store/snippetsStore";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { appDataDir, join } from "@tauri-apps/api/path";
import { twMerge } from "tailwind-merge";

interface IProps {
  snippetName: string;
}

function SnippetItem({ snippetName }: IProps) {
  const [setSelectedSnippetName, selectedSnippetName, removeSnippetName] =
    useSnippetsStore((state) => [
      state.setSelectedSnippetName,
      state.selectedSnippetName,
      state.removeSnippetName,
    ]);

  const handleDelete = async (snippetName: string) => {
    const response = await window.confirm(
      "Are you sure you want to delete this snippet?",
    );

    if (!response) return;

    const appDataPath = await appDataDir();
    await removeFile(
      await join(appDataPath, "taurifiles", `${snippetName}.js`),
    );
    removeSnippetName(snippetName);
  };

  return (
    <div
      className={twMerge(
        "py-1 px-2 cursor-pointer flex justify-between",
        selectedSnippetName?.name === snippetName
          ? "bg-white text-black"
          : "hover:bg-neutral-900",
      )}
      onClick={async () => {
        setSelectedSnippetName(null);

        const appDataPath = await appDataDir();
        const filePath = await join(
          appDataPath,
          "taurifiles",
          `${snippetName}.js`,
        );
        const snippet = await readTextFile(filePath);

        setSelectedSnippetName({ name: snippetName, code: snippet });
      }}
    >
      <h1>{snippetName}</h1>
      <div className="flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDelete(snippetName);
          }}
        >
          Delete
        </button>
        <button onClick={() => setSelectedSnippetName(null)}>Cancel</button>
      </div>
    </div>
  );
}

export default SnippetItem;
