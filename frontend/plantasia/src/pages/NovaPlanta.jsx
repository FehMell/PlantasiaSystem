import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaLeaf, FaChartBar, FaUser } from 'react-icons/fa';
import plantService from '../services/plantService';

function Jardim() {
  const [plantas, setPlantas] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ nickname: '', especie: '', local: '', descricao: '', imagem: '' });
  const [editingIdx, setEditingIdx] = useState(null);
  const [comodos, setComodos] = useState(["Sala de estar", "Quarto", "Cozinha"]);
  const [novoComodo, setNovoComodo] = useState("");
  const [modalComodo, setModalComodo] = useState(false);
  const [confirmDeleteIdx, setConfirmDeleteIdx] = useState(null);
  const [modalEstatisticas, setModalEstatisticas] = useState(false);
  const [filtroComodo, setFiltroComodo] = useState('');
  const [favoritos, setFavoritos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');

  // Carregar plantas do backend
  useEffect(() => {
    carregarPlantas();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem('plantasia_user_id');
    if (userId) {
      fetch(`http://localhost:8080/api/users/${userId}`)
        .then(res => res.json())
        .then(data => setUserName(data.nome || data.name || data.email || 'Usuário'));
    }
  }, []);

  async function carregarPlantas() {
    try {
      setLoading(true);
      const plantasData = await plantService.getAllPlants();
      // Mapear os campos do backend para o frontend
      const plantasFormatadas = plantasData.map(planta => ({
        id: planta.id,
        nickname: planta.nickname,
        especie: planta.searchName,
        local: "Sala de estar",
        descricao: "",
        imagem: planta.imagem || ""
      }));
      setPlantas(plantasFormatadas);
    } catch (error) {
      console.error('Erro ao carregar plantas:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function toggleFavorito(idx) {
    setFavoritos(favoritos.includes(idx)
      ? favoritos.filter(f => f !== idx)
      : [...favoritos, idx]);
  }

  async function handleDelete(idx) {
    setConfirmDeleteIdx(idx);
  }

  async function confirmDelete() {
    try {
      const plantaId = plantas[confirmDeleteIdx].id;
      await plantService.deletePlant(plantaId);
      setPlantas(plantas.filter((_, i) => i !== confirmDeleteIdx));
    } catch (error) {
      console.error('Erro ao excluir planta:', error);
    } finally {
      setConfirmDeleteIdx(null);
    }
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
    setLoading(true);

    try {
      if (editingIdx !== null) {
        // Atualizar planta existente
        const plantaId = plantas[editingIdx].id;
        const plantaAtualizada = await plantService.updatePlant(plantaId, form);
        
        const novasPlantas = [...plantas];
        novasPlantas[editingIdx] = {
          ...plantaAtualizada,
          nickname: plantaAtualizada.nickname,
          especie: plantaAtualizada.searchName,
          local: form.local,
          descricao: form.descricao,
          imagem: form.imagem
        };
        setPlantas(novasPlantas);
        setEditingIdx(null);
      } else {
        // Criar nova planta
        const novaPlanta = await plantService.createPlant(form);
        setPlantas([...plantas, {
          id: novaPlanta.id,
          nickname: novaPlanta.nickname,
          especie: novaPlanta.searchName,
          local: novaPlanta.local || form.local,
          descricao: novaPlanta.descricao || form.descricao,
          imagem: novaPlanta.imagem || novaPlanta.imageUrl || form.imagem
        }]);
      }
      
      setForm({ nickname: '', especie: '', local: '', descricao: '', imagem: '' });
      setModalOpen(false);
    } catch (error) {
      console.error('Erro ao salvar planta:', error);
    } finally {
      setLoading(false);
    }
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
      <div className="flex justify-end items-center mb-6 gap-4">
        <span className="flex items-center gap-2 text-[#294D1C] font-medium bg-gray-100 px-4 py-2 rounded-full">
          <FaUser className="h-4 w-4" />
          {userName}
        </span>
        <button
          onClick={() => {
            localStorage.removeItem('plantasia_user_id');
            localStorage.removeItem('token');
            window.location.href = '/';
          }}
          className="px-5 py-2 rounded-full font-medium bg-red-600 text-white hover:bg-red-700 transition-colors"
        >
          Sair
        </button>
      </div>

      <section className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#294D1C]">Jardim</h1>
        <div className="flex gap-4 items-center">
          <select 
            value={filtroComodo} 
            onChange={e => setFiltroComodo(e.target.value)} 
            className="border border-gray-300 rounded-full px-4 py-2 text-[#294D1C] font-medium"
          >
            <option value="">Todos os cômodos</option>
            {comodos.map((c, i) => (
              <option key={c + i} value={c}>{c}</option>
            ))}
          </select>
          <button 
            onClick={() => {
              setForm({ nickname: '', especie: '', local: '', descricao: '', imagem: '' });
              setModalOpen(true);
              setEditingIdx(null);
            }} 
            className="flex items-center gap-2 px-5 py-2 rounded-full font-medium bg-[#294D1C] text-white hover:bg-[#1e3714] transition-colors" 
            aria-label="Adicionar Planta"
            disabled={loading}
          >
            <FaPlusCircle className="h-5 w-5" /> 
            {loading ? 'Carregando...' : 'Adicionar Planta'}
          </button>
        </div>
      </section>

      {loading && plantas.length === 0 && (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#294D1C] mx-auto"></div>
          <p className="mt-4 text-gray-600">Carregando plantas...</p>
        </div>
      )}

      <section>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {plantas.filter(p => !filtroComodo || p.local === filtroComodo).length === 0 ? (
            <li className="col-span-2 text-center text-gray-400 py-10">
              {plantas.length === 0 ? 'Nenhuma planta cadastrada.' : 'Nenhuma planta neste cômodo.'}
            </li>
          ) : (
            plantas
              .filter(p => !filtroComodo || p.local === filtroComodo)
              .map((planta, idx) => (
              <li key={planta.id} className="border border-gray-200 rounded-lg p-5 flex flex-col items-center bg-white relative hover:shadow-md transition-shadow" tabIndex="0" aria-label={`Planta ${planta.nickname}`}> 
                <div className="w-32 h-32 mb-3 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  {planta.imagem ? (
                    <img src={planta.imagem} alt={planta.nickname} className="object-cover w-full h-full" />
                  ) : (
                    <FaLeaf className="h-12 w-12 text-[#294D1C]" aria-hidden="true" />
                  )}
                </div>
                <h2 className="text-xl font-semibold mb-1 text-center">{planta.nickname}</h2>
                <span className="text-gray-500 text-sm mb-1">{planta.especie}</span>
                <span className="text-gray-400 text-xs mb-1 bg-gray-100 px-2 py-1 rounded-full">{planta.local}</span>
                {planta.descricao && (
                  <p className="text-gray-500 text-sm mb-2 text-center">{planta.descricao}</p>
                )}
                <div className="absolute top-3 right-3 flex gap-2">
                  <button 
                    onClick={() => toggleFavorito(idx)} 
                    className={`text-yellow-500 bg-gray-100 rounded-full p-2 hover:bg-yellow-100 transition-colors ${favoritos.includes(idx) ? 'bg-yellow-100' : ''}`} 
                    aria-label={favoritos.includes(idx) ? `Desfavoritar planta ${planta.nickname}` : `Favoritar planta ${planta.nickname}`}
                  >
                    {favoritos.includes(idx) ? '★' : '☆'}
                  </button>
                </div>
                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={() => handleEdit(idx)} 
                    className="text-[#294D1C] bg-gray-100 rounded-full px-3 py-2 text-xs font-medium hover:bg-gray-200 transition-colors" 
                    aria-label={`Editar planta ${planta.nickname}`}
                    disabled={loading}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(idx)} 
                    className="text-red-500 bg-gray-100 rounded-full px-3 py-2 text-xs font-medium hover:bg-gray-200 transition-colors" 
                    aria-label={`Excluir planta ${planta.nickname}`}
                    disabled={loading}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-lg relative" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button 
              onClick={() => { 
                setModalOpen(false); 
                setEditingIdx(null); 
                setForm({ nickname: '', especie: '', local: '', descricao: '', imagem: '' });
              }} 
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-xl"
              disabled={loading}
            >
              ×
            </button>
            <h2 id="modal-title" className="text-xl font-bold mb-4 text-[#294D1C]">
              {editingIdx !== null ? 'Editar Planta' : 'Adicionar Planta'}
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="nickname" className="text-sm text-gray-700 font-medium">Apelido da planta *</label>
                <input 
                  id="nickname" 
                  name="nickname" 
                  value={form.nickname} 
                  onChange={handleChange} 
                  required 
                  placeholder="Ex: Minha Monstera" 
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full mt-1" 
                  disabled={loading}
                />
              </div>
              
              <div>
                <label htmlFor="local" className="text-sm text-gray-700 font-medium">Cômodo *</label>
                <div className="flex gap-2 items-center mt-1">
                  <select 
                    id="local" 
                    name="local" 
                    value={form.local} 
                    onChange={handleChange} 
                    required 
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    disabled={loading}
                  >
                    <option value="" disabled>Selecione o cômodo</option>
                    {comodos.map((c, i) => (
                      <option key={c + i} value={c}>{c}</option>
                    ))}
                  </select>
                  <button 
                    type="button" 
                    onClick={() => setModalComodo(true)} 
                    className="px-3 py-2 rounded-full bg-gray-100 text-[#294D1C] hover:bg-gray-200 transition-colors" 
                    title="Adicionar cômodo"
                    disabled={loading}
                  >
                    <FaPlusCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="especie" className="text-sm text-gray-700 font-medium">Espécie *</label>
                <input 
                  id="especie" 
                  name="especie" 
                  value={form.especie} 
                  onChange={handleChange} 
                  required 
                  placeholder="Ex: Monstera Deliciosa" 
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full mt-1" 
                  disabled={loading}
                />
              </div>
              
              <div>
                <label htmlFor="descricao" className="text-sm text-gray-700 font-medium">Descrição</label>
                <textarea 
                  id="descricao" 
                  name="descricao" 
                  value={form.descricao} 
                  onChange={handleChange} 
                  placeholder="Descreva sua planta..." 
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full mt-1 resize-none" 
                  rows="3"
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="imagem" className="text-sm text-gray-700 font-medium">URL da Imagem (opcional)</label>
                <input 
                  id="imagem" 
                  name="imagem" 
                  value={form.imagem} 
                  onChange={handleChange} 
                  placeholder="https://exemplo.com/imagem.jpg" 
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full mt-1" 
                  disabled={loading}
                />
              </div>
              
              <button 
                type="submit" 
                className="mt-2 px-5 py-2 rounded-full font-medium bg-[#294D1C] text-white hover:bg-[#1e3714] transition-colors self-end disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar'}
              </button>
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
              <input 
                value={novoComodo} 
                onChange={e => setNovoComodo(e.target.value)} 
                required 
                placeholder="Nome do cômodo" 
                className="border border-gray-300 rounded-lg px-4 py-2" 
              />
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
            <p className="mb-6 text-gray-700">Deseja realmente excluir <span className="font-semibold">{plantas[confirmDeleteIdx]?.nickname}</span>?</p>
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
              <p className="text-green-700 font-semibold mb-2">Seu jardim está crescendo!</p>
              <p className="text-gray-600">Você tem <span className="font-bold text-[#294D1C]">{plantas.length}</span> plantas em <span className="font-bold text-[#294D1C]">{comodos.length}</span> cômodos.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#D9ED92] rounded-xl p-4 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2 text-[#294D1C]">Plantas por cômodo</h3>
                <ul className="text-left w-full">
                  {comodos.map((c, i) => (
                    <li key={c + i} className="mb-1 text-[#294D1C] flex justify-between">
                      <span>{c}:</span>
                      <span className="font-bold">{plantas.filter(p => p.local === c).length}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#A7C957] rounded-xl p-4 flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2 text-[#294D1C]">Suas Favoritas</h3>
                <ul className="text-left w-full">
                  <li className="mb-1 text-[#294D1C]">Favoritadas: <span className="font-bold">{favoritos.length}</span></li>
                  <li className="mb-1 text-[#294D1C]">Total: <span className="font-bold">{plantas.length}</span></li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <p className="text-green-700 italic">Continue cuidando das suas plantas!</p>
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
      <div className="mt-4 flex justify-center">
        <Link to="/" className="text-[#294D1C] font-medium hover:underline">Voltar para Home</Link>
      </div>
    </main>
  );
}

export default Jardim;