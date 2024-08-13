/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IColumn } from '../../interfaces/IColumn';
import { ITask } from '../../interfaces/ITask';
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
        fetchColumnsApi: (state) => {
            console.log(state);
        },
        fetchTasksApi: (state) => {
            console.log(state);
        },
        fetchBoardsApi: (state) => {
            console.log(state);
        },
        createTaskApi: (state, action: PayloadAction<ITask>) => {
            console.log(state, action);
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        updateTaskApi: (state, action: PayloadAction<ITask>) => {
            console.log(state, action);
        },
        createBoardApi: (state) => {
            console.log(state);
        },
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
            const index = state.tasks.findIndex((task: ITask) => task._id === action.payload._id);
            if (index !== -1) {
                // Update existing task
                state.tasks[index] = action.payload;
            } else {
                // Add new task
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