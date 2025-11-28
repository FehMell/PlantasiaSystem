import { FaHome, FaPlusCircle, FaBook, FaTint, FaChartBar, FaBars, FaTimes, FaUser, FaUserPlus } from 'react-icons/fa';  
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function Nav() {
    const location = useLocation();
    const current = location.pathname;
    const [isOpen, setIsOpen] = useState(false);
    const isLoggedIn = false;
    const links = [
      { name: 'Home', href: '/', icon: <FaHome className="h-5 w-5" /> },
      isLoggedIn && { name: 'Nova Planta', href: '/nova-planta', icon: <FaPlusCircle className="h-5 w-5" /> },
      { name: 'Enciclopédia', href: '/enciclopedia', icon: <FaBook className="h-5 w-5" /> },
      isLoggedIn && { name: 'Lembretes de Rega', href: '/lembretes', icon: <FaTint className="h-5 w-5" /> },
      isLoggedIn && { name: 'Estatísticas', href: '/estatisticas', icon: <FaChartBar className="h-5 w-5" /> },
    ].filter(Boolean);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <nav className="border-black border-b p-4 text-black bg-white relative z-50">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={toggleMenu}
                            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
                        >
                            {isOpen ? (
                                <FaTimes className="h-6 w-6" />
                            ) : (
                                <FaBars className="h-6 w-6" />
                            )}
                        </button>
                        <img src="/svg-logo.png" alt="Plantasia" className="h-14" />
                    </div>
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="flex items-center gap-2 text-black font-medium hover:underline">
                            <FaUser className="h-4 w-4" />
                            Login
                        </Link>
                        <Link to="/registrar" className="flex items-center gap-2 px-5 py-2 rounded-full font-medium bg-[#294D1C] text-white hover:bg-[#1e3714] transition-colors duration-200">
                            <FaUserPlus className="h-4 w-4" />
                            Registrar
                        </Link>
                    </div>
                </div>
            </nav>



            <aside className={`
                fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out border-r border-gray-200
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-gray-800">Menu</h2>
                        <button 
                            onClick={toggleMenu}
                            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                            aria-label="Fechar menu"
                        >
                            <FaTimes className="h-5 w-5" />
                        </button>
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
                </div>
            </aside>
        </>
    );
}

export default Nav;