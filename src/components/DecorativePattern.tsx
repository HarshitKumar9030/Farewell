export function DecorativePattern() {
    return (
      <div className="absolute inset-0 pointer-events-none">
        {/* Top left corner pattern */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-xl" />
        
        {/* Bottom right corner pattern */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-xl" />
        
        {/* Decorative lines */}
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>
    );
  }
  