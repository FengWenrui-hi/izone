import React from 'react';
import { RibbonBowMark } from './EditorialMotifs';

const TEAM_MEMBERS = [
  {
    name: 'Baek Juyeon',
    role: '심층 조사 (In-depth research)',
    note: '자료 수집, 나무위키·공식 출처 교차 검증 및 엔티티·관계 범위 정리.',
  },
  {
    name: 'Bong Munye',
    role: '발표 자료 제작 (Presentation materials)',
    note: '시각 자료 구성, 프로젝트 프레임 설계 및 문서화.',
  },
  {
    name: 'Shim Yerin',
    role: '발표 (Presentation)',
    note: '연구 내용 종합 정리 및 최종 발표 진행.',
  },
  {
    name: 'Yu Sara',
    role: '발표 자료 제작 (Presentation materials)',
    note: '지식 그래프 시각화 자료 및 아카이브 레이아웃 구성.',
  },
];

const DELIVERABLES = [
  'Neo4j 지식 그래프 데이터베이스',
  '지식 그래프 시각화',
  '프로젝트 공개 웹페이지',
  '최종 연구 보고서',
];

export function TeamDeliverablesSection() {
  return (
    <>
      {/* Team Section */}
      <section id="team" className="bg-[#FAF6F0] border-b border-[#EBDCE0] py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="max-w-xl mx-auto text-center mb-12">
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#6E565E] mb-3">
              06 · 팀 소개 및 역할
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#B85A74]">
              프로젝트 참여자 및 역할 분담
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
                  <p className="text-xs font-medium text-[#AD4664] mt-1">{member.role}</p>
                  <p className="text-sm text-[#6E565E] leading-relaxed mt-4">{member.note}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Soft Periwinkle Deliverables Strip */}
      <footer className="bg-[#EDF0FC] border-b border-[#C8D3F0] py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 text-center">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#4A5B8C] mb-6">
            프로젝트 주요 산출물 및 출처 · Namuwiki &amp; 공식 활동 기록
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 mb-8">
            {DELIVERABLES.map((item) => (
              <span
                key={item}
                className="font-serif text-xl sm:text-2xl text-[#B85A74] font-medium"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="border-t border-[#C8D3F0] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4A5B8C]">
            <span>IZ*ONE Activity Network · 데뷔 전부터 해체 후까지 정적 지식 그래프 아카이브</span>
            <nav aria-label="하단 섹션 이동" className="flex items-center gap-6">
              <a href="#home" className="hover:underline underline-offset-4">
                맨 위로
              </a>
              <a href="#overview" className="hover:underline underline-offset-4">
                개요
              </a>
              <a href="#graph" className="hover:underline underline-offset-4">
                지식 그래프
              </a>
              <a href="#explorer" className="hover:underline underline-offset-4">
                아카이브
              </a>
              <a href="#findings" className="hover:underline underline-offset-4">
                연구 결과
              </a>
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
