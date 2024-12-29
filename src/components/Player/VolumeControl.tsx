import React, { useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';

export function VolumeControl() {
  const { volume, setVolume, isMuted, toggleMute } = useMusicPlayer();
  const volumeRef = useRef<HTMLDivElement>(null);

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!volumeRef.current) return;
    
    const rect = volumeRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setVolume(Math.max(0, Math.min(1, pos)));
  };

  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={toggleMute}
        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
      >
        {isMuted || volume === 0 ? (
          <VolumeX className="w-5 h-5 text-gray-700" />
        ) : (
          <Volume2 className="w-5 h-5 text-gray-700" />
        )}
      </button>
      <div 
        ref={volumeRef}
        className="w-24 h-2 bg-gray-200 rounded-full cursor-pointer group"
        onClick={handleVolumeClick}
      >
        <div 
          className="h-full bg-indigo-500 rounded-full relative group-hover:bg-indigo-600 transition-colors"
          style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  );
}