import * as Icons from "react-feather";
const Task = () => {
  return (
    <div className="p-5 bg-white rounded-lg my-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
      <div className="flex justify-between">
        <p className="bg-blue-100 px-1 text-blue-500 rounded-md">Low</p>
        <Icons.MoreHorizontal className="hover:cursor-pointer" />
      </div>
      <p className="text-xl font-bold my-1">Onboarding Illustrations </p>
      <p className="text-gray-500">Brainstorming brings team members' diverse experience into play. </p>
      <p className="mt-3">
        <span className="font-bold text-gray-500">Deadline:</span>
        <span className="text-gray-500">12/5/24</span>
      </p>
    </div>
  );
};
export default Task;
