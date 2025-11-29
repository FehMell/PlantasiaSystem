//mock do crud  p integração 
let plantas = [
  { id: 1, nome: 'Jiboia', comodo: 'Sala de estar', favorita: true },
  { id: 2, nome: 'Espada de São Jorge', comodo: 'Quarto', favorita: false },
  { id: 3, nome: 'Samambaia', comodo: 'Cozinha', favorita: false }
];

export async function getPlantas() {
  return plantas;
}

export async function addPlanta(planta) {
  const nova = { ...planta, id: Date.now() };
  plantas.push(nova);
  return nova;
}

export async function editPlanta(id, dados) {
  plantas = plantas.map(p => p.id === id ? { ...p, ...dados } : p);
  return plantas.find(p => p.id === id);
}

export async function deletePlanta(id) {
  plantas = plantas.filter(p => p.id !== id);
  return true;
}

