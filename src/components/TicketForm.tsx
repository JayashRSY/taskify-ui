import React, { useState } from "react";
import Modal from "./Modal";

interface TicketFormProps {
  isOpen: boolean;
  onClose: () => void;
  isEdit: boolean;
}

const TicketForm: React.FC<TicketFormProps> = ({ isOpen, isEdit, onClose }) => {
  const [form, setForm] = useState<{
    title: string;
    description?: string;
    status: "to-do" | "in-progress" | "done";
    priority: "low" | "medium" | "high";
    dueDate?: string;
    labels?: string[];
    assignee?: string;
    boardId: string;
    columnId: string;
    createdBy: string;
    updatedBy?: string;
    createdAt: string;
    updatedAt?: string;
    _id: string;
  }>({
    title: "",
    status: "to-do",
    priority: "low",
    boardId: "",
    columnId: "",
    createdBy: "",
    createdAt: "",
    _id: "",
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("🚀 ~ file: TicketForm.tsx:14 ~ form:", form);
    onClose();
  };

  return (
    <Modal isOpen={isOpen}>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto p-4 bg-white rounded shadow-md"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            value={form?.title}
            onChange={(e) =>
              setForm({
                ...form,
                [e.target.name]: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            name="description"
            value={form?.description}
            onChange={(e) =>
              setForm({
                ...form,
                [e.target.name]: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="status"
          >
            Status
          </label>
          <select
            name="status"
            value={form?.status}
            onChange={(e) =>
              setForm({
                ...form,
                [e.target.name]: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="to-do">To-Do</option>
            <option value="in-progress">In-Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="priority"
          >
            Priority
          </label>
          <select
            name="priority"
            value={form?.priority}
            onChange={(e) =>
              setForm({
                ...form,
                [e.target.name]: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="dueDate"
          >
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={form?.dueDate}
            onChange={(e) =>
              setForm({
                ...form,
                [e.target.name]: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="labels"
          >
            Labels (comma separated)
          </label>
          <input
            type="text"
            name="labels"
            value={form?.labels}
            onChange={(e) =>
              setForm({
                ...form,
                [e.target.name]: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="assignee"
          >
            Assignee
          </label>
          <input
            type="text"
            name="assignee"
            value={form?.assignee}
            onChange={(e) =>
              setForm({
                ...form,
                [e.target.name]: e.target.value,
              })
            }
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {isEdit ? "Update Ticket" : "Create Ticket"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TicketForm;
