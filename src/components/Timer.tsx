import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SkipNextIcon from "@mui/icons-material/SkipNext";

interface TimerProps {
  timeLeft: number;
  isActive: boolean;
  mode: "work" | "break";
  onToggle: () => void;
  onReset: () => void;
  onSwitch: () => void;
}

const Timer = ({
  timeLeft,
  isActive,
  mode,
  onToggle,
  onReset,
  onSwitch,
}: TimerProps) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="text-6xl font-bold text-gray-800">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </div>

      <div className="text-xl font-medium text-gray-600 capitalize">
        {mode} Mode
      </div>

      <div className="flex space-x-4">
        {/* Timerの再生停止 */}
        <button
          onClick={onToggle}
          className="p-3 rounded-full bg-yellow-600 text-white hover:bg-yellow-700 transition-colors"
        >
          {isActive ? <PauseIcon /> : <PlayArrowIcon />}
        </button>

        {/* Timerのリセット */}
        <button
          onClick={onReset}
          className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
        >
          <RestartAltIcon />
        </button>

        {/* // work/break mode切り替え */}
        <button
          onClick={onSwitch}
          className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
        >
          <SkipNextIcon />
        </button>
      </div>
    </div>
  );
};

export default Timer;
