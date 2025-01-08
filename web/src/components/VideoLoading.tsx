import animatedPulsora from "../assets/logopulsora-v2.mp4";

export default function VideoLoading() {
  return (
    <div className="border-t-white">
      <video autoPlay loop muted>
        <source src={animatedPulsora} />
      </video>
    </div>
  );
}
