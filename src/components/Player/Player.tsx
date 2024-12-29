import { Controls } from './Controls';
import { ProgressBar } from './ProgressBar';
import { TrackInfo } from './TrackInfo';
import { VolumeControl } from './VolumeControl';

export function Player() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm border-t border-primary-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <TrackInfo />
          <div className="flex flex-col items-center gap-2 flex-1 max-w-xl px-4">
            <Controls />
            <ProgressBar />
          </div>
          <VolumeControl />
        </div>
      </div>
    </div>
  );
}