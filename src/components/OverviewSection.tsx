import React from 'react';
import { RibbonBowMark, ResilientImage } from './EditorialMotifs';

const RESEARCH_QUESTIONS = [
  {
    number: '01',
    title: 'Career-Path Diversification',
    question:
      'After IZ*ONE disbanded, how did members’ career paths develop across solo activities, redebuting in groups, acting, and other entertainment fields?',
  },
  {
    number: '02',
    title: 'Post-Disbandment Connections',
    question:
      'Through which shared activities (television programs, radio, magazines, performances, or public content) did members encounter or appear together after disbandment?',
  },
  {
    number: '03',
    title: 'Produce 48 Unit Participation',
    question:
      'Which members participated in the same competition units during Produce 48, and how does the dataset reflect unit co-membership?',
  },
];

export function OverviewSection() {
  return (
    <section id="overview" className="bg-[#FAF6F0] border-b border-[#EBDCE0] py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Editorial Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#6E565E] mb-3">
            01 · Project Overview
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#B85A74] leading-tight"
            style={{ textWrap: 'balance' }}
          >
            Background, Scope & Research Questions
          </h2>
          <div className="mt-4 flex justify-center">
            <RibbonBowMark className="w-7 h-5" strokeColor="#C65B7A" />
          </div>
        </div>

        {/* Background + Objective + Still Life Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h3 className="font-serif text-2xl font-medium text-[#3B282E] mb-3">
                Project Background & Objective
              </h3>
              <p className="text-base text-[#3B282E] leading-relaxed first-letter:text-5xl first-letter:font-serif first-letter:font-medium first-letter:float-left first-letter:mr-3 first-letter:mt-0.5 first-letter:text-[#B85A74]">
                IZ*ONE was a project girl group whose twelve members pursued distinct
                trajectories after disbandment—including solo music careers, redebuting in
                new idol groups, acting, and varied broadcast work. This study constructs a
                Neo4j knowledge graph mapping those trajectories alongside organizational
                affiliations and competition-unit histories.
              </p>
              <p className="text-base text-[#6E565E] leading-relaxed mt-4">
                By visualizing relationships across agencies, idol groups, Produce 48
                performance units, and post-disbandment appearances, the archive explores
                how career paths diversified and where members continued to intersect in
                documented public activities.
              </p>
            </div>

            {/* Scope & Exclusions Grid */}
            <div className="border-t border-[#EBDCE0] pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#AD4664] mb-2">
                  Included Scope
                </p>
                <dl className="space-y-2.5 text-sm text-[#3B282E]">
                  <div>
                    <dt className="font-medium text-[#3B282E]">Subjects</dt>
                    <dd className="text-[#6E565E]">All 12 former IZ*ONE members (C01–C12)</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-[#3B282E]">Time Frame</dt>
                    <dd className="text-[#6E565E]">
                      From Produce 48 broadcast (June 15, 2018) through data collection
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-[#3B282E]">Tracked Entities</dt>
                    <dd className="text-[#6E565E]">
                      Agencies, pre/post-disbandment groups, redebuts, competition units, and
                      official public activities
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#4A5B8C] mb-2">
                  Exclusions & Inclusion Principle
                </p>
                <dl className="space-y-2.5 text-sm text-[#3B282E]">
                  <div>
                    <dt className="font-medium text-[#3B282E]">Excluded Data</dt>
                    <dd className="text-[#6E565E]">
                      Album and song discography metadata, group member positions, and private
                      personal relationships
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-[#3B282E]">Inclusion Principle</dt>
                    <dd className="text-[#6E565E]">
                      Only documented, official activities with public evidence relevant to the
                      network are recorded; unverified claims are excluded
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>

          {/* Right Curatorial Flatlay */}
          <div className="lg:col-span-5">
            <figure className="bg-[#FDFBF7] border border-[#EBDCE0] p-4">
              <div className="aspect-[4/3] overflow-hidden bg-[#FAF6F0]">
                <ResilientImage
                  src="/src/assets/images/methodology_studio_flatlay_1795424054993.jpg"
                  alt="Archival blush and periwinkle notebooks with cream index cards and brass pen"
                  fallbackTitle="Archival Dossier System"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs font-serif italic text-[#6E565E]">
                Fig. 1 — Structured taxonomy separating entity categories before Neo4j ingestion.
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Three Research Questions Row */}
        <div className="border-t border-[#EBDCE0] pt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#6E565E]">
                Core Inquiry
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B282E] mt-1">
                Three Research Questions
              </h3>
            </div>
            <p className="text-xs text-[#6E565E]">
              Grounded in Cypher queries executed on the exported graph
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {RESEARCH_QUESTIONS.map((item) => (
              <article
                key={item.number}
                className="bg-[#FDFBF7] border border-[#EBDCE0] p-7 flex flex-col justify-between"
              >
                <div>
                  <p className="font-mono text-xs text-[#AD4664] tabular-nums mb-3">
                    Question {item.number}
                  </p>
                  <h4 className="font-serif text-xl font-semibold text-[#3B282E] mb-3">
                    {item.title}
                  </h4>
                  <p className="text-sm text-[#6E565E] leading-relaxed">{item.question}</p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#EBDCE0]/70">
                  <a
                    href="#findings"
                    className="text-xs font-medium text-[#AD4664] hover:underline underline-offset-4"
                  >
                    Inspect dataset result &rarr;
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
