import animatedPulsora from "../assets/logopulsora.mp4";

export default function VideoWithButton() {
  const handleEnter = () => {
    alert("Entrée dans l'application !");
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
        className="mt-8 px-6 py-3 text-white bg-blue-900 rounded-lg shadow hover:  transition"
      >
        Entrer
      </button>
    </div>
  );
}
