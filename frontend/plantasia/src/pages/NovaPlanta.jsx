import { Link } from 'react-router-dom';

function NovaPlanta() {
    return (
        <div className="min-h-screen bg-linear-to-br from-white to-gray-50 flex items-start">
            <div className="w-full max-w-3xl mx-auto px-4 pt-12 pb-16">
                <h1 className="text-3xl lg:text-4xl font-light text-gray-900 leading-tight tracking-tight mb-6">
                    Adicionar Nova Planta
                </h1>
                <p className="text-lg text-gray-500 mb-10 max-w-md">
                    Preencha os dados abaixo para cadastrar uma nova planta no seu jardim.
                </p>
                <form className="bg-white rounded-2xl border border-gray-200 p-8 flex flex-col gap-6 shadow-none">
                    <div>
                        <label htmlFor="nome" className="block text-gray-700 font-medium mb-2">Nome da Planta</label>
                        <input id="nome" name="nome" type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#294D1C]" placeholder="Ex: Ficus lyrata" />
                    </div>
                    <div>
                        <label htmlFor="especie" className="block text-gray-700 font-medium mb-2">Espécie</label>
                        <input id="especie" name="especie" type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#294D1C]" placeholder="Ex: Figueira" />
                    </div>
                    <div>
                        <label htmlFor="local" className="block text-gray-700 font-medium mb-2">Local</label>
                        <input id="local" name="local" type="text" className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#294D1C]" placeholder="Ex: Sala de estar" />
                    </div>
                    <div>
                        <label htmlFor="descricao" className="block text-gray-700 font-medium mb-2">Descrição</label>
                        <textarea id="descricao" name="descricao" rows={3} className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#294D1C]" placeholder="Observações sobre a planta..." />
                    </div>
                    <button type="submit" className="mt-4 px-8 py-3 rounded-full font-medium bg-[#294D1C] text-white hover:bg-[#1e3714] transition-colors duration-200 self-end">
                        Salvar Planta
                    </button>
                </form>
                <div className="mt-8 text-sm text-gray-400 flex items-center gap-2 justify-center">
                    <div className="w-12 h-px bg-gray-300"></div>
                    <span>Plantasia</span>
                    <div className="w-12 h-px bg-gray-300"></div>
                </div>
                <div className="mt-8 flex justify-center">
                    <Link to="/" className="text-[#294D1C] font-medium hover:underline">Voltar para Home</Link>
                </div>
            </div>
        </div>
    );
}

export default NovaPlanta;
