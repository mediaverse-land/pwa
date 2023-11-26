"use client";
import { useRef } from "react";
import ReactHlsPlayer from "react-hls-player";
const HLSPlayer = ({ src }: { src: string }) => {
  const playerRef = useRef(null);
  return (
    <div className="w-full h-full">
      <ReactHlsPlayer
        src={src}
        playerRef={playerRef}
        autoPlay={false}
        controls
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export default HLSPlayer;
