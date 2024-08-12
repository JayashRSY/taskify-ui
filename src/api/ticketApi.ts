import axiosClient from './axiosClient';
import { API_ENDPOINTS } from './apiEndpoints';

export const getAllTicket = async () => {
    const response = await axiosClient.get(API_ENDPOINTS.GET_TICKETS);
    return response.data;
};

export const getTicket = async (ticketId: string) => {
    const response = await axiosClient.get(`${API_ENDPOINTS.GET_TICKET}/:${ticketId}`);
    return response.data;
};

export const updateTicket = async (ticketId: string, payload: {
    name?: string;
    email?: string;
    profilePicture?: string;
    role?: string;
    password?: string;
}) => {
    const response = await axiosClient.put(`${API_ENDPOINTS.UPDATE_TICKET}/:${ticketId}`, payload);
    return response.data;
};

export const deleteTicket = async (ticketId: string) => {
    const response = await axiosClient.delete(`${API_ENDPOINTS.DELETE_TICKET}/:${ticketId}`);
    return response.data;
};
