// services/authService.js
import api from './api';

const USER_ID_KEY = 'plantasia_user_id';

const saveUserId = (userId) => {
  localStorage.setItem(USER_ID_KEY, userId);
};

const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY);
};

const saveToken = (token) => {
  localStorage.setItem('token', token);
};

const login = async (email) => {
  // Buscar usuário por email não existe no backend
  // Solução: buscar todos usuários e filtrar por email
  try {
    const response = await api.get('/users');
    const user = response.data.find(u => u.email === email);
    if (!user) throw new Error('Usuário não encontrado');
    saveUserId(user.id);
    return user;
  } catch (error) {
    throw error;
  }
};

const register = async (name, email) => {
  try {
    const response = await api.post('/users', { name, email });
    const userId = response.data.id;
    const token = response.data.token;
    saveUserId(userId);
    if (token) saveToken(token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  login,
  register,
  getUserId,
  saveUserId,
  saveToken
};
