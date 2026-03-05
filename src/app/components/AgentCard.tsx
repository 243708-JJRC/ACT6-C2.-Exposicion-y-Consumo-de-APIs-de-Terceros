import { Agent } from "../../api/Valorant";
import Link from "next/link";

interface AgentCardProps {
  agent: Agent;
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <Link href={`/agentes/?id=${agent.uuid}`} className="block h-full">
      <div className="bg-[#1f2933] rounded-xl p-6 relative overflow-hidden group cursor-pointer hover:bg-[#2b3945] transition-colors border border-transparent hover:border-[#ff4655] h-full">
        <img 
          src={agent.fullPortrait}
          alt={agent.displayName} 
          className="w-full h-80 object-cover object-top drop-shadow-2xl group-hover:scale-105 transition-transform duration-300" 
        />
        
        <div className="mt-4 flex justify-between items-end">
          <div>
            <h3 className="text-3xl font-black uppercase tracking-wide text-white">{agent.displayName}</h3>
            {agent.role && (
              <span className="bg-[#eab308] text-black text-xs font-bold px-3 py-1 rounded-full uppercase mt-2 inline-block">
                {agent.role.displayName}
              </span>
            )}
          </div>
          {agent.role && (
            <img src={agent.role.displayIcon} alt="Role Icon" className="w-8 h-8 opacity-80" />
          )}
        </div>
      </div>
    </Link>
  );
}