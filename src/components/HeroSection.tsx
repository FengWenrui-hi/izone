import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { RibbonBowMark, ScallopedArchivalSeal, ResilientImage } from './EditorialMotifs';

interface HeroStats {
  distinctMembers: number;
  rawNodeCount: number;
  rawRelationshipCount: number;
  categoryCount: number;
}

export function HeroSection({ stats }: { stats: HeroStats }) {
  return (
    <section id="home" className="border-b border-[#EBDCE0]">
      {/* 50/50 Editorial Split Hero inspired by soft pastel magazine layout */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch relative">
        {/* Left Image Frame */}
        <div className="relative min-h-[340px] lg:min-h-[560px] bg-[#F9E3EA] overflow-hidden">
          <ResilientImage
            src="/src/assets/images/hero_editorial_archive_1795424054841.jpg"
            alt="Sunlit editorial archival notebook with blush silk ribbon and lavender roses"
            fallbackTitle="IZ*ONE Activity Archive"
            className="w-full h-full object-cover object-center lg:h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3B282E]/15 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Center Scalloped Archival Seal straddling seam on desktop */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <ScallopedArchivalSeal />
        </div>

        {/* Right Editorial Typography Panel */}
        <div className="bg-[#F2F4FC] px-8 py-14 sm:px-14 lg:px-20 lg:py-20 flex flex-col justify-center items-center text-center">
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#6E565E] mb-4">
            Produce 48 to Post-Disbandment · Neo4j Knowledge Graph
          </p>

          <h1
            className="font-serif font-medium text-[#B85A74] leading-[1.06] max-w-lg"
            style={{ fontSize: 'clamp(2.35rem, 4.2vw, 3.85rem)', textWrap: 'balance' }}
          >
            The Activity Network of IZ*ONE Members
          </h1>

          <div className="my-6 flex items-center justify-center">
            <RibbonBowMark className="w-8 h-6" strokeColor="#C65B7A" />
          </div>

          <p className="text-sm sm:text-base text-[#3B282E] leading-relaxed max-w-md mb-8">
            Tracing how all twelve members’ career paths, agency affiliations, idol group
            lineages, competition units, and public appearances evolved from pre-debut
            through post-disbandment.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#graph"
              className="inline-flex items-center justify-center px-7 py-3 text-xs font-medium tracking-[0.16em] uppercase bg-[#C65B7A] text-white hover:bg-[#AD4664] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B282E]"
            >
              Explore Knowledge Graph
            </a>
            <a
              href="#overview"
              className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-medium tracking-[0.12em] uppercase text-[#3B282E] hover:text-[#AD4664] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Read Scope</span>
              <ArrowDownRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Full-Width 4-Column Dataset Summary Strip (Source-of-Truth Metrics) */}
      <div className="bg-[#FDFBF7] border-t border-[#EBDCE0]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-[#EBDCE0]">
          <div className="pt-2 lg:pt-0 lg:pr-6">
            <p className="text-xs text-[#6E565E] mb-1">IZ*ONE Members Studied</p>
            <p className="font-serif text-3xl font-semibold text-[#3B282E] tabular-nums">
              {stats.distinctMembers}
              <span className="text-sm font-sans font-normal text-[#6E565E] ml-2">
                (C01–C12)
              </span>
            </p>
          </div>

          <div className="pt-2 lg:pt-0 lg:px-6">
            <p className="text-xs text-[#6E565E] mb-1">Exported Neo4j Nodes</p>
            <p className="font-serif text-3xl font-semibold text-[#3B282E] tabular-nums">
              {stats.rawNodeCount}
              <span className="text-sm font-sans font-normal text-[#6E565E] ml-2">
                raw records
              </span>
            </p>
          </div>

          <div className="pt-4 lg:pt-0 lg:px-6">
            <p className="text-xs text-[#6E565E] mb-1">Documented Relationships</p>
            <p className="font-serif text-3xl font-semibold text-[#3B282E] tabular-nums">
              {stats.rawRelationshipCount}
              <span className="text-sm font-sans font-normal text-[#6E565E] ml-2">
                graph edges
              </span>
            </p>
          </div>

          <div className="pt-4 lg:pt-0 lg:pl-6">
            <p className="text-xs text-[#6E565E] mb-1">Entity Schema Categories</p>
            <p className="font-serif text-3xl font-semibold text-[#3B282E] tabular-nums">
              {stats.categoryCount}
              <span className="text-sm font-sans font-normal text-[#6E565E] ml-2">
                node labels
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
