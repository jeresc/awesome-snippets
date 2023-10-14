"use client";
import React, { useState } from "react";
import { appDataDir } from "@tauri-apps/api/path";
import { writeTextFile } from "@tauri-apps/api/fs";

function SnippetForm() {
  const [snippetName, setSnippetName] = useState("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const appDataPath = await appDataDir();

        await writeTextFile(
          `${appDataPath}taurifiles/${snippetName}.json`,
          "{}",
        );
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
      <button className="hidden">Save</button>
    </form>
  );
}

export default SnippetForm;
