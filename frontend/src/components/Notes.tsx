import { BiPlus } from "react-icons/bi";
import Note, { NoteProps } from "./Note";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import CreateNoteForm from "./CreateNoteForm";
import { getAllNotes } from "../lib/api-communicators";

type NoteType = {
  _id: string;
  title: string;
  content: string;
  tags: string;
  importance: "High" | "Low" | "Medium";
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const Notes = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState<NoteType[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await getAllNotes();
        setNotes(res.notes);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="md:m-8 xs:m-6 m-4 flex flex-col">
      <div className="w-full flex justify-center">
        <button
          onClick={() => setModalOpen(true)}
          className="text-white flex items-center rounded-lg bg-primary hover:bg-primary/95 hover:shadow-lg active:shadow-none px-20 py-2 text-xl gap-2"
        >
          <BiPlus size={24} /> Create Note
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Your Note"
      >
        <CreateNoteForm setModalOpen={setModalOpen} />
      </Modal>

      {notes?.length > 0 && (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 mt-4">
          {notes?.map((n) => (
            <Note
              content={n.content}
              tags={n.tags}
              title={n.title}
              id={n._id}
              importance={n.importance}
              key={n._id}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
