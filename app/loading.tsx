export default function Loading() {
    return (
      <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-black text-white">
        {/* Blue gradient glow */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/20 blur-[140px]" />
  
        {/* Secondary glow */}
        <div className="absolute left-[20%] top-[20%] h-40 w-40 rounded-full bg-cyan-500/10 blur-[100px]" />
  
        <div className="relative flex flex-col items-center">
          {/* Logo */}
          <div className="text-4xl font-black tracking-[-0.08em] sm:text-5xl">
            TEXSHIMA
          </div>
  
          {/* Loading indicator */}
          <div className="mt-7 h-[2px] w-32 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/2 animate-loading-bar rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500" />
          </div>
  
          <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.35em] text-white/40">
            Loading
          </p>
        </div>
      </div>
    );
  }