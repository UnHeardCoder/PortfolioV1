import Background from "~/components/Background";
import Portfolio from "~/components/Portfolio";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="absolute inset-0">
        <Background />
      </div>
      <div className="relative flex flex-col items-center pt-4 sm:pt-0 sm:justify-center min-h-screen pointer-events-none">
        <Portfolio />
      </div>
    </div>
  );
}
