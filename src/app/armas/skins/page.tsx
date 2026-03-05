"use client";

import { useEffect, useState } from 'react';
import { getWeaponById, Weapon } from '../../../api/Valorant';
import Header from '../../components/Header';
import Link from 'next/link';
import { use } from 'react'; // Necesario en Next.js para leer los parámetros de la URL

export default function WeaponDetail({ params }: { params: Promise<{ uuid: string }> }) {
  // Desenvolvemos los parámetros de la URL
  const { uuid } = use(params);
  
  const [weapon, setWeapon] = useState<Weapon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeaponDetails = async () => {
      try {
        setLoading(true);
        const data = await getWeaponById(uuid);
        setWeapon(data);
      } catch (err) {
        setError("Ups, no pudimos cargar los detalles de este arma.");
      } finally {
        setLoading(false);
      }
    };
    fetchWeaponDetails();
  }, [uuid]);

  if (loading) return <div className="min-h-screen flex justify-center items-center text-[#ff4655] font-bold text-xl animate-pulse">Analizando arma...</div>;
  if (error || !weapon) return <div className="min-h-screen flex justify-center items-center text-red-500 font-bold">{error}</div>;

  const customSkins = weapon.skins.filter(skin => skin.displayIcon && skin.displayName !== `Standard ${weapon.displayName}`);

  return (
    <>
      <Header />
      <main className="max-w-7xl mx-auto px-8 py-10">
        

        <Link href="/armas" className="text-gray-400 hover:text-white flex items-center gap-2 mb-8 w-max transition-colors">
          <span>←</span> Volver al Arsenal
        </Link>

        <div className="bg-[#1f2933] rounded-2xl p-8 mb-10 flex flex-col md:flex-row items-center gap-10 border-b-4 border-[#ff4655]">
          <div className="flex-1">
            <h1 className="text-6xl font-black uppercase tracking-widest text-white mb-2">{weapon.displayName}</h1>
            <p className="text-xl text-gray-400 mb-6 uppercase tracking-widest">{weapon.category.split('::')[1] || 'Melee'}</p>
            {weapon.shopData && (
              <p className="text-2xl font-bold text-[#ff4655]">Costo: ¤ {weapon.shopData.cost}</p>
            )}
          </div>
          <div className="flex-1 flex justify-center">
            <img src={weapon.displayIcon} alt={weapon.displayName} className="max-h-48 drop-shadow-2xl" />
          </div>
        </div>

        {weapon.damageRanges && weapon.damageRanges.length > 0 && (
          <div className="mb-12">
            <h2 className="text-3xl font-black mb-6 text-white uppercase border-l-4 border-[#ff4655] pl-4">Rango de Daño</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {weapon.damageRanges.map((range, index) => (
                <div key={index} className="bg-[#1f2933] p-6 rounded-xl border border-gray-700">
                  <p className="text-[#ff4655] font-bold text-lg mb-4 text-center border-b border-gray-700 pb-2">
                    {range.rangeStartMeters}m - {range.rangeEndMeters}m
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-white">
                      <span className="text-gray-400">Cabeza</span>
                      <span className="font-bold text-xl">{range.headDamage.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center text-white">
                      <span className="text-gray-400">Cuerpo</span>
                      <span className="font-bold text-xl">{range.bodyDamage.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-center text-white">
                      <span className="text-gray-400">Piernas</span>
                      <span className="font-bold text-xl">{range.legDamage.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        <div>
          <h2 className="text-3xl font-black mb-6 text-white uppercase border-l-4 border-[#ff4655] pl-4">Skins Destacadas</h2>
          {customSkins.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {customSkins.map(skin => (
                <div key={skin.uuid} className="bg-[#1f2933] p-6 rounded-xl hover:bg-[#2b3945] transition-colors border border-gray-800">
                  <div className="h-24 flex items-center justify-center mb-4">
                    <img src={skin.displayIcon!} alt={skin.displayName} className="max-h-full max-w-full object-contain drop-shadow-lg" />
                  </div>
                  <h3 className="text-center font-bold text-gray-200 uppercase">{skin.displayName}</h3>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No hay skins disponibles para esta arma.</p>
          )}
        </div>

      </main>
    </>
  );
}