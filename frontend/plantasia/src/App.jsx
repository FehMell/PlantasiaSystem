import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import Nav from './components/Nav';
import Jardim from './pages/NovaPlanta';
import Login from './pages/Login';
import Registrar from './pages/Registrar';
import Enciclopedia from './pages/Enciclopedia';
import Lembretes from './pages/Lembretes';
import Estatisticas from './pages/Estatisticas';
import EstatisticasDashboard from './pages/EstatisticasDashboard';

function App() {
    return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nova-planta" element={<Jardim />} />
            <Route path="/enciclopedia" element={<Enciclopedia />} />
            <Route path="/lembretes" element={<Lembretes />} />
            <Route path="/estatisticas" element={<EstatisticasDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Registrar />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
  
}

export default App
