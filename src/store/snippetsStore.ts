import { create } from "zustand";

interface Snippet {
  name: string;
  code: string | null;
}

interface SnippetsStore {
  snippetsNames: string[];
  selectedSnippetName: Snippet | null;
  setSnippetsNames: (snippetsNames: string[]) => void;
  addSnippetName: (snippet: string) => void;
  removeSnippetName: (snippetName: string) => void;
  setSelectedSnippetName: (snippet: Snippet | null) => void;
}

export const useSnippetsStore = create<SnippetsStore>((set) => ({
  snippetsNames: [],
  selectedSnippetName: null,
  setSnippetsNames: (snippetsNames: string[]) =>
    set(() => ({
      snippetsNames,
    })),
  addSnippetName: (name: string) =>
    set((state) => ({
      snippetsNames: [...state.snippetsNames, name],
    })),
  removeSnippetName: (snippetName: string) =>
    set((state) => ({
      snippetsNames: state.snippetsNames.filter((name) => name !== snippetName),
    })),
  setSelectedSnippetName: (snippet: Snippet | null) =>
    set(() => ({
      selectedSnippetName: snippet,
    })),
}));
