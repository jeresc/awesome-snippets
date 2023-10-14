"use client";
import React, { useState } from "react";
import { appDataDir, join } from "@tauri-apps/api/path";
import { writeTextFile } from "@tauri-apps/api/fs";
import { useSnippetsStore } from "@/store/snippetsStore";
import { toast } from "react-hot-toast";

function SnippetForm() {
  const [snippetName, setSnippetName] = useState("");
  const [addSnippetName, snippetNames] = useSnippetsStore((state) => [
    state.addSnippetName,
    state.snippetsNames,
  ]);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        if (!snippetName || snippetName.trim() === "") {
          toast.error("Please enter snippet name", {
            duration: 2000,
            position: "bottom-right",
            style: {
              borderRadius: "10px",
              background: "#202020",
              color: "#fff",
            },
          });
          return;
        }

        if (snippetNames.includes(snippetName)) {
          toast.error("Snippet already exists", {
            duration: 2000,
            position: "bottom-right",
            style: {
              borderRadius: "10px",
              background: "#202020",
              color: "#fff",
            },
          });
          return;
        }

        const appDataPath = await appDataDir();
        const filePath = await join(
          appDataPath,
          "taurifiles",
          `${snippetName}.js`,
        );
        await writeTextFile(filePath, "");
        addSnippetName(snippetName);
        setSnippetName("");

        toast.success("Snippet saved", {
          duration: 2000,
          position: "bottom-right",
          style: {
            borderRadius: "10px",
            background: "#202020",
            color: "#fff",
          },
        });
      }}
    >
      <input
        type="text"
        placeholder="Enter snippet"
        className="bg-zinc-900 w-full border-none outline-none p-3"
        onChange={(e) => setSnippetName(e.target.value)}
        autoFocus
        value={snippetName}
      />
    </form>
  );
}

export default SnippetForm;
