import axios from 'axios';

const BASE_URL = 'https://localhost:7138/api/skill';

export const getSkills = () => axios.get(`${BASE_URL}/list`);
export const createSkill = (skillName) =>
    axios.post(`${BASE_URL}/create`, { name: skillName });
export const assignSkill = (employeeId, skillId) =>
    axios.post(`${BASE_URL}/assign?employeeId=${employeeId}&skillId=${skillId}`);
export const getSkillStatistics = () => axios.get(`${BASE_URL}/statistics`);
