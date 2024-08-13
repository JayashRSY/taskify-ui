import axiosClient from './axiosClient';
import { API_ENDPOINTS } from './apiEndpoints';
import { ITask } from '../interfaces/ITask';

export const createTicket = async (payload: ITask) => {
    const response = await axiosClient.post(API_ENDPOINTS.CREATE_TICKET, payload);
    return response.data;
};
export const getTickets = async () => {
    const response = await axiosClient.get(API_ENDPOINTS.GET_TICKETS);
    return response.data;
};

export const getTicket = async (ticketId: string) => {
    const response = await axiosClient.get(`${API_ENDPOINTS.GET_TICKET}/${ticketId}`);
    return response.data;
};

export const updateTicket = async (ticketId: string, payload: ITask) => {
    const response = await axiosClient.put(`${API_ENDPOINTS.UPDATE_TICKET}/${ticketId}`, payload);
    return response.data;
};

export const deleteTicket = async (ticketId: string) => {
    const response = await axiosClient.delete(`${API_ENDPOINTS.DELETE_TICKET}/${ticketId}`);
    return response.data;
};
