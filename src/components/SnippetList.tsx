"use client";
import { useSnippetsStore } from "@/store/snippetsStore";
import { readDir } from "@tauri-apps/api/fs";
import { appDataDir } from "@tauri-apps/api/path";
import { useEffect } from "react";

function SnippetList() {
  const [snippetsNames, setSnippetsNames] = useSnippetsStore((state) => [
    state.snippetsNames,
    state.setSnippetsNames,
  ]);

  useEffect(() => {
    async function loadSnippets() {
      const appDataPath = await appDataDir();
      const files = await readDir(`${appDataPath}taurifiles`);
      const filesNames = files.map((file) => file.name!);
      setSnippetsNames(filesNames);
    }
    loadSnippets();
  }, [setSnippetsNames]);

  return (
    <div>
      {snippetsNames.map((name, index) => (
        <div key={index}>{name}</div>
      ))}
    </div>
  );
}

export default SnippetList;
