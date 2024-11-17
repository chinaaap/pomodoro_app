import React from "react";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import WaterIcon from "@mui/icons-material/Water";
import UmbrellaIcon from "@mui/icons-material/Umbrella";
import CoffeeIcon from "@mui/icons-material/Coffee";
import { SoundType } from "../types/timer";

interface SoundControlProps {
  volume: number;
  selectedSound: SoundType | null;
  onVolumeChange: (volume: number) => void;
  onSoundSelect: (sound: SoundType) => void;
}

const SoundControl = ({
  volume,
  selectedSound,
  onVolumeChange,
  onSoundSelect,
}: SoundControlProps) => {
  const sounds: { type: SoundType; icon: React.ReactNode; label: string }[] = [
    { type: "rain", icon: <UmbrellaIcon />, label: "Rain" },
    { type: "waves", icon: <WaterIcon />, label: "Waves" },
    { type: "cafe", icon: <CoffeeIcon />, label: "Cafe" },
  ];
  return (
    <div className="space-x-4">
      <div className="flex items-center space-x-4">
        <VolumeUpIcon className="text-gray-600" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex space-x-2">
        {sounds.map(({ type, icon, label }) => (
          <button
            key={type}
            onClick={() => onSoundSelect(type)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors
            ${
              selectedSound === type
                ? "bg-yellow-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SoundControl;
