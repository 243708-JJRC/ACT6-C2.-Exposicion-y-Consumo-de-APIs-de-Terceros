"use client";

import { useState } from 'react';
import { Skin } from '../../api/Valorant';

interface WeaponSkinsGalleryProps {
    skins: Skin[];
    weaponName: string;
    weaponImage: string;
}

export default function WeaponSkinsGallery({ skins, weaponName, weaponImage }: WeaponSkinsGalleryProps) {
    const [skinSearchTerm, setSkinSearchTerm] = useState("");

    const processedSkins = skins
        .filter(skin => skin.displayIcon)
        .filter(skin => skin.displayName.toLowerCase().includes(skinSearchTerm.toLowerCase()))
        .sort((a, b) => a.displayName.localeCompare(b.displayName));

    return (
        <div>
        <h2 className="text-3xl font-black mb-6 text-white uppercase border-l-4 border-[#ff4655] pl-4">Skins Disponibles</h2>
        
        <div className="bg-[#1f2933] p-4 rounded-lg mb-8 flex items-center border border-gray-700 focus-within:border-[#ff4655] transition-colors">
            <span className="text-gray-400 mr-3">🔍</span>
            <input 
            type="text" 
            placeholder={`Buscar skin de ${weaponName}...`} 
            className="bg-transparent w-full outline-none text-white placeholder-gray-500"
            value={skinSearchTerm}
            onChange={(e) => setSkinSearchTerm(e.target.value)}
            />
        </div>

        {processedSkins.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {processedSkins.map(skin => {
                const isStandardSkin = skin.displayName.includes('Estándar') || skin.displayName.includes('Standard');
                const finalImageSrc = isStandardSkin ? weaponImage : skin.displayIcon;

                return (
                <div key={skin.uuid} className="bg-[#1f2933] p-6 rounded-xl hover:bg-[#2b3945] transition-colors border border-gray-800">
                    <div className="h-24 flex items-center justify-center mb-4">
                    <img 
                        src={finalImageSrc!} 
                        alt={skin.displayName} 
                        className="max-h-full max-w-full object-contain drop-shadow-lg" 
                    />
                    </div>
                    <h3 className="text-center font-bold text-gray-200 uppercase">{skin.displayName}</h3>
                </div>
                );
            })}
            </div>
        ) : (
            <div className="text-center bg-[#1f2933] p-8 rounded-xl border border-gray-800">
            <p className="text-gray-400 text-lg">No se encontraron skins que coincidan con "{skinSearchTerm}".</p>
            </div>
        )}
        </div>
    );
}