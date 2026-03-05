import { Weapon } from "../../api/Valorant";

interface WeaponStatsProps {
    weapon: Weapon;
}

export default function WeaponStats({ weapon }: WeaponStatsProps) {
    if (!weapon.weaponStats) return null;

    return (
        <>
        <div className="mb-10 bg-[#1f2933] rounded-xl p-6 border border-gray-800">
            <h2 className="text-2xl font-black text-white uppercase mb-4 border-l-4 border-[#ff4655] pl-4">Estadísticas</h2>
            <div className="grid grid-cols-3 gap-4">
            <div className="text-center text-white">
                <p className="text-sm text-gray-500 uppercase mb-1">Cargador</p>
                <p className="font-bold text-2xl">{weapon.weaponStats.magazineSize}</p>
            </div>
            <div className="text-center border-l border-r border-gray-700 text-white">
                <p className="text-sm text-gray-500 uppercase mb-1">Cadencia</p>
                <p className="font-bold text-2xl">{weapon.weaponStats.fireRate} <span className="text-sm font-normal text-gray-400">balas/s</span></p>
            </div>
            <div className="text-center text-white">
                <p className="text-sm text-gray-500 uppercase mb-1">Tiempo de Recarga</p>
                <p className="font-bold text-2xl">{weapon.weaponStats.reloadTimeSeconds} <span className="text-sm font-normal text-gray-400">s</span></p>
            </div>
            </div>
        </div>

        {weapon.weaponStats.damageRanges && weapon.weaponStats.damageRanges.length > 0 && (
            <div className="mb-12">
            <h2 className="text-2xl font-black mb-6 text-white uppercase border-l-4 border-[#ff4655] pl-4">Rango de Daño</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {weapon.weaponStats.damageRanges.map((range, index) => (
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
        </>
    );
}