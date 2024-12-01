import { cn } from "../lib/utils";

export interface NoteProps {
  id: string;
  title: string;
  content: string;
  tags: string;
  importance: "Low" | "Medium" | "High";
}

const Note = ({ id, tags, title, importance, content }: NoteProps) => {
  // console.log(tags.split(","));

  return (
    <div className="border p-4 rounded-lg shadow-lg">
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
        {tags.split(" ").map((w) => (
          <div className="px-2 font-semibold rounded-md text-sm border py-1">
            {" #" + w}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Note;
