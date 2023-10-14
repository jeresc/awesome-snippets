"use client";
import Editor from "@monaco-editor/react";
import { useSnippetsStore } from "@/store/snippetsStore";

function SnippetEditor() {
  const selectedSnippetName = useSnippetsStore(
    (state) => state.selectedSnippetName,
  );
  return (
    <>
      {selectedSnippetName ? (
        <Editor
          language="typescript"
          theme="vs-dark"
          options={{ fontSize: 20, fontFamily: "JetBrains Mono" }}
        />
      ) : (
        <h2>No snippet selected</h2>
      )}
    </>
  );
}

export default SnippetEditor;
