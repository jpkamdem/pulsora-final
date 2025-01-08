import { useNavigate } from "react-router-dom";
import animatedPulsora from "../assets/logopulsora-v2.mp4";

export default function VideoWithButton() {
  const navigate = useNavigate();

  const handleEnter = () => {
    setTimeout(() => {
      navigate("/home");
    }, 0);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <video
        autoPlay
        loop
        muted
        className="w-3/4 max-w-lg rounded-lg shadow-lg"
      >
        <source src={animatedPulsora} type="video/mp4" />
        Votre navigateur ne supporte pas la lecture vidéo.
      </video>

      <button
        onClick={handleEnter}
        className="mt-8 px-6 py-3 text-white bg-blue-900 rounded-lg shadow hover:bg-blue-800 transition"
      >
        Entrez
      </button>
    </div>
  );
}
