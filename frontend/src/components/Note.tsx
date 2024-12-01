import { cn } from "../lib/utils";

export interface NoteProps {
  id: string;
  title: string;
  content: string;
  tags: string;
  importance: "Low" | "Medium" | "High";
}

const Note = ({ id, tags, title, importance, content }: NoteProps) => {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <div className="h-8 mb-4 flex justify-between items-center">
        <div className="text-slate-800 font-semibold text-xl">{title}</div>
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

      <div className="font-bold text-xl mb-2">Tags:</div>
      <div className="mb-4 text-gray-700">{tags}</div>
    </div>
  );
};

export default Note;
