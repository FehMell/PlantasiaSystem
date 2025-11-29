import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import Jardim from './pages/NovaPlanta';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import EstatisticasDashboard from './pages/EstatisticasDashboard';

function App() {
    return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nova-planta" element={<Jardim />} />
            <Route path="/estatisticas" element={<EstatisticasDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Registrar />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
