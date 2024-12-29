import { useState, useEffect } from 'react';

export function useAudioTime(audioElement: HTMLAudioElement | null) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioElement) return;

    const handleTimeUpdate = () => setCurrentTime(audioElement.currentTime);
    const handleDurationChange = () => setDuration(audioElement.duration);
    
    audioElement.addEventListener('timeupdate', handleTimeUpdate);
    audioElement.addEventListener('loadedmetadata', handleDurationChange);
    
    return () => {
      audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      audioElement.removeEventListener('loadedmetadata', handleDurationChange);
    };
  }, [audioElement]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    currentTime,
    duration,
    formatTime,
    progress: duration ? (currentTime / duration) * 100 : 0
  };
}