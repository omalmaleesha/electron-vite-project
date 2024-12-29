import React, { createContext, useState, useRef } from 'react';
import { Track } from '../types/music';

interface MusicPlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  playlist: Track[];
  volume: number;
  isMuted: boolean;
  audioRef: React.RefObject<HTMLAudioElement>;
  addTracks: (files: FileList) => void;
  playTrack: (track: Track) => void;
  togglePlayPause: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  seekTo: (time: number) => void;
}

export const MusicPlayerContext = createContext<MusicPlayerContextType | null>(null);

export function MusicPlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const addTracks = (files: FileList) => {
    const newTracks: Track[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      title: file.name.replace(/\.[^/.]+$/, ""),
      artist: 'Unknown Artist',
      url: URL.createObjectURL(file),
      duration: 0
    }));

    setPlaylist(prev => [...prev, ...newTracks]);
    if (!currentTrack) {
      setCurrentTrack(newTracks[0]);
      playTrack(newTracks[0]);
    }
  };

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.src = track.url;
      audioRef.current.play();
    }
  };

  const togglePlayPause = () => {
    if (!currentTrack) return;
    
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (!currentTrack || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playTrack(playlist[nextIndex]);
  };

  const previousTrack = () => {
    if (!currentTrack || playlist.length === 0) return;
    const currentIndex = playlist.findIndex(track => track.id === currentTrack.id);
    const previousIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playTrack(playlist[previousIndex]);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const seekTo = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  return (
    <MusicPlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playlist,
        volume,
        isMuted,
        audioRef,
        addTracks,
        playTrack,
        togglePlayPause,
        nextTrack,
        previousTrack,
        setVolume: handleVolumeChange,
        toggleMute,
        seekTo,
      }}
    >
      {children}
      <audio 
        ref={audioRef}
        onEnded={nextTrack}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
    </MusicPlayerContext.Provider>
  );
}