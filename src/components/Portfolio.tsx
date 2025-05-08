import type React from "react";
import { Github, Mail, Linkedin, ExternalLink, MapPin } from "lucide-react";
import { cn } from "../lib/utils";
import Link from "next/link";
import Image from "next/image";

export default function Portfolio() {
  return (
    <div className="relative w-full max-w-2xl mx-auto overflow-hidden rounded-xl pointer-events-none p-4 sm:p-6 mt-4 sm:mt-0">
      {/* Card content */}
      <div className="relative backdrop-blur-sm bg-white/70 dark:bg-black/50 p-4 sm:p-8 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white pointer-events-auto">Ben Lundy</h2>
            <p className="text-lg sm:text-xl text-orange-500 font-medium pointer-events-auto">Junior Developer</p>
            <div className="flex items-center mt-1 sm:mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400 pointer-events-auto">
              <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              <span>Tillsonburg, ON</span>
            </div>
          </div>
          <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full overflow-hidden border-2 border-orange-500 pointer-events-auto transition-transform hover:scale-105">
            <Image src="/images/portfoliopic.png" alt="Profile" className="h-full w-full object-cover" width={96} height={96}/>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 pointer-events-auto">
          Welcome! I&apos;m Ben, a web developer building a strong foundation in modern
          web technologies. I&apos;m driven by a deep interest in learning how things work
          and a determination to translate that knowledge into functioning code. This
          portfolio represents the start of my professional journey, crafted to showcase 
          my current abilities and my commitment to continuous improvement and delivering 
          quality results from day one. I&apos;m ready to contribute.
        </p>

        {/* Skills */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 pointer-events-auto">Skills</h3>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["React", "Next.js", "Tailwind CSS", "HTML", "CSS", "JavaScript", "Python", "GitHub", "VSCode"].map((skill) => (
              <span
                key={skill}
                className={cn(
                  "text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full",
                  "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
                  "transition-transform hover:scale-105",
                  "cursor-default",
                  "pointer-events-auto"
                )}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 pointer-events-auto">Featured Projects</h3>
          <div className="space-y-2 sm:space-y-3">
            {[
              { name: "Portfolio", desc: "This is the portfolio you are currently viewing", href: "https://benlundyportfolio.netlify.app/" },
              { name: "Steam item tracker", desc: "A simple app to track the price of items on Steam", href: "https://steam-item-tracker-app-v1-2sz471r8v-unheardcoders-projects.vercel.app/?selectedItem=1" },
              { name: "Next Project", desc: "coming soon", href: "/ComingSoon" },
            ].map((project, i) => (
              <div
                key={i}
                className="group flex justify-between items-center p-2 sm:p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors pointer-events-auto"
              >
                <div>
                  <h4 className="text-sm sm:text-base font-medium text-gray-900 dark:text-white">{project.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{project.desc}</p>
                </div>
                <Link
                  href={project.href}
                  aria-label={`View project: ${project.name}`}
                  className="sm:opacity-0 sm:group-hover:opacity-100 transition-opacity text-orange-500 hover:text-orange-600"
                >
                  <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Links */}
        <div className="pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            {[
              { icon: <Mail className="h-5 w-5 sm:h-6 sm:w-6" />, href: "mailto:Blundy52@gmail.com", label: "Email" },
              { icon: <Github className="h-5 w-5 sm:h-6 sm:w-6" />, href: "https://github.com/UnHeardCoder", label: "GitHub" },
              { icon: <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />, href: "https://linkedin.com/in/ben-lundy-0834761a4", label: "LinkedIn" },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                aria-label={link.label}
                className="p-2 sm:p-3 rounded-full text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors pointer-events-auto"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 