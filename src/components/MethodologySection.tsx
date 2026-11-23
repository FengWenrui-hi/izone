import React from 'react';
import {
  ENTITY_META,
  EntityLabelKr,
  RELATIONSHIP_META,
  RelationshipLabelKr,
  RawNeo4jNode,
  RawNeo4jRelationship,
} from '../data/neo4jGraph';
import { RibbonBowMark } from './EditorialMotifs';

interface MethodologyProps {
  nodes: RawNeo4jNode[];
  relationships: RawNeo4jRelationship[];
}

const STEPS = [
  {
    step: 'Step 01',
    bowColor: '#D59C5C',
    title: '자료 수집 및 교차 검증',
    body: '나무위키(Namuwiki)를 기초 출처로 삼고 가능한 한 공식 소속사·방송 자료를 우선 확인하여 미확인 정보를 배제했으며, 한국어 명칭과 공식 그룹·소속사 표기로 통일했습니다.',
  },
  {
    step: 'Step 02',
    bowColor: '#C65B7A',
    title: 'Neo4j 그래프 모델링',
    body: '인물·소속사·아이돌그룹·유닛·해체후활동 5개 노드 라벨과 소속되었다·재데뷔하였다·참여하였다·출연하였다·활동했었다·관리된다 6개 관계 유형으로 그래프를 구성했습니다.',
  },
  {
    step: 'Step 03',
    bowColor: '#6C7FC0',
    title: '데이터 범위 및 원본 대조',
    body: '연구 제안서 기준 126건의 활동 관련 레코드가 계획되었으나, 본 정적 웹페이지는 제공된 Neo4j JSON 추출본(원본 43개 노드, 47개 관계)만을 단일 진실 공급원으로 표시합니다.',
  },
];

const ENTITY_ANCHORS: Record<EntityLabelKr, string> = {
  인물: '#catalog-people',
  소속사: '#catalog-agencies',
  아이돌그룹: '#catalog-groups',
  유닛: '#catalog-units',
  해체후활동: '#catalog-activities',
};

const ENTITY_DESC_KR: Record<EntityLabelKr, string> = {
  인물: '전 IZ*ONE 멤버 12인 (원본 내보내기 중복 노드 #42 포함 시 13건)',
  소속사: '멤버 소속 또는 아이돌 그룹 관리를 담당하는 연예 기획사',
  아이돌그룹: 'IZ*ONE 활동 전후 소속 및 재데뷔 아이돌 그룹',
  유닛: '프로듀스 48 경연 과정에서 결성된 팀 유닛',
  해체후활동: '예능, 라디오, 화보 등 공식 기록이 확인된 해체 후 공개 활동',
};

const REL_DESC_KR: Record<RelationshipLabelKr, string> = {
  소속되었다: '멤버와 연예 기획사 간의 소속 관계',
  재데뷔하였다: '멤버의 해체 후 타 아이돌 그룹 재데뷔 관계',
  참여하였다: '프로듀스 48 경연 유닛 참여 관계',
  출연하였다: '해체 후 방송·라디오·화보 등 공개 활동 출연 관계',
  활동했었다: '데뷔 전후 또는 병행 활동 그룹 이력',
  관리된다: '아이돌 그룹과 해당 그룹을 운영하는 소속사 간 관리 관계',
};

export function MethodologySection({ nodes, relationships }: MethodologyProps) {
  const entityCounts = (Object.keys(ENTITY_META) as EntityLabelKr[]).map((label) => ({
    label,
    meta: ENTITY_META[label],
    count: nodes.filter((n) => n.labels.includes(label)).length,
  }));

  const relCounts = (Object.keys(RELATIONSHIP_META) as RelationshipLabelKr[]).map((label) => ({
    label,
    meta: RELATIONSHIP_META[label],
    count: relationships.filter((r) => r.label === label).length,
  }));

  return (
    <section id="methodology" className="stripe-editorial-bg border-b border-[#EBDCE0] py-20 lg:py-24">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
        {/* Framed Ivory Sheet inside Striped Editorial Band */}
        <div className="bg-[#FDFBF7] border border-[#EBDCE0] px-8 py-12 sm:px-12 sm:py-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#6E565E] mb-3">
              02 · 데이터 및 방법론
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#B85A74]">
              지식 그래프 구축 절차와 데이터 모델
            </h2>
            <p className="text-sm text-[#6E565E] mt-3 leading-relaxed">
              출처 검증 원칙, Neo4j 스키마 구조, 그리고 제공된 JSON 데이터베이스 파일 기준
              실제 노드·관계 수치를 그대로 반영한 정적 명세입니다.
            </p>
          </div>

          {/* 3-Step Workflow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-[#EBDCE0]">
            {STEPS.map((item) => (
              <div key={item.step} className="text-center flex flex-col items-center">
                <RibbonBowMark className="w-8 h-6 mb-4" strokeColor={item.bowColor} />
                <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#6E565E] mb-2">
                  {item.step}
                </p>
                <h3 className="font-serif text-xl font-semibold text-[#3B282E] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#6E565E] leading-relaxed max-w-xs">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Static Schema Breakdown Tables */}
          <div className="pt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Entity Categories Table */}
            <div>
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-serif text-2xl font-medium text-[#3B282E]">
                  엔티티 범주 (Nodes)
                </h3>
                <span className="text-xs font-mono text-[#6E565E] tabular-nums">
                  총 {nodes.length}개 추출 노드
                </span>
              </div>
              <div className="divide-y divide-[#EBDCE0] border-t border-b border-[#EBDCE0]">
                {entityCounts.map(({ label, meta, count }) => (
                  <a
                    key={label}
                    href={ENTITY_ANCHORS[label]}
                    className="py-3.5 px-2 flex items-center justify-between gap-4 hover:bg-[#FAF6F0] transition-colors group"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5 text-sm font-medium text-[#3B282E] group-hover:text-[#AD4664]">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: meta.color }}
                          aria-hidden="true"
                        />
                        <span>{meta.kr}</span>
                        <span className="text-[#6E565E] font-normal">· {meta.en}</span>
                      </div>
                      <p className="text-xs text-[#6E565E] mt-0.5 pl-5">{ENTITY_DESC_KR[label]}</p>
                    </div>
                    <span className="font-mono text-sm font-medium text-[#3B282E] tabular-nums shrink-0">
                      {count}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Relationship Types Table */}
            <div>
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-serif text-2xl font-medium text-[#3B282E]">
                  관계 유형 (Relationships)
                </h3>
                <span className="text-xs font-mono text-[#6E565E] tabular-nums">
                  총 {relationships.length}건 추출 엣지
                </span>
              </div>
              <div className="divide-y divide-[#EBDCE0] border-t border-b border-[#EBDCE0]">
                {relCounts.map(({ label, meta, count }) => (
                  <div
                    key={label}
                    className="py-3.5 px-2 flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-sm font-medium text-[#3B282E]">
                        <span>[:{meta.kr}]</span>
                        <span className="text-xs text-[#6E565E] font-normal">· {meta.en}</span>
                      </div>
                      <p className="text-xs text-[#6E565E] mt-0.5">{REL_DESC_KR[label]}</p>
                    </div>
                    <span className="font-mono text-sm font-medium text-[#3B282E] tabular-nums shrink-0">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
