// services/plantService.js
import api from './api';
import userService from './userService';

export const plantService = {
  // Buscar todas as plantas do usuário
  getAllPlants: async () => {
    const currentUserId = localStorage.getItem('plantasia_user_id');
    if (!currentUserId) throw new Error('Usuário não logado');
    const response = await api.get(`/users/${currentUserId}/plants`);
    return response.data.map(planta => ({
      id: planta.id,
      nickname: planta.plantNickname, // apelido
      searchName: planta.commonName,  // espécie
      imagem: planta.imageUrl         // imagem
    }));
  },

  // Criar nova planta
  createPlant: async (plantData) => {
    const currentUserId = localStorage.getItem('plantasia_user_id');
    if (!currentUserId) throw new Error('Usuário não logado');
    const requestData = {
      searchName: plantData.especie || plantData.nome,
      nickname: plantData.nome
    };
    const response = await api.post(`/users/${currentUserId}/plants`, requestData);
    return response.data;
  },

  // Atualizar planta
  updatePlant: async (id, plantData) => {
    const requestData = {
      nickname: plantData.nome
    };
    const response = await api.put(`/plants/${id}`, requestData);
    return response.data;
  },

  // Deletar planta
  deletePlant: async (id) => {
    await api.delete(`/plants/${id}`);
    return { success: true };
  },

  // Buscar espécies de plantas
  getSpecies: async () => {
    const response = await api.get('/plants/species'); // ajuste a rota conforme o backend
    return response.data;
  }
};

export default plantService;