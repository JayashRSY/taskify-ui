import { useState } from "react";
import { ITask } from "../interfaces/ITask";
import * as Icons from "react-feather";
import TicketForm from "./TicketForm";
import { toLowerCase, toTitleCase } from "../utils/stringCase";

interface TaskModalProps {
  task: ITask;
}

const TaskModal: React.FC<TaskModalProps> = ({ task }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openFormModal = () => setIsFormOpen(true);
  const closeFormModal = () => setIsFormOpen(false);

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold flex items-center border-b-4 border-black">
          {task.title}
          <Icons.Edit
            className="hover:cursor-pointer ml-5"
            onClick={openFormModal}
          />
        </h1>
        <div className="max-w-md mx-auto p-3 mb-6 transition-transform transform">
          {/* <div className="mb-4">
            <p className="text-sm text-secondary">
              Board ID: {task.boardId} | Column ID: {task.columnId}
            </p>
          </div> */}

          <div className="mb-4">
            <p className="text-textPrimary">
              {task.description}
            </p>
            <p className="text-textPrimary">
              <span className="font-medium">Due Date:</span> {task.dueDate}
            </p>
            <p className="text-textPrimary flex items-center">
              <span
                className={`bg-blue-100 px-2 rounded-md ${
                  toLowerCase(task.priority) === "low"
                    ? " text-blue-500 bg-blue-100"
                    : toLowerCase(task.priority) === "medium"
                    ? " text-yellow-500 bg-yellow-100"
                    : toLowerCase(task.priority) === "high"
                    ? " text-red-500 bg-red-100"
                    : "text-cyan-500 bg-cyan-100"
                }`}
              >
                {toTitleCase(task.priority)}
              </span>
            </p>
            <p className="text-textPrimary">
              <span
                className={`px-2 py-1 rounded text-white ml-2 
            ${
              toLowerCase(task.status) === "done"
                ? "bg-green"
                : toLowerCase(task.status) === "in progress"
                ? "bg-orange"
                : toLowerCase(task.status) === "to do"
                ? "bg-blue"
                : "bg-secondary"
            }`}
              >
                {task.status}
              </span>
            </p>
          </div>

          <div className="mb-4">
            <p className="text-textPrimary">
              <span className="font-medium">Assignee:</span> {task.assignee}
            </p>
            <p className="text-textPrimary">
              <span className="font-medium">Labels:</span>{" "}
              {task.labels.join(", ")}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-textPrimary">
              <span className="font-medium">Created By:</span> {task.createdBy}
            </p>
            <p className="text-textPrimary">
              <span className="font-medium">Updated By:</span> {task.updatedBy}
            </p>
          </div>

          <div className="text-sm text-textSecondary">
            <p>
              <span className="font-medium">Created At:</span> {task.createdAt}
            </p>
            <p>
              <span className="font-medium">Updated At:</span> {task.updatedAt}
            </p>
          </div>
        </div>
      </div>
      <TicketForm isOpen={isFormOpen} onClose={closeFormModal} task={task} />
    </>
  );
};
export default TaskModal;
