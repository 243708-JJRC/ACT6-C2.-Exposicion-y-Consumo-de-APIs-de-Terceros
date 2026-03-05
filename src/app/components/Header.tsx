"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="flex justify-between items-center px-8 py-4 border-b-2 border-[#ff4655] bg-[#0f1923]">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#ff4655] rounded-full flex items-center justify-center font-bold text-xs text-white">V</div>
        <h1 className="text-2xl font-black tracking-widest uppercase text-white">
          VALORANT <span className="text-sm font-normal text-gray-400 normal-case block -mt-1">Database</span>
        </h1>
      </div>
      <nav className="flex gap-4">
        <Link 
          href="/" 
          className={`px-6 py-2 rounded font-bold transition-all ${isActive('/') ? 'bg-[#ff4655] text-white' : 'bg-[#1f2933] hover:bg-[#2b3945] text-gray-300'}`}
        >
          Agentes
        </Link>
        <Link 
          href="/armas" 
          className={`px-6 py-2 rounded font-bold transition-all ${isActive('/armas') ? 'bg-[#ff4655] text-white' : 'bg-[#1f2933] hover:bg-[#2b3945] text-gray-300'}`}
        >
          Armas
        </Link>
        <Link 
          href="/mapas" 
          className={`px-6 py-2 rounded font-bold transition-all ${isActive('/mapas') ? 'bg-[#ff4655] text-white' : 'bg-[#1f2933] hover:bg-[#2b3945] text-gray-300'}`}
        >
          Mapas
        </Link>
      </nav>
    </header>
  );
}