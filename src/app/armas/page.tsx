"use client";

import { useEffect, useState } from 'react';
import { getWeapons, Weapon } from '../../api/Valorant';
import Header from '../components/Header';
import WeaponCard from '../components/WeaponCard';
import FilterBar from '../components/FilterBar';

export default function Armas() {
  const [weapons, setWeapons] = useState<Weapon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  useEffect(() => {
    const fetchWeapons = async () => {
      try { setLoading(true); const data = await getWeapons(); setWeapons(data); } 
      catch (err) { setError("Ups, no pudimos conectar."); } 
      finally { setLoading(false); }
    };
    fetchWeapons();
  }, []);

  const categories = ['Todas', 'Sidearm', 'SMG', 'Shotgun', 'Rifle', 'Sniper', 'Heavy', 'Melee'];

  const filteredWeapons = weapons.filter(weapon => {
    const weaponCategory = weapon.category ? (weapon.category.split('::')[1] || 'Melee') : 'Melee';
    const matchesSearch = weapon.displayName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todas" || weaponCategory === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="min-h-screen flex justify-center items-center text-xl font-bold text-[#ff4655] animate-pulse">Cargando el arsenal...</div>;
  if (error) return <div className="min-h-screen flex justify-center items-center text-red-500 font-bold">{error}</div>;

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-8 py-10">
        <h2 className="text-4xl font-black mb-2 text-white">Armas</h2>
        <p className="text-gray-400 mb-8">Conoce el arsenal disponible, estadísticas y precios de la tienda.</p>

        <FilterBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Buscar arma por nombre..."
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredWeapons.map((weapon) => (
            <WeaponCard key={weapon.uuid} weapon={weapon} />
          ))}
        </div>
        
        {filteredWeapons.length === 0 && (
          <div className="text-center bg-[#1f2933] p-10 rounded-xl border border-gray-800">
            <p className="text-gray-400 text-lg">No se encontraron armas con esos filtros.</p>
          </div>
        )}
      </main>
    </>
  );
}