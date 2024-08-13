import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useDispatch } from "react-redux";
import { createTaskApi, updateTaskApi } from "../features/board/boardSlice";
import { ITask } from "../interfaces/ITask";

interface TicketFormProps {
  isOpen: boolean;
  onClose: () => void;
  task?: ITask;
}

const TicketForm: React.FC<TicketFormProps> = ({ isOpen, task, onClose }) => {
  const dispatch = useDispatch();

  const [form, setForm] = useState<{
    title: string;
    description?: string;
    status: string;
    priority: "low" | "medium" | "high";
    dueDate?: string;
    labels?: string[];
    assignee?: string;
    boardId?: string;
    columnId?: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
  }>({
    title: "",
    status: "to do",
    priority: "low",
  });

  useEffect(() => {
    if (task) {
      setForm(task);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      dispatch(updateTaskApi({ ...form, _id: task._id }));
    } else {
      dispatch(createTaskApi(form as ITask));
    }
    onClose();
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
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

        <div className="flex flex-col sm:flex-row justify-between">
          <div className="mb-4 flex-1 mr-1">
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
              <option value="to do">To-Do</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>

          <div className="mb-4 flex-1 ml-1">
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
        </div>
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="mb-4 flex-1 mr-1">
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
          <div className="mb-4 flex-1 ml-1">
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

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            {task ? "Update Ticket" : "Create Ticket"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default TicketForm;
