import React from 'react';
import {
  ENTITY_META,
  EntityLabelKr,
  ParsedGraphData,
  RELATIONSHIP_META,
  RelationshipLabelKr,
} from '../data/neo4jGraph';

interface NodeCoord {
  x: number;
  y: number;
  align: 'start' | 'middle' | 'end';
}

const VIEW_W = 1240;
const VIEW_H = 850;

const REL_COLORS: Record<RelationshipLabelKr, string> = {
  참여하였다: '#D59C5C',
  출연하였다: '#639C89',
  재데뷔하였다: '#B479B8',
  활동했었다: '#9C789F',
  소속되었다: '#7F91CC',
  관리된다: '#6C7FC0',
};

const CYPHER_QUERIES = [
  {
    title: '전체 지식 그래프 조회',
    cypher: 'MATCH (n)-[r]->(m) RETURN n, r, m',
  },
  {
    title: '해체 후 공동 출연 활동 탐색',
    cypher: 'MATCH (p1:인물)-[:출연하였다]->(a:해체후활동)<-[:출연하였다]-(p2:인물) RETURN p1, a, p2',
  },
  {
    title: '프로듀스 48 경연 유닛 참여 멤버 조회',
    cypher: 'MATCH (p:인물)-[:참여하였다]->(u:유닛) RETURN u.name, collect(p.name)',
  },
  {
    title: '멤버별 소속사 및 재데뷔 그룹 연결',
    cypher: 'MATCH (p:인물)-[r:소속되었다|재데뷔하였다|활동했었다]->(org) RETURN p, r, org',
  },
];

function buildStaticLayout(): Record<string, NodeCoord> {
  const coords: Record<string, NodeCoord> = {};

  // Left-Upper: Units (U01..U05 -> ids 32..36)
  ['32', '33', '34', '35', '36'].forEach((id, i) => {
    coords[id] = { x: 205, y: 92 + i * 58, align: 'end' };
  });

  // Left-Lower: Post-disbandment Activities (A01..A05 -> ids 37..41)
  ['37', '38', '39', '40', '41'].forEach((id, i) => {
    coords[id] = { x: 205, y: 465 + i * 62, align: 'end' };
  });

  // Duplicate Node #42 (혼다 히토미 [ID-NUMBER])
  coords['42'] = { x: 375, y: 795, align: 'middle' };

  // Center: 12 Members (C01..C12 -> ids 0..11)
  for (let i = 0; i <= 11; i++) {
    coords[String(i)] = { x: 565, y: 88 + i * 60, align: 'middle' };
  }

  // Right-Inner Upper: 5 Idol Groups (G01..G05 -> ids 27..31)
  ['27', '28', '29', '30', '31'].forEach((id, i) => {
    coords[id] = { x: 865, y: 98 + i * 68, align: 'middle' };
  });

  // Right-Outer Upper: Group-managing Agencies (E06..E10 -> ids 17..21)
  ['17', '18', '19', '20', '21'].forEach((id, i) => {
    coords[id] = { x: 1055, y: 98 + i * 68, align: 'start' };
  });

  // Right-Inner Lower: Member-affiliated Agencies (10 nodes)
  ['12', '23', '13', '14', '22', '24', '15', '16', '25', '26'].forEach((id, i) => {
    coords[id] = { x: 920, y: 455 + i * 37, align: 'start' };
  });

  return coords;
}

