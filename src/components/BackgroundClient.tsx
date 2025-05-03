"use client";
import dynamic from "next/dynamic";
import type Background from "./Background";

const BackgroundDynamic = dynamic(() => import("./Background"), { ssr: false });

export default function BackgroundClient(props: React.ComponentProps<typeof BackgroundDynamic>) {
  return <BackgroundDynamic {...props} />;
} 