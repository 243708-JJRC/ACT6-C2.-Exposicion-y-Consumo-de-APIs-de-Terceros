"use client";

import { useEffect, useState } from 'react';
import { getAgents, Agent } from '../api/Valorant';
import Header from './components/Header';
import AgentCard from './components/AgentCard';

export default function Home() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("Todos");

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const data = await getAgents();
        setAgents(data);
      } catch (err) {
        setError("Ups, no pudimos conectar con los servidores de Valorant.");
      } finally {
        setLoading(false);
      }
    };
    fetchAgents();
  }, []);

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.displayName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "Todos" || agent.role?.displayName === selectedRole;
    return matchesSearch && matchesRole;
  });

  if (loading) return <div className="min-h-screen flex justify-center items-center text-xl font-bold text-[#ff4655] animate-pulse">Cargando datos de la API...</div>;
  if (error) return <div className="min-h-screen flex justify-center items-center text-red-500 font-bold">{error}</div>;

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-8 py-10">
        <h2 className="text-4xl font-black mb-2">Agentes</h2>
        <p className="text-gray-400 mb-8">Descubre todos los agentes jugables de VALORANT</p>

        <div className="bg-[#1f2933] p-4 rounded-lg mb-6 flex items-center">
          <span className="text-gray-400 mr-3"></span>
          <input 
            type="text" 
            placeholder="Buscar agente..." 
            className="bg-transparent w-full outline-none text-white placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-3 mb-10 overflow-x-auto pb-2">
          {['Todos', 'Duelista', 'Iniciador', 'Controlador', 'Centinela'].map(role => (
            <button 
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-5 py-2 rounded-lg font-semibold transition-colors ${selectedRole === role ? 'bg-[#ff4655] text-white' : 'bg-[#1f2933] text-gray-300 hover:bg-[#2b3945]'}`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.uuid} agent={agent} />
          ))}
        </div>
        
        {filteredAgents.length === 0 && (
          <div className="text-center text-gray-500 py-10">No se encontraron agentes con esos filtros.</div>
        )}
      </main>
    </>
  );
}