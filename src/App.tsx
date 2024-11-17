import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import Timer from "./components/Timer";
import SettingsIcon from "@mui/icons-material/Settings";
import { useState } from "react";
import { useTimer } from "./hooks/useTimer";
import Stats from "./components/Stats";
import SoundControl from "./components/SoundControl";
import { SoundType } from "./types/timer";
import SettingsPanel from "./components/Settings";

function App() {
  const {
    mode,
    timeLeft,
    isActive,
    settings,
    stats,
    toggleTimer,
    resetTimer,
    switchMode,
    setSettings,
  } = useTimer();
  // setting表示非表示切り替え
  const [showSettings, setShowSettings] = useState(false);

  // SoundType切り替え
  const handleSoundSelect = (sound: SoundType) => {
    setSettings({
      ...settings,
      selectedSound: settings.selectedSound === sound ? null : sound,
    });
  };

  // SoundVolume切り替え
  const handleVolumeChange = (volume: number) => {
    setSettings({ ...settings, volume });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Pomodoro Timer
            </h1>
            <p className="text-gray-600">Stay productive with smart breaks</p>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <SettingsIcon className="text-gray-600" />
          </button>
        </div>

        <div className="grid gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <Timer
              timeLeft={timeLeft}
              isActive={isActive}
              mode={mode}
              onToggle={toggleTimer}
              onReset={resetTimer}
              onSwitch={switchMode}
            />
          </div>

          {/*Settingの表示非表示 */}
          {showSettings ? (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Settings
              </h2>
              <SettingsPanel
                settings={settings}
                onSettingsChange={setSettings}
              />
            </div>
          ) : (
            <>
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Sound Type
                </h2>
                <SoundControl
                  volume={settings.volume}
                  selectedSound={settings.selectedSound}
                  onVolumeChange={handleVolumeChange}
                  onSoundSelect={handleSoundSelect}
                />
              </div>

              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Today's Progress
                </h2>
                <Stats stats={stats} />
              </div>
            </>
          )}

          {/* break時のStretch推奨 */}
          {mode === "break" && (
            <div className="bg-yellow-50 rounded-xl p-6 text-center">
              <h3
                className="text-lg font-medium text-yellow-900 mb-2
            flex items-center justify-center"
              >
                Time for a Quick Stretch
                <AccessibilityNewIcon />
              </h3>
              <p className="text-yellow-700">
                Stand up, stretch your arms, and take a short walk around.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
