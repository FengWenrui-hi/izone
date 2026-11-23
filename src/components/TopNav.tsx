import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Overview', href: '#overview' },
  { label: 'Methodology', href: '#methodology' },
  { label: 'Graph', href: '#graph' },
  { label: 'Explorer', href: '#explorer' },
  { label: 'Findings', href: '#findings' },
];

export function TopNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-sm border-b border-[#EBDCE0]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line brand wordmark */}
        <a
          href="#home"
          className="font-serif text-xl lg:text-2xl font-semibold tracking-tight text-[#3B282E] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C65B7A]"
        >
          IZ*ONE Network
        </a>

        {/* Zone 2: Five concise single-line text links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#6E565E]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#AD4664] hover:underline underline-offset-4 decoration-[#D86C8A] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C65B7A]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#graph"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-medium tracking-wider uppercase bg-[#C65B7A] text-white hover:bg-[#AD4664] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B282E]"
          >
            Explore Graph
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#3B282E] hover:bg-[#F9E3EA]/60 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="md:hidden border-t border-[#EBDCE0] bg-[#FDFBF7] px-6 py-4 flex flex-col gap-3"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="py-2 text-sm font-medium text-[#3B282E] hover:text-[#AD4664] border-b border-[#EBDCE0]/50 last:border-none"
            >
              {item.label}
            </a>
          ))}
          <a
            href="#team"
            onClick={() => setMobileOpen(false)}
            className="py-2 text-sm font-medium text-[#3B282E] hover:text-[#AD4664]"
          >
            Team & Deliverables
          </a>
        </nav>
      )}
    </header>
  );
}
