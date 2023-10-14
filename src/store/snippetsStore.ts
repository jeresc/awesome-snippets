import { create } from "zustand";

interface SnippetsStore {
  snippetsNames: string[];
  addSnippetName: (snippet: string) => void;
  removeSnippetName: (index: number) => void;
}

export const useSnippetsStore = create<SnippetsStore>((set) => ({
  snippetsNames: [],
  addSnippetName: (name: string) =>
    set((state) => ({
      snippetsNames: [...state.snippetsNames, name],
    })),
  removeSnippetName: (index: number) =>
    set((state) => ({
      snippetsNames: state.snippetsNames.filter((_, i) => i !== index),
    })),
}));
