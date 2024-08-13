import axiosClient from './axiosClient';
import { API_ENDPOINTS } from './apiEndpoints';

export const getBoards = async () => {
    const response = await axiosClient.get(API_ENDPOINTS.GET_BOARDS);
    return response.data;
};

export const getBoard = async (boardId: string) => {
    const response = await axiosClient.get(`${API_ENDPOINTS.GET_BOARD}/${boardId}`);
    return response.data;
};

export const updateBoard = async (boardId: string, payload: {
    name?: string;
    email?: string;
    profilePicture?: string;
    role?: string;
    password?: string;
}) => {
    const response = await axiosClient.put(`${API_ENDPOINTS.UPDATE_BOARD}/${boardId}`, payload);
    return response.data;
};

export const deleteBoard = async (boardId: string) => {
    const response = await axiosClient.delete(`${API_ENDPOINTS.DELETE_BOARD}/${boardId}`);
    return response.data;
};
