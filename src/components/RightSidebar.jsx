import { Hexagon, Github, Twitter, MessageSquare, Settings, Clock, ShieldAlert } from 'lucide-react';

function RightSidebar() {
  return (
    <div className="fixed right-0 top-0 bottom-0 w-12 border-l border-arctic-powder/10 bg-oceanic-noir/70 backdrop-blur-md z-50 hidden md:flex flex-col items-center justify-between py-8">
      {/* Top section: Brand & Socials */}
      <div className="flex flex-col items-center gap-6 text-mystic-mint/45">
        <a href="#" className="hover:text-arctic-powder transition-colors group">
          <Hexagon className="w-4 h-4 text-arctic-powder group-hover:rotate-180 transition-transform duration-300" />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-arctic-powder transition-colors" aria-label="Apeiron GitHub">
          <Github className="w-4 h-4" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-arctic-powder transition-colors" aria-label="Apeiron Twitter">
          <Twitter className="w-4 h-4" />
        </a>
        <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-arctic-powder transition-colors" aria-label="Apeiron Discord">
          <MessageSquare className="w-4 h-4" />
        </a>
      </div>
      
      {/* Bottom section: System diagnostics */}
      <div className="flex flex-col items-center gap-6 text-mystic-mint/45">
        <Settings className="w-4 h-4 hover:text-arctic-powder transition-colors cursor-pointer" />
        <Clock className="w-4 h-4 hover:text-arctic-powder transition-colors cursor-pointer" />
        <ShieldAlert className="w-4 h-4 hover:text-arctic-powder transition-colors cursor-pointer" />
        
        {/* Pulsing server connection indicator */}
        <div className="relative flex h-2 w-2 cursor-pointer group" title="SYSTEM_NODE_ACTIVE">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
