"use client"
import React from 'react'

export default function Sidebar() {
  return (
    <div className="w-[10%] bg-[rgba(26,26,26,0.7)] p-4 futuristic-border animate-fade-in flex flex-col overflow-y-auto column-height cyberpunk-scrollbar">
      <div className="flex-1 overflow-y-auto space-y-2">
        {[...Array(20)].map((_, i) => (
          <div key={i}
               className="bg-[rgba(42,42,42,0.7)] p-2 hover:bg-[rgba(58,58,58,0.7)] transition-colors cursor-pointer animate-fade-in"
               style={{animationDelay: `${i * 100}ms`}}>
            <div className="flex items-center justify-center">
              <div className="w-[105px] h-[148px] bg-[rgba(0,255,255,0.2)] flex flex-col items-center justify-center text-xs relative overflow-hidden thumbnail-hover">
                <div className="absolute inset-0 backdrop-blur-[1px]"></div>
                <div className="z-10 text-white font-semibold mb-auto p-2">PDF</div>
                <div className="z-10 text-white text-[10px] mt-auto p-1 bg-[rgba(0,0,0,0.5)] w-full text-center">
                  Página {i + 1}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}