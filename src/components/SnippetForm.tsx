"use client";
import React, { useState } from "react";
import { appDataDir, join } from "@tauri-apps/api/path";
import { writeTextFile } from "@tauri-apps/api/fs";
import { useSnippetsStore } from "@/store/snippetsStore";

function SnippetForm() {
  const [snippetName, setSnippetName] = useState("");
  const addSnippetName = useSnippetsStore((state) => state.addSnippetName);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const appDataPath = await appDataDir();
        await writeTextFile(
          await join(appDataPath, "taurifiles", `${snippetName}.js`),
          "",
        );

        addSnippetName(snippetName);
        setSnippetName("");
      }}
    >
      <input
        type="text"
        placeholder="Enter snippet"
        className="bg-zinc-900 w-full border-none outline-none p-3"
        onChange={(e) => setSnippetName(e.target.value)}
        value={snippetName}
      />
    </form>
  );
}

export default SnippetForm;
