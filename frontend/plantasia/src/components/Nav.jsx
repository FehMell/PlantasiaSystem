import { FaHome, FaLeaf, FaBars, FaUser, FaUserPlus } from 'react-icons/fa';  
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Nav() {
    const location = useLocation();
    const current = location.pathname;
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [userEmail, setUserEmail] = useState(null);
    useEffect(() => {
      const userId = localStorage.getItem('plantasia_user_id');
      if (userId) {
        fetch(`http://localhost:8080/api/users/${userId}`)
          .then(res => res.json())
          .then(data => setUserEmail(data.email))
          .catch(() => setUserEmail(null));
      }
    }, [current]);

    function handleLogout() {
      localStorage.removeItem('plantasia_user_id');
      localStorage.removeItem('token');
      setUserEmail(null);
      navigate('/login');
    }
    const links = [
      { name: 'Home', href: '/', icon: <FaHome className="h-5 w-5" /> },
      { name: 'Meu Jardim', href: '/nova-planta', icon: <FaLeaf className="h-5 w-5" /> },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <nav className="p-4 text-black relative z-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={toggleMenu}
                            className="p-2 rounded-md transition-colors"
                            aria-label="Abrir menu"
                        >
                            <FaBars className="h-6 w-6 text-[#294D1C]" />
                        </button>
                        <img src="/svg-logo.png" alt="Plantasia" className="h-14" />
                    </div>
                    <div className="flex items-center gap-8">
                        {userEmail ? (
                          <>
                            <button onClick={handleLogout} className="flex items-center gap-2 text-red-600 font-medium hover:underline">
                              Sair
                            </button>
                            <span className="flex items-center gap-2 text-black font-medium">
                              <FaUser className="h-4 w-4" />
                              {userEmail}
                            </span>
                          </>
                        ) : (
                          <>
                            <Link to="/login" className="flex items-center gap-2 text-black font-medium hover:underline">
                                <FaUser className="h-4 w-4" />
                                Login
                            </Link>
                            <Link to="/registrar" className="flex items-center gap-2 text-black font-medium hover:underline">
                                <FaUserPlus className="h-4 w-4" />
                                Registrar
                            </Link>
                          </>
                        )}
                    </div>
                </div>
            </nav>



            <aside className={`
                fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out border-r border-gray-200
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6 pt-12 flex flex-col h-full"> 
                    <div className="flex items-center justify-end mb-8">
                      
                    </div>

                    <ul className="space-y-2">
                        {links.map(link => {
                            const active = current === link.href;
                            const baseClass = "flex items-center gap-4 p-3 rounded-lg transition-colors hover:bg-gray-100";
                            const activeClass = active ? "bg-green-100 text-green-700 font-semibold" : "text-gray-700";
                            
                            return (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        className={`${baseClass} ${activeClass}`}
                                        onClick={toggleMenu}
                                        aria-current={active ? "page" : undefined}
                                    >
                                        {link.icon}
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="mt-auto text-center text-sm text-green-700 font-medium pb-2">
                        feito com <span role="img" aria-label="coração verde">💚</span> por liv, pedro e mell <span role="img" aria-label="broto">🌱</span>
                       { // :D
                        }
                    </div>
                </div>
            </aside>
        </>
    );
}

export default Nav;