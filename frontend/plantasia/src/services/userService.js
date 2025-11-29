import api from './api';

export const userService = {
  getOrCreateUser: async () => {
    try {
      console.log('🟡 Buscando usuários existentes...');
      const response = await api.get('/users');
      console.log('Usuários encontrados:', response.data);

      if (response.data.length > 0) {
        const userId = response.data[0].id;
        console.log('✅ Usando usuário existente:', userId);
        localStorage.setItem('userId', userId);
        return userId;
      }

      console.log('🟡 Criando novo usuário...');
      const newUserResponse = await api.post('/users', { name: "Usuario Plantasia" });
      const newUserId = newUserResponse.data.id;

      console.log('✅ Novo usuário criado:', newUserId);
      localStorage.setItem('userId', newUserId);
      return newUserId;

    } catch (error) {
      console.error('❌ Erro ao buscar/criar usuário:', error);
      localStorage.setItem('userId', '1'); // fallback
      return '1';
    }
  }
};

export default userService;