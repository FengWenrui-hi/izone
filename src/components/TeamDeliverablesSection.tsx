import React from 'react';
import { RibbonBowMark } from './EditorialMotifs';

const TEAM_MEMBERS = [
  {
    name: 'Baek Juyeon',
    role: 'In-depth Research',
    note: 'Source collection, Namuwiki cross-verification, and entity-relationship scoping.',
  },
  {
    name: 'Bong Munye',
    role: 'Presentation Materials',
    note: 'Visual curation, project framing, and research documentation.',
  },
  {
    name: 'Shim Yerin',
    role: 'Presentation',
    note: 'Research synthesis, narrative delivery, and findings walkthrough.',
  },
  {
    name: 'Yu Sara',
    role: 'Presentation Materials',
    note: 'Knowledge-graph visual storytelling and archival layout materials.',
  },
];

const DELIVERABLES = [
  'Neo4j Knowledge Graph Database',
  'Knowledge Graph Visualization',
  'Public Presentation Website',
  'Final Project Report',
];

export function TeamDeliverablesSection() {
  return (
    <>
      {/* Team Section */}
      <section id="team" className="bg-[#FAF6F0] border-b border-[#EBDCE0] py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="max-w-xl mx-auto text-center mb-12">
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#6E565E] mb-3">
              06 · About the Team
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#B85A74]">
              Project Credits & Research Team
            </h2>
            <div className="mt-4 flex justify-center">
              <RibbonBowMark className="w-7 h-5" strokeColor="#C65B7A" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, index) => (
              <article
                key={member.name}
                className="bg-[#FDFBF7] border border-[#EBDCE0] p-7 flex flex-col justify-between"
              >
                <div>
                  <p className="font-mono text-xs text-[#6E565E] tabular-nums mb-3">
                    0{index + 1}
                  </p>
                  <h3 className="font-serif text-2xl font-medium text-[#3B282E]">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#AD4664] mt-1">
                    {member.role}
                  </p>
                  <p className="text-sm text-[#6E565E] leading-relaxed mt-4">{member.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Soft Periwinkle Deliverables Strip (inspired by bottom band in reference aesthetic) */}
      <footer className="bg-[#EDF0FC] border-b border-[#C8D3F0] py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 text-center">
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#4A5B8C] mb-6">
            Project Deliverables & Sources · Namuwiki &amp; Official Records
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-8">
            {DELIVERABLES.map((item) => (
              <span
                key={item}
                className="font-serif italic text-xl sm:text-2xl text-[#B85A74] font-medium"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="border-t border-[#C8D3F0] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4A5B8C]">
            <span>IZ*ONE Activity Network · Pre-debut to Post-disbandment Knowledge Graph</span>
            <nav aria-label="Footer links" className="flex items-center gap-6">
              <a href="#home" className="hover:underline underline-offset-4">
                Top
              </a>
              <a href="#overview" className="hover:underline underline-offset-4">
                Overview
              </a>
              <a href="#graph" className="hover:underline underline-offset-4">
                Graph
              </a>
              <a href="#explorer" className="hover:underline underline-offset-4">
                Explorer
              </a>
              <a href="#findings" className="hover:underline underline-offset-4">
                Findings
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
