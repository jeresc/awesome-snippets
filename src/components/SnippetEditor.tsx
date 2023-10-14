"use client";
import Editor from "@monaco-editor/react";
import { useSnippetsStore } from "@/store/snippetsStore";
import { useEffect, useState } from "react";
import { writeTextFile } from "@tauri-apps/api/fs";
import { appDataDir, join } from "@tauri-apps/api/path";

function SnippetEditor() {
  const selectedSnippetName = useSnippetsStore(
    (state) => state.selectedSnippetName,
  );
  const [code, setCode] = useState<string | undefined>();

  useEffect(() => {
    if (!selectedSnippetName) return;

    const timer = setTimeout(async () => {
      const appDataPath = await appDataDir();
      await writeTextFile(
        await join(appDataPath, "taurifiles", `${selectedSnippetName.name}.js`),
        code ?? "",
      );
    }, 100);
    return () => {
      clearTimeout(timer);
    };
  }, [code, selectedSnippetName]);
  return (
    <>
      {selectedSnippetName ? (
        <Editor
          language="typescript"
          theme="vs-dark"
          options={{ fontSize: 20, fontFamily: "JetBrains Mono" }}
          onChange={setCode}
          value={selectedSnippetName.code ?? ""}
        />
      ) : (
        <h2>No snippet selected</h2>
      )}
    </>
  );
}

export default SnippetEditor;
