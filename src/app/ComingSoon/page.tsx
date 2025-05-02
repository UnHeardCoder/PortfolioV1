import Image from "next/image";
import Background from "~/components/Background";
import Portfolio from "~/components/Portfolio";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <div className="absolute inset-0">
        <Background />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative backdrop-blur-sm bg-white/70 dark:bg-black/50 p-8 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg max-w-md w-full mx-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">Coming Soon</h2>
          <p className="text-gray-600 dark:text-gray-300 text-center">
            This project is currently under development. Check back later for updates!
          </p>
          <div className="mt-6 text-center">
            <a 
              href="/"
              className="inline-block px-6 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors pointer-events-auto"
            >
              Return Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}