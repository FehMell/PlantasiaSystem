import { FaSearch, FaLeaf, FaPlusCircle } from 'react-icons/fa';
import { useState } from 'react';

function Enciclopedia() {
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ nome: '', descricao: '', cuidados: '' });

  const plantas = [
    {
      nome: "Monstera Deliciosa",
      descricao: "Planta tropical famosa por suas folhas recortadas.",
      cuidados: "Luz indireta • Rega moderada",
      imagem: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    },
    {
      nome: "Ficus Lyrata",
      descricao: "Conhecida como 'figueira-lira', ótima para ambientes internos.",
      cuidados: "Luz intensa • Rega semanal",
      imagem: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
    },
  ];

  const plantasFiltradas = plantas.filter(p =>
    p.nome.toLowerCase().includes(query.toLowerCase()) ||
    p.descricao.toLowerCase().includes(query.toLowerCase())
  );

  function handleAddPlanta(planta) {
    setForm({ nome: planta.nome, descricao: planta.descricao, cuidados: planta.cuidados });
    setModalOpen(true);
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <section className="mb-10 text-center">
        <h1 className="text-3xl font-bold mb-2 text-[#294D1C]">Enciclopédia de Plantas</h1>
        <p className="text-gray-600 mb-6">Explore informações sobre diversas espécies de plantas. Minimalista, responsivo e fácil de navegar.</p>
        <form className="flex items-center justify-center gap-2 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
          <div className="relative w-full">
            <label htmlFor="search" className="sr-only">Buscar planta</label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch className="h-4 w-4" />
            </span>
            <input
              id="search"
              type="search"
              placeholder="Buscar planta..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus:outline-none focus:border-[#294D1C] transition"
              aria-label="Buscar planta"
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="px-4 py-2 rounded-full bg-[#294D1C] text-white font-medium hover:bg-[#1e3714] transition-colors">
            Buscar
          </button>
        </form>
      </section>
      <section>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {plantasFiltradas.length === 0 ? (
            <li className="col-span-2 text-center text-gray-400 py-10">Nenhuma planta encontrada.</li>
          ) : (
            plantasFiltradas.map((planta, idx) => (
              <li key={planta.nome + idx} className="border border-gray-200 rounded-lg p-5 flex flex-col items-center bg-white relative transition hover:scale-[1.03]" tabIndex="0" aria-label={`Planta ${planta.nome}`}> 
                <div className="w-32 h-32 mb-3 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  <label className="sr-only">Imagem da planta {planta.nome}</label>
                  {planta.imagem ? (
                    <img src={planta.imagem} alt={planta.nome} className="object-cover w-full h-full" />
                  ) : (
                    <FaLeaf className="h-12 w-12 text-[#294D1C]" />
                  )}
                </div>
                <h2 className="text-xl font-semibold mb-1 text-[#294D1C] text-center">{planta.nome}</h2>
                <span className="text-gray-500 text-sm mb-1">{planta.descricao}</span>
                <span className="text-xs text-green-900 bg-green-100 rounded-full px-3 py-1 mb-2">{planta.cuidados}</span>
                <button onClick={() => handleAddPlanta(planta)} className="absolute top-3 left-3 bg-white border border-[#294D1C] text-[#294D1C] rounded-full p-2 hover:bg-gray-100 transition-colors" title="Adicionar ao Meu Jardim" aria-label={`Adicionar ${planta.nome} ao Meu Jardim`}>
                  <FaPlusCircle className="h-5 w-5" />
                </button>
              </li>
            ))
          )}
        </ul>
      </section>
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-5 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg relative" role="dialog" aria-modal="true">
            <button onClick={() => setModalOpen(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl">×</button>
            <h2 className="text-xl font-bold mb-4 text-[#294D1C]">Adicionar planta ao Meu Jardim</h2>
            <form className="flex flex-col gap-4">
              <label htmlFor="nome" className="text-sm text-gray-700 font-medium">Nome</label>
              <input id="nome" name="nome" value={form.nome} readOnly className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100" />
              <label htmlFor="descricao" className="text-sm text-gray-700 font-medium">Descrição</label>
              <textarea id="descricao" name="descricao" value={form.descricao} readOnly className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100" />
              <label htmlFor="cuidados" className="text-sm text-gray-700 font-medium">Rega/Cuidados</label>
              <input id="cuidados" name="cuidados" value={form.cuidados} readOnly className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-100" />
              <button type="button" onClick={() => setModalOpen(false)} className="mt-2 px-5 py-2 rounded-full font-medium bg-white border border-[#294D1C] text-[#294D1C] hover:bg-gray-100 transition-colors self-end flex items-center gap-2">
                <FaPlusCircle className="h-5 w-5" /> Adicionar
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default Enciclopedia;
