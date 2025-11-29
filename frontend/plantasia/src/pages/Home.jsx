import { Link } from 'react-router-dom';

function Home(){
    return(
        <>
        <div className=" flex items-start bg-linear-to-br from-white to-gray-50">
            <div className="w-full max-w-7xl mx-auto px-4 pt-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

                    <div className="space-y-8 relative flex flex-col lg:items-start text-left">
                        <div className="space-y-4">
                            <h1 className="pt-20 text-4xl lg:text-5xl font-light text-gray-900 leading-tight tracking-tight">
                                Cuide das suas plantas com 
                                <span style={{color: '#294D1C'}} className="font-medium"> inteligência</span>
                            </h1>
                            <p className="text-xl text-gray-500 leading-relaxed max-w-md">
                                Gerencie e monitore suas plantas de forma simples e elegante.
                            </p>
                        </div>
                        
                        <Link 
                            to="/registrar"
                            className="inline-flex items-center px-8 py-4 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                            style={{backgroundColor: '#294D1C'}}
                        >
                            Registre-se
                            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <div className="mt-1">
                          <Link to="/login" className="text-sm text-gray-600 underline underline-offset-4 hover:text-green-700">
                            Entrar na minha conta
                          </Link>
                        </div>
                    </div>
                    
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative">
                            <img 
                                src="/plant-home.png" 
                                alt="Plantas em casa" 
                                className="w-full h-[700px] lg:h-[800px] object-contain drop-shadow-2xl"
                            />
                            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-green-100 rounded-full blur-3xl opacity-30" style={{backgroundColor: '#294D1C20'}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full max-w-7xl mx-auto px-4 mt-6 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center border border-gray-200">
                    <svg className="w-10 h-10 mb-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20m10-10H2" />
                    </svg>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Enciclopédia de Plantas</h3>
                    <p className="text-gray-500 text-sm">Explore informações detalhadas sobre diversas espécies e descubra dicas para cuidar melhor de cada planta.</p>
                </div>
                <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center border border-gray-200">
                    <svg className="w-10 h-10 mb-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Lembretes Inteligentes</h3>
                    <p className="text-gray-500 text-sm">Receba notificações automáticas para regar, adubar e cuidar das suas plantas no momento certo.</p>
                </div>
                <div className="bg-white rounded-2xl p-8 flex flex-col items-center text-center border border-gray-200">
                    <svg className="w-10 h-10 mb-4 text-green-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17a4 4 0 01-4-4V7a4 4 0 018 0v6a4 4 0 01-4 4zm0 0v2a2 2 0 104 0v-2m-4 0h4" />
                    </svg>
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Estatísticas do Jardim</h3>
                    <p className="text-gray-500 text-sm">Acompanhe o crescimento, saúde e histórico das suas plantas com gráficos e dados intuitivos.</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;