export function StaticGraphPlate({ graphData }: { graphData: ParsedGraphData }) {
  const coords = buildStaticLayout();

  return (
    <section id="graph" className="bg-[#FDFBF7] border-b border-[#EBDCE0] py-20 lg:py-24">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#6E565E] mb-2">
              03 · 지식 그래프 시각화 도판
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#B85A74]">
              IZ*ONE Activity Network 전체 관계도
            </h2>
            <p className="text-sm text-[#6E565E] mt-2 max-w-2xl">
              제공된 Neo4j JSON 추출본에 수록된 {graphData.nodes.length}개 노드와{' '}
              {graphData.relationships.length}건의 방향성 관계를 한눈에 읽을 수 있도록
              4열 아카이브 도판 형태로 배치한 정적 지식 그래프입니다.
            </p>
          </div>
          <p className="font-mono text-xs text-[#6E565E] tabular-nums shrink-0">
            Fig. 2 · {graphData.nodes.length} Nodes / {graphData.relationships.length} Relationships
          </p>
        </div>

        {/* Legend Strip */}
        <div className="bg-[#FAF6F0] border border-[#EBDCE0] px-5 py-3.5 mb-6 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {(Object.keys(ENTITY_META) as EntityLabelKr[]).map((cat) => (
              <span key={cat} className="inline-flex items-center gap-2 text-[#3B282E]">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: ENTITY_META[cat].color }}
                  aria-hidden="true"
                />
                <span className="font-medium">{ENTITY_META[cat].kr}</span>
                <span className="text-[#6E565E]">({ENTITY_META[cat].en})</span>
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[#6E565E]">
            {(Object.keys(RELATIONSHIP_META) as RelationshipLabelKr[]).map((rel) => (
              <span key={rel} className="inline-flex items-center gap-1.5">
                <span
                  className="w-3 h-0.5 inline-block"
                  style={{ backgroundColor: REL_COLORS[rel] }}
                  aria-hidden="true"
                />
                <span>{rel}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Static SVG Graph Plate */}
        <figure className="bg-[#FAF6F0] border border-[#EBDCE0] p-4 sm:p-6">
          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              className="w-full min-w-[920px] h-auto block"
              role="img"
              aria-label="IZ*ONE 멤버 12인, 경연 유닛, 해체 후 활동, 아이돌 그룹 및 소속사 간 Neo4j 지식 그래프 도판"
            >
              <defs>
                <marker
                  id="static-arrow"
                  viewBox="0 0 10 10"
                  refX="14"
                  refY="5"
                  markerWidth="4.5"
                  markerHeight="4.5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1.5 L 8.5 5 L 0 8.5 z" fill="#9A858C" />
                </marker>
              </defs>

              {/* Column Section Headers inside Diagram */}
              <text x="205" y="42" textAnchor="end" fontSize="11" fontWeight="600" fill="#6E565E">
                프로듀스 48 유닛 (U01–U05)
              </text>
              <text x="205" y="422" textAnchor="end" fontSize="11" fontWeight="600" fill="#6E565E">
                해체 후 공개 활동 (A01–A05)
              </text>
              <text x="565" y="42" textAnchor="middle" fontSize="11" fontWeight="600" fill="#6E565E">
                IZ*ONE 멤버 12인 (C01–C12)
              </text>
              <text x="865" y="42" textAnchor="middle" fontSize="11" fontWeight="600" fill="#6E565E">
                아이돌 그룹 (G01–G05)
              </text>
              <text x="1055" y="42" textAnchor="start" fontSize="11" fontWeight="600" fill="#6E565E">
                그룹 관리 소속사
              </text>
              <text x="920" y="422" textAnchor="start" fontSize="11" fontWeight="600" fill="#6E565E">
                멤버 소속사 (E01–E15)
              </text>

              {/* Subtle vertical guide hairlines */}
              <line x1="395" y1="55" x2="395" y2="770" stroke="#EBDCE0" strokeDasharray="3 4" />
              <line x1="740" y1="55" x2="740" y2="815" stroke="#EBDCE0" strokeDasharray="3 4" />

              {/* All 47 Relationships as Clean Cubic Bezier Curves */}
              {graphData.relationships.map((rel) => {
                const s = coords[rel.start.id];
                const e = coords[rel.end.id];
                if (!s || !e) return null;

                const stroke = REL_COLORS[rel.label] ?? '#BDB0B4';
                const dx = e.x - s.x;
                const c1x = s.x + dx * 0.42;
                const c2x = e.x - dx * 0.42;
                const d = `M ${s.x} ${s.y} C ${c1x} ${s.y}, ${c2x} ${e.y}, ${e.x} ${e.y}`;

                return (
                  <path
                    key={rel.id}
                    d={d}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={rel.start.id === '42' ? 1.8 : 1.3}
                    strokeOpacity={0.62}
                    strokeDasharray={rel.start.id === '42' ? '4 3' : undefined}
                    markerEnd="url(#static-arrow)"
                  />
                );
              })}

              {/* All 43 Nodes */}
              {graphData.nodes.map((node) => {
                const pos = coords[node.id];
                if (!pos) return null;
                const label = node.labels[0];
                const meta = ENTITY_META[label];
                const isPerson = label === '인물';
                const isDup = node.id === '42';
                const r = isPerson ? 8.5 : 7;

                const textX =
                  pos.align === 'end' ? -13 : pos.align === 'start' ? 13 : 0;
                const textY = pos.align === 'middle' ? -13 : 4;

                return (
                  <g key={node.id} transform={`translate(${pos.x}, ${pos.y})`}>
                    <circle
                      r={r}
                      fill={meta.color}
                      stroke={isDup ? '#3B282E' : '#FDFBF7'}
                      strokeWidth={isDup ? 2 : 1.8}
                    />
                    <text
                      x={textX}
                      y={textY}
                      textAnchor={pos.align}
                      fontSize={isPerson ? '11.5' : '11'}
                      fontWeight={isPerson ? '600' : '500'}
                      fill="#3B282E"
                      paintOrder="stroke"
                      stroke="#FAF6F0"
                      strokeWidth="4"
                      strokeLinejoin="round"
                    >
                      {node.properties.name}
                      {isDup ? ' (#42)' : ''}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <figcaption className="mt-4 pt-3 border-t border-[#EBDCE0] text-xs text-[#6E565E] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span>
              Fig. 2 — 원본 Neo4j 내보내기 기준 전체 연결망. 점선 엣지는 중복 노드 #42(혼다 히토미, id: [ID-NUMBER])를 표시합니다.
            </span>
            <span className="font-mono text-[11px]">Source: Neo4j JSON Export</span>
          </figcaption>
        </figure>

        {/* Static Cypher Query Reference Strip */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {CYPHER_QUERIES.map((q) => (
            <div key={q.title} className="bg-[#F2F4FC] border border-[#C8D3F0] p-4">
              <p className="text-xs font-medium text-[#3B282E] mb-1.5">{q.title}</p>
              <code className="block font-mono text-[11px] text-[#4A5B8C] leading-relaxed break-all">
                {q.cypher}
              </code>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
