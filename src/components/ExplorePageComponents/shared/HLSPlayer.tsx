"use client";
import { useEffect, useRef } from "react";
import Hls from "hls.js";

function HLSPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let hls: Hls | undefined;

    if (Hls.isSupported() && videoRef.current) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      hls.on(Hls.Events.MANIFEST_PARSED, function () {
        if (videoRef.current) {
          videoRef.current.play();
        }
      });
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src]);

  return <video ref={videoRef} controls className="w-full h-full" />;
}

export default HLSPlayer;
