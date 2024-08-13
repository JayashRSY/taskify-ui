import axiosClient from './axiosClient';
import { API_ENDPOINTS } from './apiEndpoints';

export const getColumns = async () => {
    const response = await axiosClient.get(API_ENDPOINTS.GET_COLUMNS);
    return response.data;
};

export const getColumn = async (columnId: string) => {
    const response = await axiosClient.get(`${API_ENDPOINTS.GET_COLUMN}/${columnId}`);
    return response.data;
};

export const updateColumn = async (columnId: string, payload: {
    name?: string;
    email?: string;
    profilePicture?: string;
    role?: string;
    password?: string;
}) => {
    const response = await axiosClient.put(`${API_ENDPOINTS.UPDATE_COLUMN}/${columnId}`, payload);
    return response.data;
};

export const deleteColumn = async (columnId: string) => {
    const response = await axiosClient.delete(`${API_ENDPOINTS.DELETE_COLUMN}/${columnId}`);
    return response.data;
};
