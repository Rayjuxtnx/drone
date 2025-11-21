
'use client';
import { cn } from '@/lib/utils';
import React from 'react';

export function NavigationalMap() {
  return (
    <div className="absolute inset-0 bg-black overflow-hidden">
      <style jsx>{`
        .map-grid {
          stroke: hsl(var(--primary) / 0.1);
          stroke-width: 0.5px;
        }
        .map-land {
          fill: hsl(var(--primary) / 0.05);
          stroke: hsl(var(--primary) / 0.3);
          stroke-width: 0.7px;
        }
        .scanner-line {
          stroke: hsl(var(--primary));
          stroke-width: 1.5px;
          filter: drop-shadow(0 0 5px hsl(var(--primary)));
          animation: scan 8s linear infinite;
        }
        .pulse {
          fill: hsl(var(--primary));
          stroke: white;
          stroke-width: 2px;
          animation: pulse 2s infinite;
          transform-origin: center;
        }
        @keyframes scan {
          0% {
            transform: translateY(-10%);
          }
          100% {
            transform: translateY(110%);
          }
        }
        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          70% {
            transform: scale(2.5);
            opacity: 0;
          }
          100% {
            opacity: 0;
          }
        }
      `}</style>
      <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1000 500">
        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" className="map-grid" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Simplified world map path */}
        <path
          className="map-land"
          d="M499.9999,0.0001 C499.9999,0.0001 445,62 403,58 C361,54 349,78 316,95 C283,112 254,121 229,132 C204,143 189,168 163,172 C137,176 115,161 88,162 C61,163 44,180 28,198 C12,216 -1,231 -1,231 L-1,348 L1000,348 L1000,0 L499.9999,0.0001 Z M18,252 C28,245 42,243 51,248 C60,253 66,263 61,273 C56,283 45,287 35,282 C25,277 19,267 24,257 C25.5,254 18,252 18,252 Z M869,63 C859,71 853,82 856,92 C859,102 868,109 878,106 C888,103 895,93 892,83 C889,73 879,66 869,63 Z M220,314 C210,322 204,333 207,343 C210,353 219,360 229,357 C239,354 246,344 243,334 C240,324 230,317 220,314 Z"
        />
        
        {/* Scanner Line */}
        <line x1="0" y1="0" x2="1000" y2="0" className="scanner-line" />

        {/* Pulsing Dots */}
        <circle cx="316" cy="95" r="5" className="pulse" style={{ animationDelay: '0s' }} />
        <circle cx="163" cy="172" r="5" className="pulse" style={{ animationDelay: '0.5s' }} />
        <circle cx="800" cy="150" r="5" className="pulse" style={{ animationDelay: '1s' }} />
        <circle cx="550" cy="250" r="5" className="pulse" style={{ animationDelay: '1.5s' }} />
        
        {/* Overlay text */}
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="hsl(var(--primary) / 0.4)" fontSize="100" fontWeight="bold" letterSpacing="10">
          SCANNING
        </text>
      </svg>
    </div>
  );
}
