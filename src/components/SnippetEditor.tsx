"use client";
import Editor from "@monaco-editor/react";
import { useSnippetsStore } from "@/store/snippetsStore";
import { useEffect, useState } from "react";
import { writeTextFile } from "@tauri-apps/api/fs";
import { appDataDir, join } from "@tauri-apps/api/path";
import { TfiPencil } from "react-icons/tfi";

function SnippetEditor() {
  const selectedSnippetName = useSnippetsStore(
    (state) => state.selectedSnippetName,
  );
  const [code, setCode] = useState<string | undefined>("");

  useEffect(() => {
    if (!selectedSnippetName) return;

    const timer = setTimeout(async () => {
      const appDataPath = await appDataDir();
      await writeTextFile(
        await join(appDataPath, "taurifiles", `${selectedSnippetName.name}.js`),
        code ?? "",
      );
    }, 1000);
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
          defaultValue="// save your snippet"
          onChange={(value) => setCode(value)}
          value={selectedSnippetName.code ?? ""}
        />
      ) : (
        <TfiPencil className="text-9xl text-neutral-900" />
      )}
    </>
  );
}

export default SnippetEditor;
