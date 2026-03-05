"use client";

import { useEffect, useState, Suspense } from 'react';
import { getWeaponById, Weapon } from '../../../api/Valorant';
import Header from '../../components/Header';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import WeaponStats from '../../components/WeaponStats';
import WeaponSkinsGallery from '../../components/WeaponSkinsGallery';

function WeaponDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [weapon, setWeapon] = useState<Weapon | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeaponDetails = async () => {
      if (!id) {
        setError("No se especificó ningún arma.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await getWeaponById(id);
        setWeapon(data);
      } catch (err) {
        setError("Ups, no pudimos cargar los detalles de este arma.");
      } finally {
        setLoading(false);
      }
    };
    fetchWeaponDetails();
  }, [id]);

  if (loading) return <div className="min-h-screen flex justify-center items-center text-[#ff4655] font-bold text-xl animate-pulse">Analizando datos...</div>;
  if (error || !weapon) return <div className="min-h-screen flex justify-center items-center text-red-500 font-bold">{error}</div>;

  return (
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

      <WeaponStats weapon={weapon} />
      <WeaponSkinsGallery skins={weapon.skins} weaponName={weapon.displayName} weaponImage={weapon.displayIcon} />

    </main>
  );
}

export default function WeaponSkinsDetail() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="min-h-screen flex justify-center items-center text-white">Cargando interfaz...</div>}>
        <WeaponDetailsContent />
      </Suspense>
    </>
  );
}