"use client";
import { useSnippetsStore } from "@/store/snippetsStore";
import { readTextFile, removeFile } from "@tauri-apps/api/fs";
import { appDataDir, join } from "@tauri-apps/api/path";
import { twMerge } from "tailwind-merge";
import { toast } from "react-hot-toast";
import { FiTrash, FiX } from "react-icons/fi";

interface IProps {
  snippetName: string;
}

function SnippetItem({ snippetName }: IProps) {
  const [setSelectedSnippetName, selectedSnippetName, removeSnippetName] =
    useSnippetsStore((state) => [
      state.setSelectedSnippetName,
      state.selectedSnippetName,
      state.removeSnippetName,
    ]);

  const handleDelete = async (snippetName: string) => {
    const loadingToast = toast.loading("Deleting snippet...", {
      duration: 2000,
      position: "bottom-right",
      style: {
        borderRadius: "10px",
        background: "#202020",
        color: "#fff",
      },
    });
    const response = await window.confirm(
      "Are you sure you want to delete this snippet?",
    );
    toast.dismiss(loadingToast);

    if (!response) {
      toast.error("Snippet not deleted", {
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
    const filePath = await join(appDataPath, "taurifiles", `${snippetName}.js`);
    await removeFile(filePath);
    removeSnippetName(snippetName);

    toast.success("Snippet deleted", {
      duration: 2000,
      position: "bottom-right",
      style: {
        borderRadius: "10px",
        background: "#202020",
        color: "#fff",
      },
    });
  };

  return (
    <li
      className={twMerge(
        "py-1 px-2 cursor-pointer flex justify-between",
        selectedSnippetName?.name === snippetName
          ? "bg-white text-black"
          : "hover:bg-neutral-900",
      )}
      onClick={async () => {
        setSelectedSnippetName(null);

        const appDataPath = await appDataDir();
        const filePath = await join(
          appDataPath,
          "taurifiles",
          `${snippetName}.js`,
        );
        const snippet = await readTextFile(filePath);

        setSelectedSnippetName({ name: snippetName, code: snippet });
      }}
    >
      {snippetName}
      {selectedSnippetName?.name === snippetName && (
        <div className="flex gap-2 items-center justify-center">
          <FiTrash
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleDelete(snippetName);
            }}
            role="button"
            aria-label="Delete snippet"
            className="text-neutral-500"
          />
          <FiX
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              setSelectedSnippetName(null);
            }}
            role="button"
            aria-label="Close snippet"
            className="text-neutral-500"
          />
        </div>
      )}
    </li>
  );
}

export default SnippetItem;
