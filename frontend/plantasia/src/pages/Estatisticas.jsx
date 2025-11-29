import { FaChartBar, FaLeaf, FaTint, FaPlusCircle } from 'react-icons/fa';

const estatisticas = [
  { label: 'Total de plantas', valor: 12, icon: <FaLeaf className="h-7 w-7 text-[#294D1C]" /> },
  { label: 'Plantas regadas este mês', valor: 8, icon: <FaTint className="h-7 w-7 text-blue-400" /> },
  { label: 'Novas plantas cadastradas', valor: 3, icon: <FaPlusCircle className="h-7 w-7 text-green-400" /> },
];

function Estatisticas() {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <section className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-[#294D1C] flex items-center justify-center gap-2">
          <FaChartBar className="h-7 w-7" /> Estatísticas do Jardim
        </h1>
        <p className="text-gray-600 mb-4">Veja um resumo visual das suas plantas e atividades recentes.</p>
      </section>
      <section>
        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {estatisticas.map((item, idx) => (
            <li key={item.label + idx} className="border border-gray-200 rounded-lg p-6 flex flex-col items-center bg-white">
              {item.icon}
              <span className="text-2xl font-bold text-[#294D1C] mt-2 mb-1">{item.valor}</span>
              <span className="text-gray-600 text-sm text-center">{item.label}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Estatisticas;
