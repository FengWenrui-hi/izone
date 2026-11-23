import React from 'react';

const NAV_ITEMS = [
  { label: '개요', href: '#overview' },
  { label: '데이터·방법론', href: '#methodology' },
  { label: '지식 그래프', href: '#graph' },
  { label: '활동 아카이브', href: '#explorer' },
  { label: '연구 결과', href: '#findings' },
];

export function TopNav() {
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
          aria-label="주요 섹션 이동"
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

        {/* Zone 3: Single primary anchor action */}
        <div className="flex items-center shrink-0">
          <a
            href="#team"
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-medium tracking-wider bg-[#C65B7A] text-white hover:bg-[#AD4664] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B282E]"
          >
            팀 및 산출물
          </a>
        </div>
      </div>

      {/* Compact single-row scrollable anchor bar on mobile (zero JS required) */}
      <nav
        aria-label="모바일 섹션 이동"
        className="md:hidden border-t border-[#EBDCE0] bg-[#FDFBF7] px-6 py-2 flex items-center gap-5 overflow-x-auto text-xs font-medium text-[#6E565E]"
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="py-1 hover:text-[#AD4664] whitespace-nowrap shrink-0"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
