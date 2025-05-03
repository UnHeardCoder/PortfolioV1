import BackgroundClient from "../components/BackgroundClient";
import Portfolio from "~/components/Portfolio";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="absolute inset-0">
        <BackgroundClient />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="pointer-events-none">
          <Portfolio />
        </div>
      </div>
    </div>
  );
}
