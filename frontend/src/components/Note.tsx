import { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import markdownit from "markdown-it";
import { cn } from "../lib/utils";
import Modal from "./Modal";
import { deleteNoteById } from "../lib/api-communicators";
import toast from "react-hot-toast";

const md = markdownit();

export interface NoteProps {
  id: string;
  title: string;
  content: string;
  tags: string;
  importance: "Low" | "Medium" | "High";
  createdAt: string;
  updatedAt: string;
}

export const formatDate = (date: string) => {
  const newDate = new Date(date);
  const day = String(newDate.getDate()).padStart(2, "0"); // Get day and pad with 0 if needed
  const month = String(newDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = newDate.getFullYear(); // Get the full year

  // const hours = String(newDate.getHours()).padStart(2, "0"); // Hours
  // const minutes = String(newDate.getMinutes()).padStart(2, "0"); // Minutes

  return `${day}/${month}/${year}`;
};

const Note = ({
  id,
  tags,
  title,
  importance,
  content,
  createdAt,
}: NoteProps) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const parsedContent = md.render(content || "");

  const handleDelete = async () => {
    const ans = window.confirm(`Should we delete the ${title}`);
    if (!ans) return;

    try {
      const res = await deleteNoteById(id);
      if (!res.deletedNote) throw new Error("Note not found");

      if (res.deletedNote) {
        toast.success("Note Deleted Successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      toast.error("unable to delete the note.");
    }
  };

  return (
    <div className="border flex flex-col justify-between p-4 rounded-lg shadow-lg">
      <div className="mb-4 flex justify-between items-start">
        <p className="text-slate-800 font-semibold text-xl">{title}</p>
        <div
          className={cn(
            importance === "High"
              ? "bg-red-200 text-red-500"
              : importance === "Medium"
              ? "bg-yellow-200 text-yellow-600"
              : "bg-green-200 text-green-600",
            "px-3 py-0.5 rounded-full text-sm font-semibold"
          )}
        >
          {importance}
        </div>
      </div>

      <div className="mb-4 flex gap-2 flex-wrap text-gray-700 text-wrap">
        {tags
          .split(" ")
          .filter(Boolean)
          .map((w) => (
            <div className="px-2 font-semibold rounded-md text-sm border py-1">
              {" #" + w}
            </div>
          ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        date={formatDate(createdAt)}
        customTitle={
          <p>
            {
              <div
                className={cn(
                  importance === "High"
                    ? "bg-red-200 text-red-500"
                    : importance === "Medium"
                    ? "bg-yellow-200 text-yellow-600"
                    : "bg-green-200 text-green-600",
                  "px-4 py-1 rounded-full text-lg font-semibold"
                )}
              >
                {importance}
              </div>
            }
          </p>
        }
      >
        <div className="overflow-y-scroll h-96">
          <div className="text-center font-mono font-extrabold text-3xl">
            {title}
          </div>

          <div className="font-bold text-xl text-center my-5">
            -: Content :-
          </div>

          {parsedContent && (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          )}
        </div>
      </Modal>

      <div className="flex mt-auto justify-end">
        <span
          onClick={handleDelete}
          className="hover:bg-slate-100 cursor-pointer hover:text-red-700 rounded-lg p-2"
        >
          <AiOutlineDelete size={23} />
        </span>

        <span
          onClick={() => setModalOpen((prev) => !prev)}
          className="hover:bg-slate-100 cursor-pointer hover:text-green-700 rounded-lg p-2"
        >
          <FaRegEye size={23} />
        </span>
      </div>
    </div>
  );
};

export default Note;
