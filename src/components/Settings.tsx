import React from "react";
import { Settings } from "../types/timer";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsIcon from "@mui/icons-material/Notifications";

interface SettingsProps {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

const SettingsPanel = ({ settings, onSettingsChange }: SettingsProps) => {
  const handleChange = (key: keyof Settings, value: number | boolean) => {
    onSettingsChange({ ...settings, [key]: value });
  };
  return (
    <div className="space-6">
      <div>
        <label className="flex items-center space-x-2 text-gray-700 mb-2 mt-3">
          <AccessTimeIcon />
          <span>Work Duration (minutes)</span>
        </label>
        <input
          type="number"
          min="1"
          max="60"
          value={settings.workDuration / 60}
          onChange={(e) =>
            handleChange("workDuration", parseInt(e.target.value) * 60)
          }
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div>
        <label className="flex items-center space-x-2 text-gray-700 mb-2 mt-3">
          <NotificationsIcon />
          <span>Break Duration (minutes)</span>
        </label>
        <input
          type="number"
          min="1"
          max="30"
          value={settings.breakDuration / 60}
          onChange={(e) =>
            handleChange("breakDuration", parseInt(e.target.value) * 60)
          }
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="posturePause"
          checked={settings.posturePause}
          onChange={(e) => handleChange("posturePause", e.target.checked)}
          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
        />
        <label htmlFor="posturePause" className="text-gray-700 px-3 py-2">
          Enable posture check reminders
        </label>
      </div>
    </div>
  );
};

export default SettingsPanel;
