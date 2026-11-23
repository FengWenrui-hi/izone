import React from 'react';
import {
  GENRE_GLOSS,
  ParsedGraphData,
} from '../data/neo4jGraph';
import { RibbonBowMark } from './EditorialMotifs';

export function FindingsSection({ graphData }: { graphData: ParsedGraphData }) {
  const members = graphData.nodes.filter((n) => n.labels.includes('인물') && n.id !== '42');

  const memberMatrix = members.map((m) => {
    const out = graphData.relationships.filter((r) => r.start.id === m.id);
    const agencies = out.filter((r) => r.label === '소속되었다').map((r) => r.end.properties.name);
    const redebuts = out.filter((r) => r.label === '재데뷔하였다').map((r) => r.end.properties.name);
    const pastGroups = out.filter((r) => r.label === '활동했었다').map((r) => r.end.properties.name);
    const units = out.filter((r) => r.label === '참여하였다').map((r) => r.end.properties.name);
    const activities = out.filter((r) => r.label === '출연하였다').map((r) => r.end.properties.name);

    return {
      node: m,
      agencies,
      redebuts,
      pastGroups,
      units,
      activities,
      totalEdges: out.length,
    };
  });

  const activities = graphData.nodes.filter((n) => n.labels.includes('해체후활동'));
  const activityCoAppearances = activities.map((act) => {
    const participants = graphData.relationships
      .filter((r) => r.end.id === act.id && r.label === '출연하였다')
      .map((r) => ({
        id: r.start.id,
        name: r.start.properties.name,
      }));

    return { activity: act, participants };
  });

  const units = graphData.nodes.filter((n) => n.labels.includes('유닛'));
  const unitRosters = units.map((unit) => {
    const participants = graphData.relationships
      .filter((r) => r.end.id === unit.id && r.label === '참여하였다')
      .map((r) => r.start);

    return { unit, participants };
  });

  const unlinkedUnitMembers = members.filter(
    (m) =>
      !graphData.relationships.some(
        (r) => r.start.id === m.id && r.label === '참여하였다'
      )
  );

  return (
    <section id="findings" className="bg-[#FDFBF7] border-b border-[#EBDCE0] py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#6E565E] mb-3">
            05 · 예비 연구 결과 및 데이터 감사
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#B85A74] leading-tight"
            style={{ textWrap: 'balance' }}
          >
            질의 결과와 데이터셋 검증 기록
          </h2>
          <div className="mt-4 flex justify-center">
            <RibbonBowMark className="w-7 h-5" strokeColor="#C65B7A" />
          </div>
          <p className="text-sm text-[#6E565E] mt-4 leading-relaxed">
            아래 관찰 내용은 확정된 보편 결론이 아니라, 추출된 Neo4j 데이터셋(
            <span className="font-mono text-[#3B282E]">
              {graphData.nodes.length}개 노드 / {graphData.relationships.length}개 관계
            </span>
            )에서 직접 확인된 예비 연구 결과입니다.
          </p>
        </div>

        {/* Finding 01: Career-Path Diversification Matrix */}
        <div className="mb-16">
          <div className="mb-6">
            <p className="font-mono text-xs text-[#AD4664] mb-1">Finding 01 · 연구 질문 1</p>
            <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B282E]">
              12인 멤버의 해체 이후 진로 다각화 현황
            </h3>
            <p className="text-sm text-[#6E565E] leading-relaxed max-w-3xl mt-2">
              해체 이후 멤버들의 경로는 새 그룹 재데뷔(IVE, SAY MY NAME, LE SSERAFIM),
              솔로 및 배우 중심 소속사(울림, RBW, 위에화, WM, 8D, 매니지먼트 숲 등),
              한·일 방송 및 화보 활동 등으로 분화되었습니다. 추출 JSON에 포함되지 않은 연결은
              임의로 추론하지 않고 <span className="font-mono">—</span> 로 표기했습니다.
            </p>
          </div>

          <div className="overflow-x-auto border border-[#EBDCE0] bg-[#FAF6F0]">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#EBDCE0] bg-[#F2F4FC] text-[#3B282E]">
                  <th className="py-3 px-4 font-medium">멤버</th>
                  <th className="py-3 px-4 font-medium">소속사 (소속되었다)</th>
                  <th className="py-3 px-4 font-medium">재데뷔 (재데뷔하였다)</th>
                  <th className="py-3 px-4 font-medium">이전/기존 그룹 (활동했었다)</th>
                  <th className="py-3 px-4 font-medium">해체후활동 (출연하였다)</th>
                  <th className="py-3 px-4 font-medium text-right tabular-nums">연결 수</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBDCE0] bg-[#FDFBF7]">
                {memberMatrix.map((row) => (
                  <tr key={row.node.id}>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="font-mono text-[11px] text-[#AD4664] mr-2">
                        {row.node.properties.id}
                      </span>
                      <span className="font-medium text-[#3B282E]">
                        {row.node.properties.name}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-[#3B282E]">
                      {row.agencies.length > 0 ? row.agencies.join(' · ') : '—'}
                    </td>
                    <td className="py-3 px-4 text-[#3B282E]">
                      {row.redebuts.length > 0 ? row.redebuts.join(' · ') : '—'}
                    </td>
                    <td className="py-3 px-4 text-[#6E565E]">
                      {row.pastGroups.length > 0 ? row.pastGroups.join(' · ') : '—'}
                    </td>
                    <td className="py-3 px-4 text-[#3B282E]">
                      {row.activities.length > 0 ? row.activities.join(' · ') : '—'}
                    </td>
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-[#6E565E]">
                      {row.totalEdges}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Finding 02 & Finding 03 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Finding 02 */}
          <article className="bg-[#FAF6F0] border border-[#EBDCE0] p-7">
            <p className="font-mono text-xs text-[#AD4664] mb-1">Finding 02 · 연구 질문 2</p>
            <h3 className="font-serif text-2xl font-medium text-[#3B282E] mb-3">
              해체 후 공개 활동을 통한 멤버 간 접점
            </h3>
            <p className="text-sm text-[#6E565E] leading-relaxed mb-5">
              추출된 5개의 해체 후 활동 중 4건에서 2인 이상의 멤버가 함께 연결되어, 해체 이후에도
              방송·라디오·화보를 매개로 공개 접점이 유지되었음을 확인할 수 있습니다.
            </p>

            <div className="divide-y divide-[#EBDCE0] border-t border-b border-[#EBDCE0] bg-[#FDFBF7] px-4">
              {activityCoAppearances.map(({ activity, participants }) => (
                <div key={activity.id} className="py-3.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-medium text-sm text-[#3B282E]">
                      {activity.properties.name}
                    </span>
                    <span className="text-xs text-[#6E565E] shrink-0">
                      {activity.properties.id} ·{' '}
                      {activity.properties.장르
                        ? GENRE_GLOSS[activity.properties.장르] ?? activity.properties.장르
                        : ''}
                    </span>
                  </div>
                  <p className="text-xs text-[#6E565E] mt-1">
                    확인된 출연 멤버 ({participants.length}명):{' '}
                    <span className="text-[#3B282E] font-medium">
                      {participants
                        .map((p) => (p.id === '42' ? `${p.name} (중복 노드 #42)` : p.name))
                        .join(', ')}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#6E565E] leading-relaxed mt-4">
              <strong className="text-[#3B282E]">연구 자료 대조 주석:</strong> 프로젝트 메모에서는
              최예나·이채연의 <em>문명특급</em> 및 <em>전효성의 꿈꾸는 라디오</em> 공동 출연,
              사쿠라·나코의 <em>ロクいち！福岡</em> 및 <em>クイズTHE違和感</em> 공동 출연이 예시로
              언급되나, 실제 추출 JSON에는 <em>문명특급</em>(최예나·야부키 나코)과{' '}
              <em>ロクいち！福岡</em>(사쿠라 단독)만 연결되어 있습니다.
            </p>
          </article>

          {/* Finding 03 */}
          <article className="bg-[#FAF6F0] border border-[#EBDCE0] p-7">
            <p className="font-mono text-xs text-[#AD4664] mb-1">Finding 03 · 연구 질문 3</p>
            <h3 className="font-serif text-2xl font-medium text-[#3B282E] mb-3">
              프로듀스 48 경연 유닛 참여 현황
            </h3>
            <p className="text-sm text-[#6E565E] leading-relaxed mb-5">
              당초 반복적 유닛 결성 패턴을 도출하려던 질의는 데이터셋 표본의 한계로 인해
              “동일 유닛에 함께 참여한 멤버 목록 확인”으로 연구 범위를 조정하여 분석했습니다.
            </p>

            <div className="divide-y divide-[#EBDCE0] border-t border-b border-[#EBDCE0] bg-[#FDFBF7] px-4">
              {unitRosters.map(({ unit, participants }) => (
                <div key={unit.id} className="py-3.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-medium text-sm text-[#3B282E]">
                      {unit.properties.name}
                    </span>
                    <span className="font-mono text-xs text-[#6E565E] tabular-nums shrink-0">
                      {unit.properties.id} · {participants.length}명
                    </span>
                  </div>
                  <p className="text-xs text-[#3B282E] mt-1">
                    {participants.map((p) => p.properties.name).join(', ')}
                  </p>
                </div>
              ))}
            </div>

            {unlinkedUnitMembers.length > 0 && (
              <p className="text-xs text-[#6E565E] leading-relaxed mt-4">
                <strong className="text-[#3B282E]">데이터 범위 주석:</strong>{' '}
                {unlinkedUnitMembers
                  .map((m) => `${m.properties.name}(${m.properties.id})`)
                  .join(', ')}
                의 경우 본 JSON 추출본에 <code className="font-mono">참여하였다</code> 엣지가
                포함되어 있지 않습니다.
              </p>
            )}
          </article>
        </div>

        {/* Dataset Integrity & Limitation Audit */}
        <div className="bg-[#F2F4FC] border border-[#C8D3F0] p-7 sm:p-9">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#4A5B8C] mb-1">
                Data Verification &amp; Limitations
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B282E]">
                제공된 Neo4j 추출본 데이터 감사 기록
              </h3>
            </div>
            <span className="font-mono text-xs text-[#4A5B8C] tabular-nums">
              원본 파일 기준: {graphData.nodes.length}개 노드 · {graphData.relationships.length}개 관계
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#3B282E]">
            <div className="border-t border-[#C8D3F0] pt-4">
              <h4 className="font-semibold mb-1">1. 계획 범위(126건)와 추출본 간 차이</h4>
              <p className="text-xs text-[#6E565E] leading-relaxed">
                제안서에는 활동 관련 126건의 레코드가 계획 범위로 기술되어 있으나, 실제 공급된
                Neo4j 내보내기 파일에는 43개 노드와 47개 관계가 수록되어 있습니다. 본 웹사이트는
                추출 파일에 실존하는 수치와 관계만을 그대로 반영합니다.
              </p>
            </div>

            <div className="border-t border-[#C8D3F0] pt-4">
              <h4 className="font-semibold mb-1">2. 중복 인물 노드 (#42 혼다 히토미)</h4>
              <p className="text-xs text-[#6E565E] leading-relaxed">
                노드 <code className="font-mono">#42</code>(
                <code className="font-mono">혼다 히토미</code>,{' '}
                <code className="font-mono">id: "[ID-NUMBER]"</code>)가 기존{' '}
                <code className="font-mono">C09</code>와 별도로 생성되어{' '}
                <em>クイズTHE違和感</em>(A04)에 연결되어 있습니다.
              </p>
            </div>

            <div className="border-t border-[#C8D3F0] pt-4">
              <h4 className="font-semibold mb-1">3. 소속사 표기 불일치 (E11 / E13)</h4>
              <p className="text-xs text-[#6E565E] leading-relaxed">
                원본 파일에 <code className="font-mono">E11</code>(<em>Peace 엔터테인먼트</em>)과{' '}
                <code className="font-mono">E13</code>(<em>Peace 터테인먼트</em>)이 별도 노드로
                존재하며 각각 강혜원·조유리 노드와 연결되어 있습니다.
              </p>
            </div>

            <div className="border-t border-[#C8D3F0] pt-4">
              <h4 className="font-semibold mb-1">4. 원본 관계 1152934698746380288 기록</h4>
              <p className="text-xs text-[#6E565E] leading-relaxed">
                추출 JSON의 관계 <code className="font-mono">1152934698746380288</code>은
                권은비(<code className="font-mono">C01</code>)를 <em>LE SSERAFIM</em>(
                <code className="font-mono">G02</code>)에{' '}
                <code className="font-mono">재데뷔하였다</code>로 연결하고 있으며, 사쿠라(
                <code className="font-mono">C02</code>)의 해당 엣지는 누락되어 있습니다. 원본
                충실성 원칙에 따라 임의 수정 없이 그대로 표기했습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
