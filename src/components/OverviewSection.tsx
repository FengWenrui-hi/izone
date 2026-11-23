import React from 'react';
import { RibbonBowMark, ResilientImage } from './EditorialMotifs';

const RESEARCH_QUESTIONS = [
  {
    number: '01',
    title: '진로 다각화 양상',
    question:
      'IZ*ONE 해체 이후 멤버들의 활동 경로는 솔로 음악 활동, 타 아이돌 그룹 재데뷔, 연기 및 방송 등 어떤 영역으로 분화되었는가?',
  },
  {
    number: '02',
    title: '해체 이후 재연결 지점',
    question:
      '방송 프로그램, 라디오, 잡지 화보, 공연 등 어떤 공식 공개 활동을 통해 멤버들이 해체 이후에도 다시 함께 출연하거나 접점을 형성했는가?',
  },
  {
    number: '03',
    title: '프로듀스 48 경연 유닛 참여',
    question:
      '프로듀스 48 경연 과정에서 어떤 멤버들이 동일한 경연 유닛에 함께 참여했으며, 데이터셋은 이를 어떻게 기록하고 있는가?',
  },
];

export function OverviewSection() {
  return (
    <section id="overview" className="bg-[#FAF6F0] border-b border-[#EBDCE0] py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Editorial Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#6E565E] mb-3">
            01 · 프로젝트 개요
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#B85A74] leading-tight"
            style={{ textWrap: 'balance' }}
          >
            연구 배경, 범위 및 핵심 연구 질문
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
                프로젝트 배경과 연구 목적
              </h3>
              <p className="text-base text-[#3B282E] leading-relaxed">
                아이즈원(IZ*ONE)은 활동 종료 후 12명의 멤버가 솔로 가수, 새 걸그룹 재데뷔,
                배우, 방송인 등 서로 다른 행보를 이어간 프로젝트 그룹입니다. 본 연구는 시기별
                활동 궤적과 조직 소속 변화가 어떻게 전개되었는지 살펴보기 위해 기획되었습니다.
              </p>
              <p className="text-base text-[#6E565E] leading-relaxed mt-4">
                12명 멤버와 연예 기획사, 아이돌 그룹, 프로듀스 48 경연 유닛, 그리고 해체 후
                공식 활동 간의 관계를 Neo4j 지식 그래프로 구축·시각화하여 진로 다각화와
                멤버 간 접점 지속 양상을 탐구합니다.
              </p>
            </div>

            {/* Scope & Exclusions Grid */}
            <div className="border-t border-[#EBDCE0] pt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-xs font-medium tracking-[0.14em] text-[#AD4664] mb-2">
                  연구 포함 범위
                </p>
                <dl className="space-y-2.5 text-sm text-[#3B282E]">
                  <div>
                    <dt className="font-medium text-[#3B282E]">연구 대상</dt>
                    <dd className="text-[#6E565E]">IZ*ONE 전 멤버 12인 (C01–C12)</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-[#3B282E]">대상 기간</dt>
                    <dd className="text-[#6E565E]">
                      프로듀스 48 첫 방송(2018년 6월 15일)부터 데이터 수집 시점까지
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-[#3B282E]">수집 항목</dt>
                    <dd className="text-[#6E565E]">
                      소속사, 데뷔 전후 그룹 소속, 재데뷔 정보, 해체 후 활동, 프로듀스 48 경연 유닛 참여
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <p className="text-xs font-medium tracking-[0.14em] text-[#4A5B8C] mb-2">
                  제외 항목 및 수집 원칙
                </p>
                <dl className="space-y-2.5 text-sm text-[#3B282E]">
                  <div>
                    <dt className="font-medium text-[#3B282E]">제외 데이터</dt>
                    <dd className="text-[#6E565E]">
                      음반·곡 단위 디스코그래피 정보, 팀 내 포지션, 사적인 개인 관계
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-[#3B282E]">활동 포함 원칙</dt>
                    <dd className="text-[#6E565E]">
                      공식적으로 확인 가능한 공개 활동만을 대상으로 하며, 연구 맥락과 무관하거나
                      공식 근거가 불충분한 항목은 제외
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
                  alt="연분홍과 페리윙클 블루 아카이브 노트, 인덱스 카드 및 황동 펜 정물"
                  fallbackTitle="아카이브 분류 체계"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="mt-3 text-xs font-serif italic text-[#6E565E]">
                Fig. 1 — Neo4j 적재 전 5대 엔티티 범주에 따라 정리된 아카이브 분류 구조.
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Three Research Questions Row */}
        <div className="border-t border-[#EBDCE0] pt-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#6E565E]">
                Core Inquiry
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B282E] mt-1">
                세 가지 연구 질문
              </h3>
            </div>
            <p className="text-xs text-[#6E565E]">
              제공된 Neo4j 데이터셋 내 Cypher 질의 결과에 근거하여 검토
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
                    데이터셋 기반 결과 보기 &rarr;
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
