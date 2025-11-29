// services/plantService.js
import api from './api';
import { userService } from './userService';

let currentUserId = null;

export const plantService = {
  // Buscar todas as plantas do usuário
  getAllPlants: async () => {
    try {
      if (!currentUserId) {
        currentUserId = await userService.getOrCreateUser();
      }
      
      console.log(`🟡 Buscando plantas do usuário ${currentUserId}...`);
      const response = await api.get(`/users/${currentUserId}/plants`);
      console.log('🟢 Plantas carregadas:', response.data);
      return response.data;
    } catch (error) {
      console.error('🔴 Erro ao buscar plantas:', error);
      throw error;
    }
  },

  // Criar nova planta
  createPlant: async (plantData) => {
    try {
      if (!currentUserId) {
        currentUserId = await userService.getOrCreateUser();
      }
      
      console.log('🔍 Dados do formulário:', plantData);
      console.log('🔍 UserId:', currentUserId);
      
      const requestData = {
        searchName: plantData.especie || plantData.nome,
        nickname: plantData.nome
      };
      
      console.log('📤 Enviando para backend:', JSON.stringify(requestData));
      console.log('🔗 URL:', `/users/${currentUserId}/plants`);
      
      const response = await api.post(`/users/${currentUserId}/plants`, requestData);
      console.log('✅ Resposta do backend:', response.data);
      return response.data;
      
    } catch (error) {
      console.error('❌ Erro detalhado:');
      console.error('Status:', error.response?.status);
      console.error('URL:', error.config?.url);
      console.error('Dados enviados:', error.config?.data);
      console.error('Resposta do backend:', error.response?.data);
      throw error;
    }
  },

  // Atualizar planta
  updatePlant: async (id, plantData) => {
    try {
      console.log(`🟡 Atualizando planta ${id}...`);
      
      const requestData = {
        nickname: plantData.nome
      };
      
      const response = await api.put(`/plants/${id}`, requestData);
      console.log('🟢 Planta atualizada:', response.data);
      return response.data;
    } catch (error) {
      console.error('🔴 Erro ao atualizar planta:', error);
      throw error;
    }
  },

  // Deletar planta
  deletePlant: async (id) => {
    try {
      console.log(`🟡 Deletando planta ${id}...`);
      
      await api.delete(`/plants/${id}`);
      console.log('🟢 Planta deletada');
      return { success: true };
    } catch (error) {
      console.error('🔴 Erro ao deletar planta:', error);
      throw error;
    }
  }
};

export default plantService;