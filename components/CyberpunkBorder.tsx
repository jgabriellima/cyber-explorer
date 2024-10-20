"use client"
import React from "react";

export default function CyberpunkBorder() {
    return <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
            d="M0,2 L2,0 L98,0 L100,2 L100,98 L98,100 L2,100 L0,98 Z"
            fill="none"
            stroke="#00ffff"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
        />
        <path
            d="M0,4 L4,0 M96,0 L100,4 M100,96 L96,100 M4,100 L0,96"
            stroke="#00ffff"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
        />
        <path
            d="M20,0 L22,2 L78,2 L80,0 M100,20 L98,22 L98,78 L100,80 M80,100 L78,98 L22,98 L20,100 M0,80 L2,78 L2,22 L0,20"
            stroke="#00ffff"
            strokeWidth="0.5"
            vectorEffect="non-scaling-stroke"
        />
    </svg>
}
