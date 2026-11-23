import React, { useState } from 'react';

export function RibbonBowMark({
  className = 'w-7 h-5',
  strokeColor = '#D27A93',
}: {
  className?: string;
  strokeColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 48 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M24 14C20 8 11 4 7 9C3.5 13.5 10 20 20 16.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M24 14C28 8 37 4 41 9C44.5 13.5 38 20 28 16.5"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.5 16.5L15 27M25.5 16.5L33 27"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="24" cy="14.5" r="2.6" stroke={strokeColor} strokeWidth="1.5" fill="#FDFBF7" />
    </svg>
  );
}

export function ScallopedArchivalSeal({ className = '' }: { className?: string }) {
  // 20-scallop delicate rosette stamp inspired by editorial archival seals
  const points = 20;
  const outerR = 46;
  const innerR = 41;
  const cx = 50;
  const cy = 50;
  let d = '';

  for (let i = 0; i < points; i++) {
    const a1 = (i / points) * Math.PI * 2;
    const aMid = ((i + 0.5) / points) * Math.PI * 2;
    const a2 = ((i + 1) / points) * Math.PI * 2;
    const x1 = cx + innerR * Math.cos(a1);
    const y1 = cy + innerR * Math.sin(a1);
    const xCtrl = cx + outerR * Math.cos(aMid);
    const yCtrl = cy + outerR * Math.sin(aMid);
    const x2 = cx + innerR * Math.cos(a2);
    const y2 = cy + innerR * Math.sin(a2);
    if (i === 0) {
      d += `M ${x1.toFixed(2)} ${y1.toFixed(2)} `;
    }
    d += `Q ${xCtrl.toFixed(2)} ${yCtrl.toFixed(2)} ${x2.toFixed(2)} ${y2.toFixed(2)} `;
  }
  d += 'Z';

  return (
    <div
      className={`relative w-28 h-28 flex items-center justify-center select-none ${className}`}
      aria-label="Archival Scope: Produce 48 to Post-Disbandment"
    >
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-sm">
        <path d={d} fill="#FDFBF7" stroke="#EBDCE0" strokeWidth="1" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-3">
        <span className="text-[9px] tracking-[0.18em] uppercase font-medium text-[#6E565E] leading-tight">
          Produce 48
        </span>
        <span className="text-[11px] font-serif italic font-semibold text-[#AD4664] my-0.5">
          IZ*ONE
        </span>
        <span className="text-[9px] tracking-[0.16em] uppercase font-medium text-[#6E565E] leading-tight">
          Network
        </span>
      </div>
    </div>
  );
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
}) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#F9E3EA] via-[#FAF6F0] to-[#E6EBF9] text-center p-8 ${className}`}
        role="img"
        aria-label={alt}
      >
        <RibbonBowMark className="w-10 h-7 mb-3" />
        <p className="font-serif text-xl text-[#3B282E]">{fallbackTitle}</p>
        <p className="text-xs text-[#6E565E] mt-1 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setErrored(true)}
      className={className}
    />
  );
}
