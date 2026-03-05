"use client";

import { useEffect, useState } from 'react';
import { getWeapons, Weapon } from '../../api/Valorant';
import Header from '../components/Header';
import WeaponCard from '../components/WeaponCard';

export default function Armas() {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchWeapons = async () => {
      try {
        setLoading(true);
        const data = await getWeapons();
        setWeapons(data);
      } catch (err) {
        setError("Ups, no pudimos conectar con el arsenal de Valorant.");
      } finally {
        setLoading(false);
      }
    };
    fetchWeapons();
  }, []);

  const filteredWeapons = weapons.filter(weapon => 
    weapon.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="min-h-screen flex justify-center items-center text-xl font-bold text-[#ff4655] animate-pulse">Cargando el arsenal...</div>;
  if (error) return <div className="min-h-screen flex justify-center items-center text-red-500 font-bold">{error}</div>;

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-8 py-10">
        <h2 className="text-4xl font-black mb-2 text-white">Armas</h2>
        <p className="text-gray-400 mb-8">Conoce el arsenal disponible, estadísticas y precios de la tienda.</p>

        <div className="bg-[#1f2933] p-4 rounded-lg mb-10 flex items-center">
          <span className="text-gray-400 mr-3"></span>
          <input 
            type="text" 
            placeholder="Buscar arma (ej. Vandal, Phantom)..." 
            className="bg-transparent w-full outline-none text-white placeholder-gray-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWeapons.map((weapon) => (
            <WeaponCard key={weapon.uuid} weapon={weapon} />
          ))}
        </div>
        
        {filteredWeapons.length === 0 && (
          <div className="text-center text-gray-500 py-10">No se encontraron armas con ese nombre.</div>
        )}
      </main>
    </>
  );
}