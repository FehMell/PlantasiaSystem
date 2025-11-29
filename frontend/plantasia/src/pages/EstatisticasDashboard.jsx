import { FaChartBar } from 'react-icons/fa';
import { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
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

function EstatisticasDashboard() { 
  const [dados, setDados] = useState({
    porComodo: {
      labels: ['Sala de estar', 'Quarto', 'Cozinha'],
      values: [4, 2, 1]
    },
    regasMes: {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      values: [3, 2, 4, 1]
    }
  });

  return (
    <main className="max-w-3xl mx-auto py-10 px-4">
      <section className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2 text-[#294D1C] flex items-center justify-center gap-2">
          <FaChartBar className="h-7 w-7" /> Estatísticas do Jardim
        </h1>
        <p className="text-gray-600 mb-4">Acompanhe visualmente o seu jardim: distribuição por cômodo e regas do mês.</p>
      </section>
      <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4 text-[#294D1C]">Plantas por cômodo</h2>
          <Pie
            data={{
              labels: dados.porComodo.labels,
              datasets: [{
                data: dados.porComodo.values,
                backgroundColor: ['#294D1C', '#A7C957', '#D9ED92'],
                borderWidth: 1
              }]
            }}
            options={{ plugins: { legend: { position: 'bottom' } } }}
          />
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col items-center">
          <h2 className="text-lg font-semibold mb-4 text-[#294D1C]">Regas no mês</h2>
          <Bar
            data={{
              labels: dados.regasMes.labels,
              datasets: [{
                label: 'Regas',
                data: dados.regasMes.values,
                backgroundColor: '#294D1C'
              }]
            }}
            options={{
              plugins: { legend: { display: false } },
              scales: { y: { beginAtZero: true } }
            }}
          />
        </div>
      </section>
    </main>
  );
}

export default EstatisticasDashboard;
