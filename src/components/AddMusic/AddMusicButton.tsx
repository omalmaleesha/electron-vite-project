import React from 'react';
import { Plus } from 'lucide-react';
import { useMusicPlayer } from '../../hooks/useMusicPlayer';

export function AddMusicButton() {
  const { addTracks } = useMusicPlayer();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      addTracks(files);
    }
  };

  return (
    <div className="inline-block">
      <label className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg cursor-pointer transition-colors">
        <Plus className="w-5 h-5" />
        <span>Add Music</span>
        <input
          type="file"
          accept="audio/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </label>
    </div>
  );
}