import { useSettingStore } from "@/contexts/setting.store";
import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";

const AudioProvider = () => {
  const { volume, volumeRange } = useSettingStore((state) => ({
    volume: state.selectedVolumeIndex,
    volumeRange: state.volumeRange,
  }));
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = +(volumeRange[volume] / 100).toFixed(1);
    }
  }, [volume, volumeRange]);

  return <audio ref={audioRef} />;
};

export default AudioProvider;
