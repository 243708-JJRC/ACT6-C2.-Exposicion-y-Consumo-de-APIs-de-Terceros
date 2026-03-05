"use client";

import { useEffect, useState } from 'react';
import { getMaps, MapData } from '../../api/Valorant';
import Header from '../components/Header';
import FilterBar from '../components/FilterBar';
import MapCard from '../components/MapCard';

export default function Mapas() {
  const [maps, setMaps] = useState<MapData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMaps = async () => {
      try {
        setLoading(true);
        const data = await getMaps();
        
        const validMaps = data
          .filter(map => map.splash && map.displayName !== "The Range")
          .sort((a, b) => a.displayName.localeCompare(b.displayName));
          
        setMaps(validMaps);
      } catch (err) {
        setError("Ups, no pudimos cargar los mapas.");
      } finally {
        setLoading(false);
      }
    };
    fetchMaps();
  }, []);

  const filteredMaps = maps.filter(map => 
    map.displayName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="min-h-screen flex justify-center items-center text-[#ff4655] font-bold text-xl animate-pulse">Cargando ubicaciones tácticas...</div>;
  if (error) return <div className="min-h-screen flex justify-center items-center text-red-500 font-bold">{error}</div>;

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-8 py-10">
        <h2 className="text-4xl font-black mb-2 text-white">Mapas</h2>
        <p className="text-gray-400 mb-8">Explora los campos de batalla, sus coordenadas y su diseño táctico.</p>

        <FilterBar 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          placeholder="Buscar mapa (ej. Ascent, Bind, Split)..."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredMaps.map((map) => (
            <MapCard key={map.uuid} map={map} />
          ))}
        </div>

        {filteredMaps.length === 0 && (
          <div className="text-center bg-[#1f2933] p-10 rounded-xl border border-gray-800">
            <p className="text-gray-400 text-lg">No se encontraron mapas que coincidan con "{searchTerm}".</p>
          </div>
        )}
      </main>
    </>
  );
}