import { create } from "zustand";

interface Snippet {
  name: string;
  code: string | null;
}

interface SnippetsStore {
  snippetsNames: string[];
  selectedSnippetName: Snippet | null;
  setSnippetsNames: (names: string[]) => void;
  addSnippetName: (name: string) => void;
  removeSnippetName: (name: string) => void;
  setSelectedSnippetName: (snippet: Snippet | null) => void;
}

export const useSnippetsStore = create<SnippetsStore>((set) => ({
  snippetsNames: [],
  selectedSnippetName: null,
  setSnippetsNames: (names) => set({ snippetsNames: names }),
  addSnippetName: (name) =>
    set((state) => ({
      snippetsNames: [...state.snippetsNames, name],
    })),
  removeSnippetName: (name) =>
    set((state) => ({
      snippetsNames: state.snippetsNames.filter((n) => name !== n),
    })),
  setSelectedSnippetName: (snippet) => set({ selectedSnippetName: snippet }),
}));
