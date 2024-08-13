import TimerIcon from "../assets/icons/TimerIcon";
import * as Icon from "react-feather";
import WorkIcon from "../assets/icons/WorkIcon";
import WarningIcon from "../assets/icons/WarningIcon";
import { useEffect, useState } from "react";
import TicketForm from "./TicketForm";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { ITask } from "../interfaces/ITask";

const StatusBox = () => {
  const { tasks } = useSelector((state: RootState) => state.board);
  const [expiredTasks, setExpiredTasks] = useState<ITask[]>([]);
  const [completedTasks, setCompletedTasks] = useState<ITask[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openModal = () => setIsFormOpen(true);
  const closeModal = () => setIsFormOpen(false);

  useEffect(() => {
    setExpiredTasks(
      tasks.filter((task: ITask) => {
        const date = new Date(task.dueDate ?? "");
        const today = new Date();
        return date < today;
      })
    );
    setCompletedTasks(
      tasks.filter((task: ITask) => {
        return task.status.toLowerCase() === "done";
      })
    );
  }, [tasks]);

  return (
    <div>
      <button
        onClick={openModal}
        className="flex font-bold bg-purple-950 hover:bg-purple-900 text-white p-5 my-5 rounded-[10px] w-full justify-center"
      >
        <Icon.Plus />
        Add Task
      </button>
      <TicketForm isOpen={isFormOpen} onClose={closeModal} />
      <div className="bg-gray-100 p-5 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] mb-5">
        <WarningIcon />
        <p className="font-bold text-md text-gray-500 py-5">Expired Tasks</p>
        <p className="font-bold text-3xl">{expiredTasks?.length || 0}</p>
      </div>
      <div className="bg-gray-100 p-5 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] mb-5">
        <WorkIcon />
        <p className="font-bold text-md text-gray-500 py-5">All Active Tasks</p>
        <p className="font-bold text-3xl">{tasks.length}</p>
      </div>
      <div className="bg-gray-100 p-5 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] mb-5">
        <TimerIcon />
        <p className="font-bold text-md text-gray-500 py-5">Completed Tasks</p>
        <p className="font-bold text-3xl">
          {completedTasks?.length || 0}/{tasks.length}
        </p>
      </div>
    </div>
  );
};
export default StatusBox;
