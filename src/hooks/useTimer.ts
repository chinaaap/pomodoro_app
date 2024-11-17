import { useCallback, useEffect, useState } from "react";
import { Settings, TimerMode, TimerStats } from "../types/timer";
import { useLocalStorage } from "./useLocalStorage";
import { useSound } from "./useSound";

const DEFAULT_SETTINGS: Settings = {
  workDuration: 25 * 60,
  breakDuration: 5 * 60,
  volume: 0.5,
  selectedSound: null,
  posturePause: true,
};

export const useTimer = () => {
  const [mode, setMode] = useState<TimerMode>("work");
  const [timeLeft, setTimeLeft] = useState(DEFAULT_SETTINGS.workDuration);
  const [isActive, setIsActive] = useState(false);
  const [settings, setSettings] = useLocalStorage<Settings>(
    "pomodoro-settings",
    DEFAULT_SETTINGS
  );
  const [stats, setStats] = useLocalStorage<TimerStats>("pomodoro-stats", {
    dailySessions: 0,
    focusScore: 100,
    interruptions: 0,
    date: new Date().toISOString().split("T")[0],
  });

  useSound(settings.selectedSound, settings.volume);

  // resetTimer
  const resetTimer = useCallback(() => {
    setTimeLeft(
      mode === "work" ? settings.workDuration : settings.breakDuration
    );
    setIsActive(false);
  }, [mode, settings]);

  // toggleTimer
  const toggleTimer = () => {
    if (!isActive && timeLeft === 0) {
      resetTimer();
    }
    setIsActive(!isActive);
  };

  // work/break, timerの切り替え
  const switchMode = () => {
    const newMode = mode === "work" ? "break" : "work";
    setMode(newMode);
    setTimeLeft(
      newMode === "work" ? settings.workDuration : settings.breakDuration
    );
    setIsActive(false);
  };

  const updateStats = (type: "session" | "interruption") => {
    const today = new Date().toISOString().split("T")[0];

    // 現在の日付に基づいて、ユーザーの集中度（focusScore）、セッション数（dailySessions）、中断数（interruptions）を状態として更新
    setStats((prev) => {
      if (prev.date !== today) {
        return {
          dailySessions: type === "session" ? 1 : 0,
          focusScore: 100,
          interruptions: type === "interruption" ? 1 : 0,
          date: today,
        };
      }

      return {
        ...prev,
        dailySessions:
          type === "session" ? prev.dailySessions + 1 : prev.dailySessions,
        interruptions:
          type === "interruption" ? prev.interruptions + 1 : prev.interruptions,
        focusScore: Math.max(
          0,
          prev.focusScore - (type === "interruption" ? 5 : 0)
        ),
      };
    });
  };

  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      if (mode === "work") {
        updateStats("session");
        new Audio("./assets/sounds/notification.mp3").play();
      }
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  return {
    mode,
    timeLeft,
    isActive,
    settings,
    stats,
    toggleTimer,
    resetTimer,
    switchMode,
    setSettings,
    updateStats,
  };
};
