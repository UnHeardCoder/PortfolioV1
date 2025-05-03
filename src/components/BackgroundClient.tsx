"use client";
import dynamic from "next/dynamic";

const BackgroundDynamic = dynamic(() => import("./Background"), { ssr: false });

export default function BackgroundClient(props: React.ComponentProps<typeof BackgroundDynamic>) {
  return <BackgroundDynamic {...props} />;
} 