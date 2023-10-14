"use client";
import { useSnippetsStore } from "@/store/snippetsStore";
import { readDir } from "@tauri-apps/api/fs";
import { appDataDir, join } from "@tauri-apps/api/path";
import { useEffect } from "react";
import SnippetItem from "./SnippetItem";

function SnippetList() {
  const [snippetsNames, setSnippetsNames] = useSnippetsStore((state) => [
    state.snippetsNames,
    state.setSnippetsNames,
  ]);

  useEffect(() => {
    async function loadSnippets() {
      const appDataPath = await appDataDir();
      const files = await readDir(await join(appDataPath, "taurifiles"));
      const filesNames = files.map((file) => file.name!.replace(/\.\w+/, ""));
      setSnippetsNames(filesNames);
    }
    loadSnippets();
  }, [setSnippetsNames]);

  return (
    <div>
      {snippetsNames.map((name) => (
        <SnippetItem key={name} snippetName={name} />
      ))}
    </div>
  );
}

export default SnippetList;
