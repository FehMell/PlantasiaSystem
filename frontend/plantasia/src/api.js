// mock p integração c backend


export async function getUsuario() {
  return {
    id: 1,
    nome: 'liv',
    email: 'liv@plantasia.com',
    jardim: [1, 2, 3]
  };
}

// ex login
export async function login(email, senha) {
  // Simula login
  if (email === 'livv@plantasia.com' && senha === '123') {
    return { sucesso: true, token: 'mock-token' };
  }
  return { sucesso: false };
}

// ex registro
export async function registrar(nome, email, senha) {
  // Simula registro
  return { sucesso: true, id: 2, nome, email };
}

