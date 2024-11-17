import { useEffect, useRef } from "react";
import { SoundType } from "../types/timer";

const SOUND_URLS = {
  rain: "./assets/sounds/rain.mp3",
  waves: "./assets/sounds/waves.mp3",
  cafe: "./assets/sounds/cafe.mp3",
};

export const useSound = (selectedSound: SoundType | null, volume: number) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (selectedSound) {
      // selectedSound が指定された場合
      if (!audioRef.current) {
        // 初めて音を再生する場合にのみ Audio インスタンスを生成
        audioRef.current = new Audio(SOUND_URLS[selectedSound]);
        audioRef.current.loop = true; // 音声をループ再生
      }

      // 音声のソースと音量を設定
      audioRef.current.src = SOUND_URLS[selectedSound];
      audioRef.current.volume = volume;

      // 再生
      audioRef.current.play();
    } else if (audioRef.current) {
      // selectedSound が null の場合（音声の選択解除）
      audioRef.current.pause();
    }

    // クリーンアップ処理：コンポーネントのアンマウント時または依存関係が変化した時に実行される
    return () => {
      if (audioRef.current) {
        audioRef.current.pause(); // 音声を停止
      }
    };
  }, [selectedSound, volume]); // selectedSound と volume が変更された時に実行される

  return audioRef; // audioRef を返す
};
