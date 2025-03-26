import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import animatedPulsora from "../assets/logopulsora-v2.mp4";

export default function VideoWithAutoEnter() {
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);

      setTimeout(() => {
        navigate("/home");
      }, 500); 
    }, 4900); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center min-h-screen bg-white transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}>
      <video autoPlay loop muted className="w-80 h-80 object-cover rounded-lg object-[center_-10px]">
        <source src={animatedPulsora} type="video/mp4" />
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>
    </div>
  );
}
