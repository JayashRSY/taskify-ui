import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import FilterBar from "../components/FilterBar";
import StatusBox from "../components/StatusBox";

interface Task {
  id: string;
  title: string;
  description: string;
}

interface Column {
  id: string;
  name: string;
  taskIds: string[];
}

const Board: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "task-1", title: "Task 1", description: "Task 1 Description" },
    { id: "task-2", title: "Task 2", description: "Task 2 Description" },
    { id: "task-3", title: "Task 3", description: "Task 3 Description" },
  ]);

  const [columns, setColumns] = useState<Column[]>([
    {
      id: "column-1",
      name: "To Do",
      taskIds: ["task-1", "task-2"],
    },
    {
      id: "column-2",
      name: "In Progress",
      taskIds: ["task-3"],
    },
    {
      id: "column-3",
      name: "Done",
      taskIds: [],
    },
  ]);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = columns.find((col) => col.id === source.droppableId)!;
    const finishColumn = columns.find(
      (col) => col.id === destination.droppableId
    )!;

    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn: Column = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      setColumns((prev) =>
        prev.map((col) => (col.id === newColumn.id ? newColumn : col))
      );
    } else {
      const startTaskIds = Array.from(startColumn.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStartColumn: Column = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finishColumn.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinishColumn: Column = {
        ...finishColumn,
        taskIds: finishTaskIds,
      };

      setColumns((prev) =>
        prev.map((col) =>
          col.id === newStartColumn.id
            ? newStartColumn
            : col.id === newFinishColumn.id
            ? newFinishColumn
            : col
        )
      );
    }
  };

  const getTaskById = (id: string): Task | undefined =>
    tasks.find((task) => task.id === id);

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
                {columns.map((column) => (
                  <div
                    key={column.id}
                    className="flex-1 justify-center bg-gray-200 p-5 m-5 rounded-lg shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
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
                      <span className=" flex justify-center align-middle rounded-full bg-gray-300 px-2 mx-2">
                        {column.taskIds.length}
                      </span>
                    </h2>
                    <Droppable droppableId={column.id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="py-2"
                        >
                          {column.taskIds.map((taskId, index) => {
                            const task = getTaskById(taskId);
                            return task ? (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="bg-white p-3 mb-3 rounded shadow"
                                  >
                                    <h3 className="font-bold">{task.title}</h3>
                                    <p>{task.description}</p>
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
