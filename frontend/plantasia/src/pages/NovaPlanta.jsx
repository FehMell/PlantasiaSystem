import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaLeaf, FaChartBar } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

function Jardim() {
  const [plantas, setPlantas] = useState([
    {
      nome: "Monstera Deliciosa",
      especie: "Monstera",
      local: "Sala de estar",
      descricao: "Planta tropical famosa por suas folhas recortadas.",
      imagem: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
    },
    {
      nome: "Ficus Lyrata",
      especie: "Figueira-lira",
      local: "Quarto",
      descricao: "Ótima para ambientes internos.",
      imagem: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ nome: '', especie: '', local: '', descricao: '', imagem: '' });
  const [editingIdx, setEditingIdx] = useState(null);
  const [comodos, setComodos] = useState(["Sala de estar", "Quarto", "Cozinha"]);
  const [novoComodo, setNovoComodo] = useState("");
  const [modalComodo, setModalComodo] = useState(false);
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState(null);
  const [modalEstatisticas, setModalEstatisticas] = useState(false);
  const [filtroComodo, setFiltroComodo] = useState('');
  const [favoritos, setFavoritos] = useState([]);
  const [notificacoes, setNotificacoes] = useState([]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function toggleFavorito(idx) {
    setFavoritos(favoritos.includes(idx)
      ? favoritos.filter(f => f !== idx)
      : [...favoritos, idx]);
  }

  async function adicionarNotificacao(planta) {
    setNotificacoes([...notificacoes, `Hora de regar: ${planta.nome}`]);
  }

  async function handleDelete(idx) {
    setConfirmDeleteIdx(idx);
  }

  async function confirmDelete() {
    setPlantas(plantas.filter((_, i) => i !== confirmDeleteIdx));
    setConfirmDeleteIdx(null);
  }

  function cancelDelete() {
    setConfirmDeleteIdx(null);
  }

  async function handleEdit(idx) {
    setForm(plantas[idx]);
    setModalOpen(true);
    setEditingIdx(idx);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (editingIdx !== null) {
      const novasPlantas = [...plantas];
      novasPlantas[editingIdx] = form;
      setPlantas(novasPlantas);
      setEditingIdx(null);
    } else {
      setPlantas([...plantas, form]);
    }
    setForm({ nome: '', especie: '', local: '', descricao: '', imagem: '' });
    setModalOpen(false);
  }

  function handleAddComodo(e) {
    e.preventDefault();
    if (novoComodo && !comodos.includes(novoComodo)) {
      setComodos([...comodos, novoComodo]);
      setNovoComodo("");
      setModalComodo(false);
    }
  }

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <section className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#294D1C]">Jardim</h1>
        <div className="flex gap-4 items-center">
          <select value={filtroComodo} onChange={e => setFiltroComodo(e.target.value)} className="border border-gray-300 rounded-full px-4 py-2 text-[#294D1C] font-medium">
            <option value="">Todos os cômodos</option>
            {comodos.map((c, i) => (
              <option key={c + i} value={c}>{c}</option>
            ))}
          </select>
          <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 px-5 py-2 rounded-full font-medium bg-[#294D1C] text-white hover:bg-[#1e3714] transition-colors" aria-label="Adicionar Planta">
            <FaPlusCircle className="h-5 w-5" /> Adicionar Planta
          </button>
        </div>
      </section>
      {notificacoes.length > 0 && (
        <div className="mb-4" aria-live="polite">
          {notificacoes.map((n, i) => (
            <div key={i} className="bg-green-100 border border-green-300 text-green-800 rounded-lg px-4 py-2 mb-2 flex items-center" role="alert">
              <span aria-label="Notificação de rega" className="mr-2">💧</span>{n}
            </div>
          ))}
        </div>
      )}
      <section>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {plantas.filter(p => !filtroComodo || p.local === filtroComodo).length === 0 ? (
            <li className="col-span-2 text-center text-gray-400 py-10">Nenhuma planta cadastrada.</li>
          ) : (
            plantas.filter(p => !filtroComodo || p.local === filtroComodo).map((planta, idx) => (
              <li key={planta.nome + idx} className="border border-gray-200 rounded-lg p-5 flex flex-col items-center bg-white relative" tabIndex="0" aria-label={`Planta ${planta.nome}`}> 
                <div className="w-32 h-32 mb-3 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  {planta.imagem ? (
                    <img src={planta.imagem} alt={planta.nome} className="object-cover w-full h-full" />
                  ) : (
                    <FaLeaf className="h-12 w-12 text-[#294D1C]" aria-hidden="true" />
                  )}
                </div>
                <h2 className="text-xl font-semibold mb-1">{planta.nome}</h2>
                <span className="text-gray-500 text-sm mb-1">{planta.especie}</span>
                <span className="text-gray-400 text-xs mb-1">{planta.local}</span>
                <p className="text-gray-500 text-sm mb-2">{planta.descricao}</p>
                <div className="absolute top-3 right-3 flex gap-2">
                  <button onClick={() => toggleFavorito(idx)} className={`text-yellow-500 bg-gray-100 rounded-full px-2 py-1 text-xs font-medium hover:bg-yellow-100 ${favoritos.includes(idx) ? 'font-bold' : ''}`} aria-label={favoritos.includes(idx) ? `Desfavoritar planta ${planta.nome}` : `Favoritar planta ${planta.nome}`}>{favoritos.includes(idx) ? '★' : '☆'}</button>
                  <button onClick={() => adicionarNotificacao(planta)} className="text-blue-500 bg-gray-100 rounded-full px-2 py-1 text-xs font-medium hover:bg-blue-100" aria-label={`Notificar rega para ${planta.nome}`}>💧</button>
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => handleEdit(idx)} className="text-[#294D1C] bg-gray-100 rounded-full px-2 py-1 text-xs font-medium hover:bg-gray-200" aria-label={`Editar planta ${planta.nome}`}>Editar</button>
                  <button onClick={() => handleDelete(idx)} className="text-red-500 bg-gray-100 rounded-full px-2 py-1 text-xs font-medium hover:bg-gray-200" aria-label={`Excluir planta ${planta.nome}`}>Excluir</button>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg relative" role="dialog" aria-modal="true">
            <button onClick={() => { setModalOpen(false); setEditingIdx(null); }} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl">×</button>
            <h2 className="text-xl font-bold mb-4 text-[#294D1C]">{editingIdx !== null ? 'Editar Planta' : 'Adicionar Planta'}</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label htmlFor="nome" className="text-sm text-gray-700 font-medium">Apelido da planta</label>
              <input id="nome" name="nome" value={form.nome} onChange={handleChange} required placeholder="Apelido da planta" className="border border-gray-300 rounded-lg px-4 py-2" />
              <label htmlFor="local" className="text-sm text-gray-700 font-medium">Cômodo</label>
              <div className="flex gap-2 items-center">
                <select id="local" name="local" value={form.local} onChange={handleChange} required className="border border-gray-300 rounded-lg px-4 py-2 w-full">
                  <option value="" disabled>Selecione o cômodo</option>
                  {comodos.map((c, i) => (
                    <option key={c + i} value={c}>{c}</option>
                  ))}
                </select>
                <button type="button" onClick={() => setModalComodo(true)} className="px-3 py-2 rounded-full bg-gray-100 text-[#294D1C] hover:bg-gray-200" title="Adicionar cômodo">
                  <FaPlusCircle className="h-5 w-5" />
                </button>
              </div>
              {editingIdx === null && (
                <>
                  <label htmlFor="especie" className="text-sm text-gray-700 font-medium">Espécie</label>
                  <input id="especie" name="especie" value={form.especie} onChange={handleChange} required placeholder="Espécie" className="border border-gray-300 rounded-lg px-4 py-2" />
                  <label htmlFor="descricao" className="text-sm text-gray-700 font-medium">Descrição</label>
                  <textarea id="descricao" name="descricao" value={form.descricao} onChange={handleChange} placeholder="Descrição" className="border border-gray-300 rounded-lg px-4 py-2" />
                </>
              )}
              <button type="submit" className="mt-2 px-5 py-2 rounded-full font-medium bg-[#294D1C] text-white hover:bg-[#1e3714] transition-colors self-end">Salvar</button>
            </form>
          </div>
        </div>
      )}
      {modalComodo && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-sm shadow-lg relative text-center" role="dialog" aria-modal="true">
            <button onClick={() => setModalComodo(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl">×</button>
            <h2 className="text-xl font-bold mb-4 text-[#294D1C]">Adicionar novo cômodo</h2>
            <form onSubmit={handleAddComodo} className="flex flex-col gap-4">
              <input value={novoComodo} onChange={e => setNovoComodo(e.target.value)} required placeholder="Nome do cômodo" className="border border-gray-300 rounded-lg px-4 py-2" />
              <button type="submit" className="px-5 py-2 rounded-full font-medium bg-[#294D1C] text-white hover:bg-[#1e3714] transition-colors">Adicionar</button>
            </form>
          </div>
        </div>
      )}
      {confirmDeleteIdx !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-sm shadow-lg relative text-center" role="dialog" aria-modal="true">
            <button onClick={cancelDelete} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl">×</button>
            <h2 className="text-xl font-bold mb-4 text-red-700">Confirmar exclusão</h2>
            <p className="mb-6 text-gray-700">Deseja realmente excluir <span className="font-semibold">{plantas[confirmDeleteIdx]?.nome}</span>?</p>
            <div className="flex gap-4 justify-center">
              <button onClick={confirmDelete} className="px-5 py-2 rounded-full font-medium bg-red-600 text-white hover:bg-red-700 transition-colors">Excluir</button>
              <button onClick={cancelDelete} className="px-5 py-2 rounded-full font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">Cancelar</button>
            </div>
          </div>
        </div>
      )}
      {modalEstatisticas && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-lg shadow-lg relative text-center" role="dialog" aria-modal="true">
            <button onClick={() => setModalEstatisticas(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl">×</button>
            <h2 className="text-2xl font-bold mb-4 text-[#294D1C] flex items-center justify-center gap-2">
              <FaChartBar className="h-6 w-6" /> Estatísticas do seu Jardim
            </h2>
            <div className="mb-6">
              <p className="text-green-700 font-semibold mb-2">🌱 Seu jardim está crescendo!</p>
              <p className="text-gray-600">Você tem <span className="font-bold text-[#294D1C]">{plantas.length}</span> plantas em <span className="font-bold text-[#294D1C]">{comodos.length}</span> cômodos.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#D9ED92] rounded-xl p-4 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2 text-[#294D1C]">Plantas por cômodo</h3>
                <ul className="text-left w-full">
                  {comodos.map((c, i) => (
                    <li key={c + i} className="mb-1 text-[#294D1C]">{c}: <span className="font-bold">{plantas.filter(p => p.local === c).length}</span></li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#A7C957] rounded-xl p-4 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2 text-[#294D1C]">Regas do mês</h3>
                <ul className="text-left w-full">
                  <li className="mb-1 text-[#294D1C]">Semana 1: <span className="font-bold">3</span></li>
                  <li className="mb-1 text-[#294D1C]">Semana 2: <span className="font-bold">2</span></li>
                  <li className="mb-1 text-[#294D1C]">Semana 3: <span className="font-bold">4</span></li>
                  <li className="mb-1 text-[#294D1C]">Semana 4: <span className="font-bold">1</span></li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-green-700 italic">Continue cuidando das suas plantas! 🌿</p>
            </div>
          </div>
        </div>
      )}
      <div className="mb-8 text-right">
        <button onClick={() => setModalEstatisticas(true)} className="text-[#294D1C] underline underline-offset-4 font-semibold hover:text-green-700 transition-colors">
          Ver estatísticas
        </button>
      </div>
      <div className="mt-8 text-sm text-gray-400 flex items-center gap-2 justify-center">
        <div className="w-12 h-px bg-gray-300"></div>
        <span>Plantasia</span>
        <div className="w-12 h-px bg-gray-300"></div>
      </div>
      <div className="mt-8 flex justify-center">
        <Link to="/" className="text-[#294D1C] font-medium hover:underline">Voltar para Home</Link>
      </div>
    </main>
  );
}

export default Jardim;
