import { FaTint, FaCalendarAlt, FaLeaf } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { getPlantas } from './apiPlantas';

function Lembretes() {
  const [plantas, setPlantas] = useState([]);
  const [todasPlantas, setTodasPlantas] = useState([]);
  const [plantaSelecionada, setPlantaSelecionada] = useState("");
  const [dataRega, setDataRega] = useState("");
  const [regadas, setRegadas] = useState({});

  useEffect(() => {
    async function fetchPlantas() {
      const lista = await getPlantas();
      setTodasPlantas(lista);
    }
    fetchPlantas();
  }, []);

  function adicionarLembrete(e) {
    e.preventDefault();
    if (!plantaSelecionada || !dataRega) return;
    setPlantas([...plantas, { nome: plantaSelecionada, proximaRega: dataRega, imagem: todasPlantas.find(p => p.nome === plantaSelecionada)?.imagem }]);
    setPlantaSelecionada("");
    setDataRega("");
  }

  function marcarRegada(idx) {
    const hoje = new Date().toISOString().slice(0, 10);
    setRegadas({ ...regadas, [idx]: hoje });
    const novasPlantas = [...plantas];
    const prox = new Date();
    prox.setDate(prox.getDate() + 7);
    novasPlantas[idx].proximaRega = prox.toISOString().slice(0, 10);
    setPlantas(novasPlantas);
  }

  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <section className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-[#294D1C] flex items-center justify-center gap-2">
          <FaTint className="h-7 w-7" /> Lembretes de Rega
        </h1>
        <p className="text-gray-600 mb-4">Gerencie os lembretes de rega das suas plantas. Minimalista, responsivo e fácil de usar.</p>
      </section>
      <section className="mb-10">
        <form className="flex flex-col sm:flex-row gap-4 items-center justify-center" onSubmit={adicionarLembrete}>
          <div className="relative w-full sm:w-auto">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaLeaf className="h-4 w-4" />
            </span>
            <select
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus:outline-none focus:border-[#294D1C] transition"
              value={plantaSelecionada}
              onChange={e => setPlantaSelecionada(e.target.value)}
              required
            >
              <option value="">Selecione a planta</option>
              {todasPlantas.map(p => (
                <option key={p.id} value={p.nome}>{p.nome}</option>
              ))}
            </select>
          </div>
          <div className="relative w-full sm:w-auto">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaCalendarAlt className="h-4 w-4" />
            </span>
            <input
              type="date"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full focus:outline-none focus:border-[#294D1C] transition"
              value={dataRega}
              onChange={e => setDataRega(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="px-5 py-2 rounded-full bg-[#294D1C] text-white font-medium hover:bg-[#1e3714] transition-colors">
            Adicionar
          </button>
        </form>
      </section>
      <section>
        <ul className="space-y-4">
          {plantas.length === 0 ? (
            <li className="text-center text-gray-400 py-8">Nenhum lembrete cadastrado.</li>
          ) : (
            plantas.map((planta, idx) => (
              <li key={planta.nome + idx} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    {planta.imagem ? (
                      <img src={planta.imagem} alt={planta.nome} className="object-cover w-full h-full" />
                    ) : (
                      <FaLeaf className="h-6 w-6 text-[#294D1C]" />
                    )}
                  </div>
                  <span className="font-semibold text-gray-800">{planta.nome}</span>
                </div>
                <div className="flex flex-col items-end gap-2">
                  {regadas[idx] ? (
                    <span className="text-green-700 text-xs">Regada em: {regadas[idx]}</span>
                  ) : null}
                  <span className="text-gray-600 text-xs">Próxima rega: {planta.proximaRega}</span>
                  <button onClick={() => marcarRegada(idx)} className="bg-transparent p-0 border-none outline-none" title="Já foi regada" aria-label="Já foi regada">
                    <FaTint className="h-6 w-6 text-[#294D1C] hover:text-green-700 transition-colors" />
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </main>
  );
}

export default Lembretes;
