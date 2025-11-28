import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Home from './pages/Home';
import Nav from './components/Nav';
import NovaPlanta from './pages/NovaPlanta';
import Login from './pages/Login';
import Registrar from './pages/Registrar';

function App() {
    return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Nav />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nova-planta" element={<NovaPlanta />} />
            <Route path="/enciclopedia" element={<div className="p-6"><h1 className="text-2xl font-bold">Enciclopédia</h1><p>Descubra informações sobre diferentes tipos de plantas.</p></div>} />
            <Route path="/lembretes" element={<div className="p-6"><h1 className="text-2xl font-bold">Lembretes de Rega</h1><p>Gerencie seus lembretes de cuidados com as plantas.</p></div>} />
            <Route path="/estatisticas" element={<div className="p-6"><h1 className="text-2xl font-bold">Estatísticas</h1><p>Veja estatísticas do seu jardim.</p></div>} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrar" element={<Registrar />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
  
}

export default App
