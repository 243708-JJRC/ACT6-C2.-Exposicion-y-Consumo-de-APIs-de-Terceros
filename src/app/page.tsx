"use client";

import { useEffect, useState } from 'react';
import { getAgents, Agent } from '../api/Valorant';
import Header from './components/Header';
import AgentCard from './components/AgentCard';
import FilterBar from './components/FilterBar'; 

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

  const roles = ['Todos', 'Duelista', 'Iniciador', 'Controlador', 'Centinela'];

  const filteredAgents = agents.filter(agent => {
    const matchesSearch = agent.displayName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "Todos" || agent.role?.displayName === selectedRole;
    return matchesSearch && matchesRole;
  }).sort((a, b) => a.displayName.localeCompare(b.displayName));

  if (loading) return <div className="min-h-screen flex justify-center items-center text-xl font-bold text-[#ff4655] animate-pulse">Cargando agentes de la API...</div>;
  if (error) return <div className="min-h-screen flex justify-center items-center text-red-500 font-bold">{error}</div>;

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-8 py-10">
        <h2 className="text-4xl font-black mb-2 text-white">Agentes</h2>
        <p className="text-gray-400 mb-8">Descubre todos los agentes jugables de VALORANT</p>

        <FilterBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Buscar agente (ej. Jett, Reyna)..."
          categories={roles}
          selectedCategory={selectedRole}
          onCategoryChange={setSelectedRole}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <AgentCard key={agent.uuid} agent={agent} />
          ))}
        </div>
        
        {filteredAgents.length === 0 && (
          <div className="text-center bg-[#1f2933] p-10 rounded-xl border border-gray-800 mt-6">
            <p className="text-gray-400 text-lg">No se encontraron agentes con el nombre "{searchTerm}" en el rol "{selectedRole}".</p>
          </div>
        )}
      </main>
    </>
  );
}