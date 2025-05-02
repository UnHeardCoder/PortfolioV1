"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Github, Mail, Linkedin, ExternalLink, MapPin } from "lucide-react";
import { cn } from "../lib/utils";

export default function Portfolio() {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="relative w-full max-w-md mx-auto overflow-hidden rounded-xl pointer-events-none"
    >
      {/* Card content */}
      <div className="relative backdrop-blur-sm bg-white/70 dark:bg-black/50 p-6 border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ben Lundy</h2>
            <p className="text-orange-500 font-medium">Junior Developer</p>
            <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>Tillsonburg, ON</span>
            </div>
          </div>
          <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-orange-500 pointer-events-auto transition-transform hover:scale-105">
            <img src="/placeholder.svg?height=64&width=64" alt="Profile" className="h-full w-full object-cover" />
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Passionate developer with 5+ years of experience building modern web applications. Focused on creating
          intuitive, accessible, and performant user experiences.
        </p>

        {/* Skills */}
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {["React", "Next.js", "Tailwind CSS", "HTML", "CSS", "JavaScript", "Python", "GitHub", "VSCode"].map((skill) => (
              <span
                key={skill}
                className={cn(
                  "text-xs px-2 py-1 rounded-full",
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
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Featured Projects</h3>
          <div className="space-y-2">
            {[
              { name: "E-commerce Platform", desc: "Full-stack Next.js application" },
              { name: "AI Dashboard", desc: "Data visualization tool" },
            ].map((project, i) => (
              <div
                key={i}
                className="group flex justify-between items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors pointer-events-auto"
              >
                <div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white">{project.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{project.desc}</p>
                </div>
                <a
                  href="#"
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500 hover:text-orange-600"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Links */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            {[
              { icon: <Mail className="h-5 w-5" />, href: "mailto:Blundy52@gmail.com", label: "Email" },
              { icon: <Github className="h-5 w-5" />, href: "https://github.com/UnHeardCoder", label: "GitHub" },
              { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/ben-lundy-0834761a4", label: "LinkedIn" },
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                aria-label={link.label}
                className="p-2 rounded-full text-gray-600 hover:text-orange-500 dark:text-gray-400 dark:hover:text-orange-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors pointer-events-auto"
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