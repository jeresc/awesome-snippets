import { create } from "zustand";

interface SnippetsStore {
  snippetsNames: string[];
  selectedSnippetName: string | null;
  setSnippetsNames: (snippetsNames: string[]) => void;
  addSnippetName: (snippet: string) => void;
  removeSnippetName: (index: number) => void;
  setSelectedSnippetName: (name: string | null) => void;
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
  removeSnippetName: (index: number) =>
    set((state) => ({
      snippetsNames: state.snippetsNames.filter((_, i) => i !== index),
    })),
  setSelectedSnippetName: (name: string | null) =>
    set(() => ({
      selectedSnippetName: name,
    })),
}));
