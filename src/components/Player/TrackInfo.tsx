import { useMusicPlayer } from '../../hooks/useMusicPlayer';
import { Music } from 'lucide-react';

export function TrackInfo() {
  const { currentTrack } = useMusicPlayer();

  if (!currentTrack) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
          <Music className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-white">No track selected</h3>
          <p className="text-sm text-white">Add some music to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="w-16 h-16 rounded-lg bg-indigo-100 flex items-center justify-center">
        <Music className="w-8 h-8 text-indigo-500" />
      </div>
      <div>
        <h3 className="font-semibold text-gray-900">{currentTrack.title}</h3>
        <p className="text-sm text-gray-500">{currentTrack.artist}</p>
      </div>
    </div>
  );
}