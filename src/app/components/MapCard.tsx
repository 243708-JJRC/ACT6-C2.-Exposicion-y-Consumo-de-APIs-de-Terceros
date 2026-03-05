import { MapData } from "../../api/Valorant";
import Link from "next/link";

interface MapCardProps {
  map: MapData;
}

export default function MapCard({ map }: MapCardProps) {
  return (
    <Link href={`/mapas/detalle?id=${map.uuid}`} className="block">
      <div className="bg-[#1f2933] rounded-xl overflow-hidden relative group border border-transparent hover:border-[#ff4655] transition-colors h-80 cursor-pointer">
        
        <img 
          src={map.splash} 
          alt={map.displayName} 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
        />
        
        <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-[#0f1923] via-transparent to-transparent pointer-events-none">
          
          <div className="flex justify-end">
            {map.displayIcon && (
              <img 
                src={map.displayIcon} 
                alt={`Minimapa de ${map.displayName}`} 
                className="w-24 h-24 object-contain opacity-80 drop-shadow-2xl group-hover:opacity-100 transition-opacity" 
              />
            )}
          </div>

          <div>
            <h3 className="text-4xl font-black uppercase tracking-widest text-white drop-shadow-md">
              {map.displayName}
            </h3>
            
            {map.coordinates && (
              <p className="text-[#ff4655] font-bold text-sm tracking-widest mt-1">
                {map.coordinates}
              </p>
            )}
          </div>

        </div>
      </div>
    </Link>
  );
}