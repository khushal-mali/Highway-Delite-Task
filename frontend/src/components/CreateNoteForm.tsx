import React, { Dispatch, SetStateAction, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { noteFormCreationVal } from "../lib/validation";
import { z } from "zod";
import toast from "react-hot-toast";
import { createNewNote } from "../lib/api-communicators";

type FormData = {
  title: string;
  content: string;
  tags: string;
  importance: "Low" | "Medium" | "High";
};

const CreateNoteForm = ({
  setModalOpen,
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    tags: "",
    importance: "Medium",
  });

  const handleContentChange = (value: string | undefined) => {
    setFormData((prev) => ({ ...prev, content: value || "" }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formValues = {
      title: formData.title,
      content: formData.content,
      tags: formData.tags.split(" ").join("").split(",").join(" "),
      importance: formData.importance,
    };

    const { title, tags, content, importance } = formValues;

    console.log("Form Submitted", formValues);

    try {
      await noteFormCreationVal.parseAsync(formValues);
      const data = await createNewNote(title, content, tags, importance);

      if (data.note) {
        setFormData({ title: "", content: "", tags: "", importance: "Medium" });
        toast.success("Note Created Successfully.");
        setModalOpen(false);

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErorrs = error.flatten().fieldErrors;
        setErrors(fieldErorrs as unknown as Record<string, string>);

        toast.error("Please check your inputs and try again");
      }

      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={handleSubmit} className="sm:p-4 w-full space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-slate-200"
            placeholder="Enter note title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <MDEditor
            value={formData.content}
            onChange={handleContentChange}
            preview="edit"
            height={200}
            style={{
              borderRadius: 8,
              // overflow: "hidden",
              backgroundColor: "#e2e8f0",
              color: "black",
            }}
            textareaProps={{
              placeholder: "Write your content in Markdown...",
            }}
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content}</p>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-700 ">
            Tags (should be separated by ",")
          </label>
          <input
            value={formData.tags}
            onChange={handleInputChange}
            type="text"
            name="tags"
            className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-slate-200"
            placeholder="Enter tags"
          />
          {errors.tags && <p className="text-red-500 text-sm">{errors.tags}</p>}
        </div>

        {/* importance */}
        <div>
          <label className="block text-sm font-medium text-gray-700 ">
            Importance
          </label>
          <select
            name="importance"
            value={formData.importance}
            onChange={handleInputChange}
            className="mt-1 px-4 py-2 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-slate-200"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNoteForm;
