import FilterBar from "../components/FilterBar";
import StatusBox from "../components/StatusBox";
import Task from "../components/Task";

const Board = () => {
  return (
    <div className="p-5">
      <FilterBar />
      <div className="flex pt-2">
        <div className="flex-1 justify-center p-5 rounded-lg">
          <StatusBox />
        </div>
        <div className="flex-1 justify-center bg-gray-200 p-5 m-5 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <h2 className="text-center font-bold pb-2 border-b-4 border-indigo-500">
            To Do
          </h2>
          <div className="">
            <Task />
            <Task />
          </div>
        </div>
        <div className="flex-1 justify-center bg-gray-200 p-5 m-5 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <h2 className="text-center font-bold pb-2 border-b-4 border-orange-500">
            In Progress
          </h2>
        </div>
        <div className="flex-1 justify-center bg-gray-200 p-5 m-5 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <h2 className="text-center font-bold pb-2 border-b-4 border-green-500">
            Done
          </h2>
        </div>
      </div>
    </div>
  );
};
export default Board;
