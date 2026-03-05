"use client";

import { useEffect, useState, Suspense } from 'react';
import { getMapById, MapData } from '../../../api/Valorant';
import Header from '../../components/Header';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function MapDetailContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMapDetails = async () => {
      if (!id) {
        setError("No se especificó ningún mapa. Por favor, regresa a la lista de mapas.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getMapById(id);
        setMapData(data);
      } catch (err) {
        setError("Ups, no pudimos cargar los detalles de este mapa.");
      } finally {
        setLoading(false);
      }
    };
    fetchMapDetails();
  }, [id]);

  if (loading) return <div className="min-h-screen flex justify-center items-center text-[#ff4655] font-bold text-xl animate-pulse">Analizando terreno...</div>;
  if (error || !mapData) return <div className="min-h-screen flex justify-center items-center text-red-500 font-bold">{error}</div>;

  return (
    <main className="max-w-7xl mx-auto px-8 py-10">
      
      <Link href="/mapas" className="text-gray-400 hover:text-white flex items-center gap-2 mb-8 w-max transition-colors">
        <span>←</span> Volver a Mapas
      </Link>

      <div className="relative rounded-2xl overflow-hidden mb-12 border-b-4 border-[#ff4655] h-64 md:h-80 flex items-end">
        <img 
          src={mapData.splash} 
          alt={mapData.displayName} 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1923] to-transparent"></div>
        
        <div className="relative z-10 p-8 w-full">
          <h1 className="text-6xl font-black uppercase tracking-widest text-white mb-2 drop-shadow-lg">
            {mapData.displayName}
          </h1>
          {mapData.coordinates && (
            <p className="text-2xl text-[#ff4655] font-bold tracking-widest drop-shadow-md">
              {mapData.coordinates}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        
        <div className="flex-1 space-y-8">
          
          {mapData.tacticalDescription && (
            <div className="bg-[#1f2933] p-8 rounded-xl border border-gray-800">
              <h2 className="text-2xl font-black text-white uppercase mb-4 border-l-4 border-[#ff4655] pl-4">
                Diseño Táctico
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                {mapData.tacticalDescription}
              </p>
            </div>
          )}
          
        </div>

        <div className="flex-1 w-full bg-[#1f2933] p-8 rounded-xl border border-gray-800 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-black text-white uppercase mb-8 border-b-2 border-gray-700 pb-2 w-full text-center">
            Plano Táctico
          </h2>
          {mapData.displayIcon ? (
            <img 
              src={mapData.displayIcon} 
              alt={`Plano táctico de ${mapData.displayName}`} 
              className="max-w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <p className="text-gray-500 italic">No hay plano táctico disponible para esta ubicación.</p>
          )}
        </div>

      </div>
    </main>
  );
}

export default function MapDetailView() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="min-h-screen flex justify-center items-center text-white">Cargando interfaz del mapa...</div>}>
        <MapDetailContent />
      </Suspense>
    </>
  );
}