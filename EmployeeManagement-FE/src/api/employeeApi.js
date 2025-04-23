import axios from 'axios';

const API_BASE = 'https://localhost:7138/api/employee';

export const getAllEmployees = () => axios.get(`${API_BASE}/list`);
export const getEmployee = (id) => axios.get(`${API_BASE}/getdetail/${id}`);
export const createEmployee = (data) => axios.post(`${API_BASE}/create`, data);
export const updateEmployee = (id, data) => axios.put(`${API_BASE}/update/${id}`, data);
export const deleteEmployee = (id) => axios.delete(`${API_BASE}/delete/${id}`);
