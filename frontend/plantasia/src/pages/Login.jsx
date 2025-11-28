import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

function Login() {
    return (
        <div className="min-h-screen bg-linear-to-br from-white to-gray-50 flex items-start">
            <div className="w-full max-w-md mx-auto px-4 pt-16 pb-16">
                <h1 className="text-3xl font-light text-gray-900 leading-tight tracking-tight mb-6 text-center">
                    Login
                </h1>
                <form className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col gap-6 shadow-none">
                    <fieldset className="border-0 p-0 m-0">
                        <legend className="sr-only">Login</legend>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                            <div className="flex items-center border border-gray-200 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-[#294D1C]">
                                <FaEnvelope className="text-gray-400 mr-2" />
                                <input id="email" name="email" type="email" className="w-full bg-transparent outline-none" placeholder="Seu email" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="senha" className="block text-gray-700 font-medium mb-2">Senha</label>
                            <div className="flex items-center border border-gray-200 rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-[#294D1C]">
                                <FaLock className="text-gray-400 mr-2" />
                                <input id="senha" name="senha" type="password" className="w-full bg-transparent outline-none" placeholder="Sua senha" />
                            </div>
                        </div>
                    </fieldset>
                    <button type="submit" className="mt-4 px-8 py-3 rounded-full font-medium bg-[#294D1C] text-white hover:bg-[#1e3714] transition-colors duration-200 self-end">
                        Entrar
                    </button>
                </form>
                <div className="mt-8 text-sm text-gray-400 flex items-center gap-2 justify-center">
                    <div className="w-12 h-px bg-gray-300"></div>
                    <span>Plantasia</span>
                    <div className="w-12 h-px bg-gray-300"></div>
                </div>
                <div className="mt-8 flex justify-center">
                    <span className="text-gray-500 mr-2">Não tem conta?</span>
                    <Link to="/registrar" className="text-[#294D1C] font-medium hover:underline">Registrar</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
