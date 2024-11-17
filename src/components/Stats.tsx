import { TimerStats } from "../types/timer";
import ModeStandbyIcon from "@mui/icons-material/ModeStandby";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface StatsProps {
  stats: TimerStats;
}

const Stats = ({ stats }: StatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 text-blue-600 mb-2">
          <ModeStandbyIcon />
          <span className="font-medium">Sessions</span>
        </div>
        <p className="text-2xl font-bold">{stats.dailySessions}</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 text-green-600 mb-2">
          <ElectricBoltIcon />
          <span className="font-medium">Focus Score</span>
        </div>
        <p className="text-2xl font-bold">{stats.focusScore}%</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center space-x-2 text-red-600 mb-2">
          <ErrorOutlineIcon />
          <span className="font-medium">Interruptions</span>
        </div>
        <p className="text-2xl font-bold">{stats.interruptions}</p>
      </div>
    </div>
  );
};

export default Stats;
