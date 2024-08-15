// src/middleware/apiListenerMiddleware.ts
import { createListenerMiddleware } from '@reduxjs/toolkit';
import {
    createTaskApi,
    addTask,
    // updateTask,
    fetchBoardsApi,
    fetchColumnsApi,
    fetchTasksApi,
    setBoards,
    setColumns,
    setTasks,
    updateTaskApi
} from '../features/board/boardSlice';
import { createTicket, getTickets, updateTicket } from '../api/ticketApi';
import { toast } from 'react-toastify';

const apiListenerMiddleware = createListenerMiddleware();

apiListenerMiddleware.startListening({
    actionCreator: createTaskApi,
    effect: async (action, listenerApi) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res: any = await createTicket(action.payload);
            if (res.success) {
                listenerApi.dispatch(addTask(res.data));
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message);
        }
    },
});
apiListenerMiddleware.startListening({
    actionCreator: updateTaskApi,
    effect: async (action, listenerApi) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res: any = await updateTicket(action.payload._id || '', action.payload);
            if (res.success) {
                listenerApi.dispatch(addTask(res.data));
                toast.success(res.message)
            } else {
                toast.error(res.message)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message);
        }
    },
});
apiListenerMiddleware.startListening({
    actionCreator: fetchTasksApi,
    effect: async (action, listenerApi) => {
        console.log("🚀 ~ file: apiListener.ts:59 ~ action:", action);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res: any = await getTickets();
            if (res.success) {
                listenerApi.dispatch(setTasks(res.data));
            } else {
                toast.error(res.message)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message);
        }
    },
});
apiListenerMiddleware.startListening({
    actionCreator: fetchColumnsApi,
    effect: async (action, listenerApi) => {
        console.log("🚀 ~ file: apiListener.ts:77 ~ action:", action);
        try {
            const tasks = await getTickets();
            listenerApi.dispatch(setColumns(tasks));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message);
        }
    },
});
apiListenerMiddleware.startListening({
    actionCreator: fetchBoardsApi,
    effect: async (action, listenerApi) => {
        console.log("🚀 ~ file: apiListener.ts:90 ~ action:", action);
        try {
            const tasks = await getTickets();
            listenerApi.dispatch(setBoards(tasks));
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message);
        }
    },
});
export default apiListenerMiddleware;
