import React from 'react';
import {
  GENRE_GLOSS,
  ParsedGraphData,
  RawNeo4jNode,
} from '../data/neo4jGraph';

export function StaticEntityCatalog({ graphData }: { graphData: ParsedGraphData }) {
  const getConnections = (nodeId: string) => ({
    outgoing: graphData.relationships.filter((r) => r.start.id === nodeId),
    incoming: graphData.relationships.filter((r) => r.end.id === nodeId),
  });

  const people = graphData.nodes.filter((n) => n.labels.includes('인물'));
  const agencies = graphData.nodes.filter((n) => n.labels.includes('소속사'));
  const groups = graphData.nodes.filter((n) => n.labels.includes('아이돌그룹'));
  const units = graphData.nodes.filter((n) => n.labels.includes('유닛'));
  const activities = graphData.nodes.filter((n) => n.labels.includes('해체후활동'));

  const renderNodeCards = (nodes: RawNeo4jNode[], emptyLabel: string) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {nodes.map((node) => {
        const { outgoing, incoming } = getConnections(node.id);
        const total = outgoing.length + incoming.length;

        return (
          <article
            key={node.id}
            className="bg-[#FDFBF7] border border-[#EBDCE0] p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-[#6E565E] mb-2">
                <span className="font-mono">
                  #{node.id} · {node.properties.id}
                </span>
                <span className="font-mono tabular-nums">{total}건 연결</span>
              </div>

              <h4 className="font-serif text-2xl font-medium text-[#3B282E]">
                {node.properties.name}
              </h4>

              {(node.properties.데뷔년도 || node.properties.장르) && (
                <p className="text-xs text-[#6E565E] mt-1">
                  {node.properties.데뷔년도 && `데뷔년도 ${node.properties.데뷔년도}`}
                  {node.properties.장르 &&
                    `장르 ${node.properties.장르} (${
                      GENRE_GLOSS[node.properties.장르] ?? node.properties.장르
                    })`}
                </p>
              )}

              <div className="mt-4 pt-4 border-t border-[#EBDCE0]/80 space-y-1.5 text-xs">
                {outgoing.map((rel) => (
                  <div key={rel.id} className="flex items-baseline justify-between gap-2">
                    <span className="text-[#6E565E] shrink-0">{rel.label}</span>
                    <span className="font-medium text-[#3B282E] text-right truncate">
                      {rel.end.properties.name}
                    </span>
                  </div>
                ))}
                {incoming.map((rel) => (
                  <div key={rel.id} className="flex items-baseline justify-between gap-2">
                    <span className="text-[#6E565E] shrink-0">← {rel.label}</span>
                    <span className="font-medium text-[#3B282E] text-right truncate">
                      {rel.start.properties.name}
                    </span>
                  </div>
                ))}
                {total === 0 && <p className="text-[#6E565E] italic">{emptyLabel}</p>}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );

  return (
    <section id="explorer" className="bg-[#FAF6F0] border-b border-[#EBDCE0] py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#6E565E] mb-2">
              04 · 엔티티 및 활동 아카이브
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#B85A74]">
              전체 노드·관계 정적 목록
            </h2>
            <p className="text-sm text-[#6E565E] mt-2 max-w-2xl">
              데이터베이스 파일에 수록된 모든 인물, 소속사, 아이돌 그룹, 프로듀스 48 유닛 및
              해체 후 활동 레코드를 범주별로 빠짐없이 열람할 수 있습니다.
            </p>
          </div>

          {/* Static Quick Anchor Index */}
          <nav aria-label="엔티티 범주 바로가기" className="flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#AD4664]">
            <a href="#catalog-people" className="hover:underline underline-offset-4">
              인물 ({people.length})
            </a>
            <a href="#catalog-activities" className="hover:underline underline-offset-4">
              해체후활동 ({activities.length})
            </a>
            <a href="#catalog-units" className="hover:underline underline-offset-4">
              유닛 ({units.length})
            </a>
            <a href="#catalog-groups" className="hover:underline underline-offset-4">
              아이돌그룹 ({groups.length})
            </a>
            <a href="#catalog-agencies" className="hover:underline underline-offset-4">
              소속사 ({agencies.length})
            </a>
          </nav>
        </div>

        <div className="space-y-16">
          {/* 1. People */}
          <div id="catalog-people">
            <div className="flex items-baseline justify-between border-b border-[#EBDCE0] pb-3 mb-6">
              <h3 className="font-serif text-2xl font-medium text-[#3B282E]">
                인물 (People)
              </h3>
              <span className="font-mono text-xs text-[#6E565E] tabular-nums">
                {people.length}개 레코드 (C01–C12 및 중복 #42)
              </span>
            </div>
            {renderNodeCards(people, '기록된 연결 없음')}
          </div>

          {/* 2. Post-disbandment Activities */}
          <div id="catalog-activities">
            <div className="flex items-baseline justify-between border-b border-[#EBDCE0] pb-3 mb-6">
              <h3 className="font-serif text-2xl font-medium text-[#3B282E]">
                해체후활동 (Post-disbandment Activities)
              </h3>
              <span className="font-mono text-xs text-[#6E565E] tabular-nums">
                {activities.length}개 레코드 (A01–A05)
              </span>
            </div>
            {renderNodeCards(activities, '출연 기록 없음')}
          </div>

          {/* 3. Produce 48 Units */}
          <div id="catalog-units">
            <div className="flex items-baseline justify-between border-b border-[#EBDCE0] pb-3 mb-6">
              <h3 className="font-serif text-2xl font-medium text-[#3B282E]">
                유닛 (Produce 48 Competition Units)
              </h3>
              <span className="font-mono text-xs text-[#6E565E] tabular-nums">
                {units.length}개 레코드 (U01–U05)
              </span>
            </div>
            {renderNodeCards(units, '참여 멤버 기록 없음')}
          </div>

          {/* 4. Idol Groups */}
          <div id="catalog-groups">
            <div className="flex items-baseline justify-between border-b border-[#EBDCE0] pb-3 mb-6">
              <h3 className="font-serif text-2xl font-medium text-[#3B282E]">
                아이돌그룹 (Idol Groups)
              </h3>
              <span className="font-mono text-xs text-[#6E565E] tabular-nums">
                {groups.length}개 레코드 (G01–G05)
              </span>
            </div>
            {renderNodeCards(groups, '연결된 멤버·소속사 없음')}
          </div>

          {/* 5. Agencies */}
          <div id="catalog-agencies">
            <div className="flex items-baseline justify-between border-b border-[#EBDCE0] pb-3 mb-6">
              <h3 className="font-serif text-2xl font-medium text-[#3B282E]">
                소속사 (Entertainment Agencies)
              </h3>
              <span className="font-mono text-xs text-[#6E565E] tabular-nums">
                {agencies.length}개 레코드 (E01–E15)
              </span>
            </div>
            {renderNodeCards(agencies, '연결된 인물·그룹 없음')}
          </div>
        </div>
      </div>
    </section>
  );
}
