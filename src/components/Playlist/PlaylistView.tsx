import { Music, PlayCircle } from 'lucide-react';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';
import { Track } from '../../types/music';

function TrackItem({ track, isPlaying, onPlay }: { track: Track; isPlaying: boolean; onPlay: () => void }) {
  return (
    <div 
      className={`flex items-center gap-4 p-4 hover:bg-white/50 cursor-pointer rounded-xl transition-all duration-300 hover:shadow-md ${
        isPlaying ? 'bg-white/70 shadow-md scale-[1.02]' : ''
      }`}
      onClick={onPlay}
    >
      <div className={`w-12 h-12 rounded-xl ${
        isPlaying ? 'bg-gradient-to-br from-primary-400 to-accent-400' : 'bg-gray-100'
      } flex items-center justify-center transition-all duration-300`}>
        {isPlaying ? (
          <PlayCircle className="w-6 h-6 text-white animate-pulse-slow" />
        ) : (
          <Music className="w-6 h-6 text-gray-400" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`font-semibold truncate ${
          isPlaying ? 'text-primary-700' : 'text-gray-900'
        }`}>
          {track.title}
        </h3>
        <p className="text-sm text-gray-500 truncate">{track.artist}</p>
      </div>
    </div>
  );
}

export function PlaylistView() {
  const { playlist, currentTrack, playTrack, isPlaying } = useMusicPlayer();

  if (playlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-12rem)] text-center p-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center mb-6">
          <Music className="w-12 h-12 text-primary-400" />
        </div>
        <h2 className="text-xl font-semibold text-primary-900 mb-2">Your playlist is empty</h2>
        <p className="text-gray-600">Add some music using the button above to get started</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold text-primary-900 mb-6">Your Playlist</h2>
      <div className="space-y-3">
        {playlist.map((track) => (
          <TrackItem
            key={track.id}
            track={track}
            isPlaying={isPlaying && currentTrack?.id === track.id}
            onPlay={() => playTrack(track)}
          />
        ))}
      </div>
    </div>
  );
}