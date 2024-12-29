import { Player } from './components/Player/Player';
import { AddMusicButton } from './components/AddMusic/AddMusicButton';
import { PlaylistView } from './components/Playlist/PlaylistView';
import { MusicPlayerProvider } from './contexts/MusicPlayerContext';

export default function App() {
  return (
    <MusicPlayerProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-50">
        <header className="bg-black/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent">
  Your Music
</h1>
            <AddMusicButton />
          </div>
        </header>
        
        <main className="pb-24 bg-black/20">
          <PlaylistView />
        </main>

        <Player />
      </div>
    </MusicPlayerProvider>
  );
}