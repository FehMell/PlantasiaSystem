import { useState } from 'react';
import Login from './Login';
import Registrar from './Registrar';

function Home() {
  const [showLogin, setShowLogin] = useState(true);
  const isLogged = Boolean(localStorage.getItem('plantasia_user_id'));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-4 flex flex-col items-center justify-center">
        <img src="/svg-logo.png" alt="Plantasia" className="h-14 mb-4 mx-auto" />
        <div className="flex justify-center mb-4 gap-4 w-full">
          <button
            className={`px-5 py-2 rounded-full font-medium transition-colors w-1/2 ${showLogin ? 'bg-[#294D1C] text-white' : 'bg-gray-200 text-[#294D1C]'}`}
            onClick={() => setShowLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-5 py-2 rounded-full font-medium transition-colors w-1/2 ${!showLogin ? 'bg-[#294D1C] text-white' : 'bg-gray-200 text-[#294D1C]'}`}
            onClick={() => setShowLogin(false)}
          >
            Cadastro
          </button>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-none w-full" style={{minHeight: '320px'}}>
          {showLogin ? <Login /> : <Registrar />}
        </div>
      </div>
    </div>
  );
}

export default Home;