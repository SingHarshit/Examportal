import React, { useEffect, useRef } from "react";

const Full: React.FC<{ examEnded: boolean }> = ({ examEnded }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  let stream: MediaStream | null = null;

  useEffect(() => {
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    const enableFullScreen = () => {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      }
    };

    if (!examEnded) {
      startCamera();
      enableFullScreen();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop()); // Stop camera when unmounted
      }
    };
  }, [examEnded]);

  return (
    <div className="webcam-container">
      <video ref={videoRef} autoPlay playsInline></video>
    </div>
  );
};

export default Full;
