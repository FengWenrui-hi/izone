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
      {/* 50/50 Editorial Split Hero */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 items-stretch relative">
        {/* Left Image Frame */}
        <div className="relative min-h-[340px] lg:min-h-[560px] bg-[#F9E3EA] overflow-hidden">
          <ResilientImage
            src="/src/assets/images/hero_editorial_archive_1795424054841.jpg"
            alt="연분홍 실크 리본과 라벤더 장미가 놓인 아카이브 연구 노트 정물 사진"
            fallbackTitle="IZ*ONE 활동 네트워크"
            className="w-full h-full object-cover object-center lg:h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#3B282E]/15 via-transparent to-transparent pointer-events-none" />
        </div>

        {/* Center Scalloped Archival Seal */}
        <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <ScallopedArchivalSeal />
        </div>

        {/* Right Editorial Typography Panel */}
        <div className="bg-[#F2F4FC] px-8 py-14 sm:px-14 lg:px-20 lg:py-20 flex flex-col justify-center items-center text-center">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#6E565E] mb-4">
            Produce 48 — Post-Disbandment · Neo4j Knowledge Graph
          </p>

          <h1
            className="font-serif font-medium text-[#B85A74] leading-[1.1] max-w-lg"
            style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.5rem)', textWrap: 'balance' }}
          >
            데뷔 전부터 해체 후까지, IZ*ONE 멤버들의 활동 네트워크
          </h1>

          <div className="my-6 flex items-center justify-center">
            <RibbonBowMark className="w-8 h-6" strokeColor="#C65B7A" />
          </div>

          <p className="text-sm sm:text-base text-[#3B282E] leading-relaxed max-w-md mb-8">
            아이즈원(IZ*ONE) 12인 멤버의 소속사, 아이돌 그룹, 프로듀스 48 경연 유닛,
            그리고 해체 이후 공개 활동이 시간에 따라 어떻게 다각화되고 다시 연결되었는지
            Neo4j 지식 그래프 데이터로 조망합니다.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#graph"
              className="inline-flex items-center justify-center px-7 py-3 text-xs font-medium tracking-[0.14em] bg-[#C65B7A] text-white hover:bg-[#AD4664] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3B282E]"
            >
              지식 그래프 도판 보기
            </a>
            <a
              href="#overview"
              className="inline-flex items-center gap-1.5 px-4 py-3 text-xs font-medium tracking-[0.1em] text-[#3B282E] hover:text-[#AD4664] transition-colors whitespace-nowrap shrink-0"
            >
              <span>연구 개요 읽기</span>
              <ArrowDownRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* Full-Width 4-Column Dataset Summary Strip */}
      <div className="bg-[#FDFBF7] border-t border-[#EBDCE0]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-6 grid grid-cols-2 lg:grid-cols-4 gap-6 divide-y lg:divide-y-0 lg:divide-x divide-[#EBDCE0]">
          <div className="pt-2 lg:pt-0 lg:pr-6">
            <p className="text-xs text-[#6E565E] mb-1">연구 대상 멤버</p>
            <p className="font-serif text-3xl font-semibold text-[#3B282E] tabular-nums">
              {stats.distinctMembers}명
              <span className="text-sm font-sans font-normal text-[#6E565E] ml-2">
                (C01–C12)
              </span>
            </p>
          </div>

          <div className="pt-2 lg:pt-0 lg:px-6">
            <p className="text-xs text-[#6E565E] mb-1">추출된 Neo4j 노드</p>
            <p className="font-serif text-3xl font-semibold text-[#3B282E] tabular-nums">
              {stats.rawNodeCount}개
              <span className="text-sm font-sans font-normal text-[#6E565E] ml-2">
                원본 레코드
              </span>
            </p>
          </div>

          <div className="pt-4 lg:pt-0 lg:px-6">
            <p className="text-xs text-[#6E565E] mb-1">기록된 관계 엣지</p>
            <p className="font-serif text-3xl font-semibold text-[#3B282E] tabular-nums">
              {stats.rawRelationshipCount}건
              <span className="text-sm font-sans font-normal text-[#6E565E] ml-2">
                방향성 연결
              </span>
            </p>
          </div>

          <div className="pt-4 lg:pt-0 lg:pl-6">
            <p className="text-xs text-[#6E565E] mb-1">엔티티 범주</p>
            <p className="font-serif text-3xl font-semibold text-[#3B282E] tabular-nums">
              {stats.categoryCount}종
              <span className="text-sm font-sans font-normal text-[#6E565E] ml-2">
                인물·소속사·그룹·유닛·활동
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
