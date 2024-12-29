import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';

export function Controls() {
  const { isPlaying, togglePlayPause, nextTrack, previousTrack } = useMusicPlayer();

  return (
    <div className="flex items-center gap-4">
      <button 
        className="p-2 hover:bg-primary-50 rounded-full transition-colors"
        onClick={previousTrack}
      >
        <SkipBack className="w-5 h-5 text-primary-700" />
      </button>
      <button 
         className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent"
         onClick={togglePlayPause}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-white" />
        ) : (
          <Play className="w-6 h-6 text-black" fill="currentColor" />
        )}
      </button>
      <button 
        className="p-2 hover:bg-primary-50 rounded-full transition-colors"
        onClick={nextTrack}
      >
        <SkipForward className="w-5 h-5 text-primary-700" />
      </button>
    </div>
  );
}