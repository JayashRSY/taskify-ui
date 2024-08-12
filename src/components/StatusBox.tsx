import TimerIcon from "../assets/icons/TimerIcon";
import * as Icon from "react-feather";
import WorkIcon from "../assets/icons/WorkIcon";
import WarningIcon from "../assets/icons/WarningIcon";
import { useState } from "react";
import TicketForm from "./TicketForm";

const StatusBox = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openModal = () => setIsFormOpen(true);
  const closeModal = () => setIsFormOpen(false);

  return (
    <div>
      <div className="bg-gray-200 p-5 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] mb-5">
        <WarningIcon />
        <p className="font-bold text-md text-gray-500 py-5">Expired Tasks</p>
        <p className="font-bold text-3xl">5</p>
      </div>
      <div className="bg-gray-200 p-5 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] mb-5">
        <WorkIcon />
        <p className="font-bold text-md text-gray-500 py-5">All Active Tasks</p>
        <p className="font-bold text-3xl">7</p>
      </div>
      <div className="bg-gray-200 p-5 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)] mb-5">
        <TimerIcon />
        <p className="font-bold text-md text-gray-500 py-5">Completed Tasks</p>
        <p className="font-bold text-3xl">2/7</p>
      </div>
      <button
        onClick={openModal}
        className="flex font-bold bg-purple-950 hover:bg-purple-900 text-white p-5 rounded-full w-full justify-center"
      >
        <Icon.Plus />
        Add Task
      </button>
      <TicketForm isOpen={isFormOpen} isEdit={false} onClose={closeModal} />
    </div>
  );
};
export default StatusBox;
