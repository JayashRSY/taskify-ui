import * as Icons from "react-feather";
import { toLowerCase, toTitleCase } from "../utils/stringCase";
import { toDDMMYYYY } from "../utils/formatDate";
import { ITask } from "../interfaces/ITask";
import { useState } from "react";
import Modal from "./Modal";
import TaskModal from "./TaskModal";

interface TaskProps {
  task: ITask;
}
const Task: React.FC<TaskProps> = ({ task }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="p-5 bg-white rounded-lg my-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex justify-between">
        <p
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
        </p>
        <Icons.MoreHorizontal
          className="hover:cursor-pointer"
          onClick={openModal}
        />
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <TaskModal task={task} />
        </Modal>
      </div>
      <p className="text-xl font-bold my-1">{task.title}</p>
      <p className="text-gray-500">{task.description}</p>
      <p className="mt-3">
        <span className="font-bold text-gray-700">Deadline: </span>
        {task.dueDate ? (
          <span className="text-gray-700">
            {toDDMMYYYY(new Date(task.dueDate))}
          </span>
        ) : (
          <span className="text-gray-700">No due date.</span>
        )}
      </p>
    </div>
  );
};
export default Task;
