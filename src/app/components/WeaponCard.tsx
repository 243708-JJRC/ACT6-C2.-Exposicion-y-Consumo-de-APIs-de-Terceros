import { Weapon } from "../../api/Valorant";
import Link from "next/link";

interface WeaponCardProps {
  weapon: Weapon;
}

export default function WeaponCard({ weapon }: WeaponCardProps) {
  return (
    <Link href={`/armas/${weapon.uuid}`} className="block">
      <div className="bg-[#1f2933] rounded-xl p-6 relative group hover:bg-[#2b3945] transition-colors border border-transparent hover:border-[#ff4655] flex flex-col justify-between h-full">
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-3xl font-black uppercase tracking-wide text-white">{weapon.displayName}</h3>
            <span className="text-gray-400 text-sm font-semibold">
              {weapon.category.split('::')[1] || 'Melee'}
            </span>
          </div>
          {weapon.shopData && (
            <div className="bg-[#0f1923] text-[#ff4655] font-bold px-4 py-2 rounded-lg flex items-center gap-2">
              <span>¤</span> {weapon.shopData.cost}
            </div>
          )}
        </div>

        <div className="h-32 flex items-center justify-center mb-6">
          <img 
            src={weapon.displayIcon} 
            alt={weapon.displayName} 
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-lg" 
          />
        </div>

        {weapon.weaponStats ? (
          <div className="grid grid-cols-3 gap-2 border-t border-gray-700 pt-4 mt-auto">
            <div className="text-center text-white">
              <p className="text-xs text-gray-500 uppercase">Cargador</p>
              <p className="font-bold">{weapon.weaponStats.magazineSize}</p>
            </div>
            <div className="text-center border-l border-r border-gray-700 text-white">
              <p className="text-xs text-gray-500 uppercase">Cadencia</p>
              <p className="font-bold">{weapon.weaponStats.fireRate} <span className="text-xs font-normal">balas/s</span></p>
            </div>
            <div className="text-center text-white">
              <p className="text-xs text-gray-500 uppercase">Recarga</p>
              <p className="font-bold">{weapon.weaponStats.reloadTimeSeconds} <span className="text-xs font-normal">s</span></p>
            </div>
          </div>
        ) : (
          <div className="border-t border-gray-700 pt-4 mt-auto text-center text-gray-500 text-sm">
            Arma cuerpo a cuerpo.
          </div>
        )}

      </div>
    </Link>
  );
}