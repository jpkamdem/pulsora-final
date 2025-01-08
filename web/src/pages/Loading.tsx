import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import animatedPulsora from "../assets/logopulsora-v2.mp4";

export default function VideoWithAutoEnter() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 4900);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center min-h-screen bg-white">
      <video
        autoPlay
        loop
        muted
        className="w-3/4 max-w-lg rounded-lg shadow-lg"
      >
        <source src={animatedPulsora} type="video/mp4" />
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>
    </div>
  );
}
