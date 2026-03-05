"use client";

import { useEffect, useState, Suspense } from 'react';
import { getAgentById, Agent } from '../../api/Valorant';
import Header from '../components/Header';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function AgentDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgentDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getAgentById(id);
        setAgent(data);
      } catch (err) {
        setError("Ups, no pudimos cargar los detalles del agente.");
      } finally {
        setLoading(false);
      }
    };
    fetchAgentDetails();
  }, [id]);

  if (loading) return <div className="min-h-screen flex justify-center items-center text-[#ff4655] font-bold text-xl animate-pulse">Desencriptando datos del agente...</div>;
  if (error || !agent) return <div className="min-h-screen flex justify-center items-center text-red-500 font-bold">{error}</div>;

  return (
    <main className="min-h-screen bg-[#0f1923]">
      <Header />
      
      <div className="relative w-full max-w-7xl mx-auto mt-6 rounded-3xl overflow-hidden bg-gradient-to-r from-[#17202b] to-[#1e2a38] shadow-2xl">
        
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 overflow-hidden">
          <img src={agent.background} alt="Fondo" className="w-full h-full object-cover scale-150" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-center px-10 py-12 md:py-0">
          
          <div className="flex-1 md:pr-10 md:py-20 text-left">
            <Link href="/" className="text-gray-300 hover:text-white flex items-center gap-2 mb-10 w-max transition-colors text-sm font-semibold">
              <span>←</span> Volver a Agentes
            </Link>

            <h1 className="text-7xl md:text-8xl font-black text-white uppercase tracking-widest mb-6 drop-shadow-lg">
              {agent.displayName}
            </h1>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-xl">
              {agent.description}
            </p>

            {agent.role && (
              <div className="flex items-center gap-4">
                <span className="bg-[#eab308] text-black px-4 py-2 rounded font-black uppercase tracking-wide">
                  {agent.role.displayName}
                </span>
                <img src={agent.role.displayIcon} alt={agent.role.displayName} className="w-10 h-10 drop-shadow-md" />
              </div>
            )}
          </div>

          <div className="flex-1 h-full flex items-end justify-center md:justify-end -mb-10 mt-10 md:mt-0">
            <img 
              src={agent.fullPortrait} 
              alt={agent.displayName} 
              className="max-h-[600px] object-contain drop-shadow-2xl"
            />
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-10 py-16">
        <h2 className="text-4xl font-black text-white mb-10 border-b border-gray-700 pb-4">Habilidades</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {agent.abilities.map((ability, index) => (
            <div key={index} className="bg-[#1f2933] p-6 rounded-xl hover:bg-[#2b3945] transition-colors border border-gray-800 flex flex-col items-center text-center">
              
              <div className="w-20 h-20 bg-[#0f1923] rounded-2xl flex items-center justify-center p-4 mb-6 shadow-inner">
                {ability.displayIcon ? (
                  <img src={ability.displayIcon} alt={ability.displayName} className="w-full h-full object-contain" />
                ) : (
                  <span className="text-gray-500 font-bold">Pasiva</span>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-white uppercase mb-3">{ability.displayName}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{ability.description}</p>
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}

export default function AgentDetailView() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f1923] flex justify-center items-center text-white">Cargando interfaz...</div>}>
      <AgentDetailContent />
    </Suspense>
  );
}