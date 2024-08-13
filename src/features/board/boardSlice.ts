/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IColumn } from '../../interfaces/IColumn';
import { ITask } from '../../interfaces/ITask';
import { toLowerCase } from '../../utils/stringCase';

export interface BoardState {
    boards: any;
    columns: any;
    tasks: any;
}

const initialState: BoardState = {
    boards: [],
    columns: [
        {
            _id: "column-1",
            name: "To Do",
            taskIds: [],
        },
        {
            _id: "column-2",
            name: "In Progress",
            taskIds: [],
        },
        {
            _id: "column-3",
            name: "Done",
            taskIds: [],
        },
    ],
    tasks: []
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        fetchColumnsApi: (state) => { },
        fetchTasksApi: (state) => { },
        fetchBoardsApi: (state) => { },
        createTaskApi: (state, action: PayloadAction<ITask>) => { },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        updateTaskApi: (state, action: PayloadAction<any>) => { },
        createBoardApi: (state) => { },
        setBoards: (state, action: PayloadAction<any>) => {
            state.boards = action.payload
        },
        setColumns: (state, action: PayloadAction<any>) => {
            state.columns = action.payload
        },
        updateColumn: (state, action: PayloadAction<IColumn>) => {
            const index = state.columns.findIndex((col: IColumn) => col._id === action.payload._id);
            if (index !== -1) {
                state.columns[index] = action.payload;
            }
        },
        updateMultipleColumns: (state, action: PayloadAction<{ startColumn: IColumn; finishColumn: IColumn }>) => {
            console.log("🚀 ~ file: boardSlice.ts:80 ~ action:", action.payload);
            const { startColumn, finishColumn } = action.payload;

            const startIndex = state.columns.findIndex((col: IColumn) => col._id === startColumn._id);
            const finishIndex = state.columns.findIndex((col: IColumn) => col._id === finishColumn._id);

            if (startIndex !== -1) {
                state.columns[startIndex] = startColumn;
            }
            if (finishIndex !== -1) {
                state.columns[finishIndex] = finishColumn;
            }
        },
        setTasks: (state, action: PayloadAction<any>) => {
            console.log("🚀 ~ file: boardSlice.ts:74 ~ action:", action.payload);
            action.payload.forEach((task: ITask) => {
                state.columns.forEach((col: any) => {
                    if (col.name.toLowerCase() === task.status.toLowerCase()) {
                        if (!col.taskIds.includes(task._id)) {
                            col.taskIds.push(task._id);
                        }
                    } else {
                        col.taskIds = col.taskIds.filter((id: string) => id !== task._id);
                    }
                });
            });
            state.tasks = action.payload
        },
        addTask: (state, action: PayloadAction<ITask>) => {
            if (!state.tasks.includes(action.payload)) {
                state.tasks.push(action.payload);
            }
            state.columns.forEach((col: any) => {
                if (col.name.toLowerCase() === action.payload.status.toLowerCase()) {
                    if (!col.taskIds.includes(action.payload._id)) {
                        col.taskIds.push(action.payload._id);
                    }
                } else {
                    col.taskIds = col.taskIds.filter((id: string) => id !== action.payload._id);
                }
            });
            // Assuming the first column is at index 0
            // if (state.columns.length > 0) {
            //     const firstColumnId = state.columns[0]._id;
            //     const firstColumn = state.columns.find((col: IColumn) => col._id === firstColumnId);

            //     if (firstColumn) {
            //         firstColumn.taskIds.push(action.payload._id); // Assuming tasks are referenced by their IDs
            //     }
            // }
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    fetchBoardsApi,
    fetchColumnsApi,
    fetchTasksApi,
    createTaskApi,
    updateTaskApi,
    createBoardApi,
    setBoards,
    setColumns,
    updateColumn,
    updateMultipleColumns,
    setTasks,
    addTask
} = boardSlice.actions

export default boardSlice.reducer