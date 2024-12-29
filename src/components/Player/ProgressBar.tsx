import React, { useRef } from 'react';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';
import { useAudioTime } from '../../hooks/useAudioTime';

export function ProgressBar() {
  const { audioRef, seekTo } = useMusicPlayer();
  const progressRef = useRef<HTMLDivElement>(null);
  const { currentTime, duration, formatTime, progress } = useAudioTime(audioRef.current);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !duration) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    seekTo(pos * duration);
  };

  return (
    <div className="w-full flex items-center gap-2">
      <span className="text-xs text-gray-500">{formatTime(currentTime)}</span>
      <div 
        ref={progressRef}
        className="flex-1 h-2 bg-gray-200 rounded-full cursor-pointer group"
        onClick={handleProgressClick}
      >
        <div 
          className="h-full bg-indigo-500 rounded-full relative group-hover:bg-indigo-600 transition-colors"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <span className="text-xs text-gray-500">{formatTime(duration)}</span>
    </div>
  );
}