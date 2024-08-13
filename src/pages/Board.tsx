import React, { useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import FilterBar from "../components/FilterBar";
import StatusBox from "../components/StatusBox";
import Task from "../components/Task";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { IColumn } from "../interfaces/IColumn";
import { useDispatch } from "react-redux";
import {
  // fetchBoardsApi,
  fetchTasksApi,
  updateColumn,
  updateMultipleColumns,
} from "../features/board/boardSlice";
import { ITask } from "../interfaces/ITask";
import { toast } from "react-toastify";
import { updateTicket } from "../api/ticketApi";

const Board: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, columns } = useSelector((state: RootState) => state.board);

  const { filteredTasks } = useSelector((state: RootState) => state.filter);
  useEffect(() => {
    // dispatch(fetchBoardsApi());
    // dispatch(fetchColumns());
    dispatch(fetchTasksApi());
  }, [dispatch]);
  useEffect(() => {}, [tasks]);

  const onDragEnd = async (result: DropResult) => {
    try {
      const { destination, source, draggableId } = result;

      if (!destination) return;

      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }

      const startColumn = columns.find(
        (col: IColumn) => col._id === source.droppableId
      )!;
      const finishColumn = columns.find(
        (col: IColumn) => col._id === destination.droppableId
      )!;

      if (startColumn === finishColumn) {
        const newTaskIds = Array.from(startColumn.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn: IColumn = {
          ...startColumn,
          taskIds: newTaskIds,
        };

        dispatch(updateColumn(newColumn));
      } else {
        const startTaskIds = Array.from(startColumn.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStartColumn: IColumn = {
          ...startColumn,
          taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finishColumn.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinishColumn: IColumn = {
          ...finishColumn,
          taskIds: finishTaskIds,
        };
        const taskChanged: ITask | undefined = filteredTasks?.find(
          (task: ITask) => task._id === draggableId
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const taskDestination: any = columns?.find(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (col: any) => col._id === destination.droppableId
        );
        // dispatch(
        //   updateTaskApi({
        //     _id: taskChanged._id,
        //     payload: { status: taskDestination.name },
        //   })
        // );
        if (taskChanged?._id) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const res: any = await updateTicket(taskChanged._id, {
            status: taskDestination.name,
          } as ITask);
          if (res.success) {
            dispatch(
              updateMultipleColumns({
                startColumn: newStartColumn,
                finishColumn: newFinishColumn,
              })
            );
          } else {
            toast.error(res.message);
          }
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getTaskById = (id: string): ITask | undefined =>
    filteredTasks?.find((task: ITask) => task._id === id);

  return (
    <>
      <div className="p-5">
        <FilterBar />
        <div className="flex pt-2">
          <div className="flex-2 justify-center p-5 rounded-lg">
            <StatusBox />
          </div>
          <div className="flex-1 justify-center p-5 rounded-lg">
            <DragDropContext onDragEnd={onDragEnd}>
              <div className="flex">
                {columns?.map((column: IColumn) => (
                  <div
                    key={column._id}
                    className="flex-1 justify-center bg-gray-100 p-5 m-5 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                  >
                    <h2
                      className={`font-bold pb-2 border-b-4 flex align-middle justify-center items-center  ${
                        column.name === "To Do"
                          ? " border-indigo-500"
                          : column.name === "In Progress"
                          ? " border-orange-500"
                          : column.name === "Done"
                          ? " border-green-500"
                          : "border-black-500"
                      }`}
                    >
                      <span
                        className={`w-[10px] h-[10px] rounded-full mx-2 ${
                          column.name === "To Do"
                            ? " bg-indigo-500"
                            : column.name === "In Progress"
                            ? " bg-orange-500"
                            : column.name === "Done"
                            ? " bg-green-500"
                            : "bg-black-500"
                        }`}
                      ></span>
                      {column.name}
                      <span className=" flex justify-center align-middle rounded-full bg-gray-300 text-gray-700 px-2 mx-2">
                        {column.taskIds.length}
                      </span>
                    </h2>
                    <Droppable droppableId={column._id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="py-2"
                        >
                          {column?.taskIds?.map((taskId, index) => {
                            const task = getTaskById(taskId);
                            return task ? (
                              <Draggable
                                key={task._id}
                                draggableId={task._id ?? ""}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <Task task={task} />
                                  </div>
                                )}
                              </Draggable>
                            ) : null;
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </div>
            </DragDropContext>
          </div>
        </div>
      </div>
    </>
  );
};

export default Board;
