import type React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface MapBackgroundProps {
  imageSrc?: string;
  children?: React.ReactNode;
  className?: string;
}

export function MapBackground({
  imageSrc,
  children,
  className,
}: MapBackgroundProps) {
  return (
    <div className={cn("absolute inset-0", className)}>
      <Image
        src={
          imageSrc ||
          "https://t4.ftcdn.net/jpg/12/16/81/63/360_F_1216816365_OphSydWSj2LsIwA3IQLWuX2AtlJSPFPk.jpg"
        }
        alt="Map background"
        layout="fill"
        objectFit="cover"
        priority
      />
      {children}
    </div>
  );
}
