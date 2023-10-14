"use client";
import { readDir } from "@tauri-apps/api/fs";
import { appDataDir } from "@tauri-apps/api/path";
import { useEffect } from "react";

function SnippetList() {
  useEffect(() => {
    async function loadSnippets() {
      const appDataPath = await appDataDir();
      const files = await readDir(`${appDataPath}taurifiles`);
    }
    loadSnippets();
  }, []);

  return <div>SnippetList</div>;
}

export default SnippetList;
