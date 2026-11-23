import React from 'react';
import {
  ENGLISH_GLOSS,
  GENRE_GLOSS,
  ParsedGraphData,
} from '../data/neo4jGraph';
import { RibbonBowMark } from './EditorialMotifs';
import { GraphPresetId } from './GraphExplorer';

interface FindingsProps {
  rawGraph: ParsedGraphData;
  activeGraph: ParsedGraphData;
  mergeDuplicates: boolean;
  onInspectNodeInGraph: (nodeId: string, preset?: GraphPresetId) => void;
}

export function FindingsSection({
  rawGraph,
  activeGraph,
  mergeDuplicates,
  onInspectNodeInGraph,
}: FindingsProps) {
  const members = activeGraph.nodes.filter((n) => n.labels.includes('인물') && n.id !== '42');

  const memberMatrix = members.map((m) => {
    const out = activeGraph.relationships.filter((r) => r.start.id === m.id);
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

  const activities = activeGraph.nodes.filter((n) => n.labels.includes('해체후활동'));
  const activityCoAppearances = activities.map((act) => {
    const participants = activeGraph.relationships
      .filter((r) => r.end.id === act.id && r.label === '출연하였다')
      .map((r) => {
        const startNode = activeGraph.nodeById.get(r.start.id);
        return {
          id: r.start.id,
          name: r.start.properties.name,
          propId: startNode?.properties.id ?? r.start.properties.id,
        };
      });

    return {
      activity: act,
      participants,
    };
  });

  const units = activeGraph.nodes.filter((n) => n.labels.includes('유닛'));
  const unitRosters = units.map((unit) => {
    const participants = activeGraph.relationships
      .filter((r) => r.end.id === unit.id && r.label === '참여하였다')
      .map((r) => r.start);

    return {
      unit,
      participants,
    };
  });

  const unlinkedUnitMembers = members.filter(
    (m) =>
      !activeGraph.relationships.some(
        (r) => r.start.id === m.id && r.label === '참여하였다'
      )
  );

  return (
    <section id="findings" className="bg-[#FDFBF7] border-b border-[#EBDCE0] py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#6E565E] mb-3">
            05 · Grounded Observations
          </p>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-[#B85A74] leading-tight"
            style={{ textWrap: 'balance' }}
          >
            Preliminary Findings & Dataset Audit
          </h2>
          <div className="mt-4 flex justify-center">
            <RibbonBowMark className="w-7 h-5" strokeColor="#C65B7A" />
          </div>
          <p className="text-sm text-[#6E565E] mt-4 leading-relaxed">
            Observations below are preliminary research findings computed directly from the{' '}
            <span className="font-mono text-[#3B282E]">
              {activeGraph.nodes.length} nodes / {activeGraph.relationships.length} edges
            </span>{' '}
            currently active in the exported Neo4j graph{' '}
            {mergeDuplicates ? '(merged #42 view)' : '(raw export)'}.
          </p>
        </div>

        {/* Finding 01: Career-Path Diversification Matrix */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <p className="font-mono text-xs text-[#AD4664] mb-1">Finding 01 · Research Question 1</p>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B282E]">
                Career-Path Diversification Across the 12 Members
              </h3>
            </div>
            <button
              type="button"
              onClick={() => onInspectNodeInGraph('0', 'lineage')}
              className="text-xs font-medium text-[#AD4664] hover:underline underline-offset-4 self-start sm:self-auto"
            >
              View lineage subgraph &rarr;
            </button>
          </div>

          <p className="text-sm text-[#6E565E] leading-relaxed max-w-3xl mb-6">
            Post-disbandment paths in the supplied graph span new group redebuts (IVE, SAY MY NAME,
            LE SSERAFIM), solo/acting agency affiliations (e.g., Woollim, RBW, Yuehua, WM, 8D,
            Management SOOP), and Japanese/Korean variety, radio, and magazine activities. Edges
            omitted from this JSON export (such as missing agency or redebut links for some members)
            are shown as <span className="font-mono">—</span> rather than inferred.
          </p>

          <div className="overflow-x-auto border border-[#EBDCE0] bg-[#FAF6F0]">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#EBDCE0] bg-[#F2F4FC] text-[#3B282E]">
                  <th className="py-3 px-4 font-medium">Member</th>
                  <th className="py-3 px-4 font-medium">Agencies (소속되었다)</th>
                  <th className="py-3 px-4 font-medium">Redebut (재데뷔하였다)</th>
                  <th className="py-3 px-4 font-medium">Prior / Group (활동했었다)</th>
                  <th className="py-3 px-4 font-medium">Activities (출연하였다)</th>
                  <th className="py-3 px-4 font-medium text-right tabular-nums">Edges</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBDCE0] bg-[#FDFBF7]">
                {memberMatrix.map((row) => (
                  <tr key={row.node.id} className="hover:bg-[#FAF6F0]/80">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => onInspectNodeInGraph(row.node.id, 'all')}
                        className="text-left group"
                      >
                        <span className="font-mono text-[11px] text-[#AD4664] mr-2">
                          {row.node.properties.id}
                        </span>
                        <span className="font-medium text-[#3B282E] group-hover:text-[#AD4664] group-hover:underline">
                          {row.node.properties.name}
                        </span>
                        <span className="block text-[11px] text-[#6E565E] pl-8">
                          {ENGLISH_GLOSS[row.node.properties.id]}
                        </span>
                      </button>
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
          {/* Finding 02: Shared Post-Disbandment Appearances */}
          <article className="bg-[#FAF6F0] border border-[#EBDCE0] p-7">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="font-mono text-xs text-[#AD4664] mb-1">
                  Finding 02 · Research Question 2
                </p>
                <h3 className="font-serif text-2xl font-medium text-[#3B282E]">
                  Shared Post-Disbandment Connections
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onInspectNodeInGraph('40', 'activities')}
                className="text-xs font-medium text-[#AD4664] hover:underline shrink-0"
              >
                Open subgraph &rarr;
              </button>
            </div>

            <p className="text-sm text-[#6E565E] leading-relaxed mb-5">
              Four of the five documented post-disbandment activities in the export connect two or
              more former members, demonstrating continued public intersections across Korean and
              Japanese media:
            </p>

            <div className="divide-y divide-[#EBDCE0] border-t border-b border-[#EBDCE0] bg-[#FDFBF7] px-4">
              {activityCoAppearances.map(({ activity, participants }) => (
                <div key={activity.id} className="py-3.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onInspectNodeInGraph(activity.id, 'activities')}
                      className="font-medium text-sm text-[#3B282E] hover:text-[#AD4664] hover:underline text-left"
                    >
                      {activity.properties.name}
                    </button>
                    <span className="text-xs text-[#6E565E] shrink-0">
                      {activity.properties.id} ·{' '}
                      {activity.properties.장르
                        ? GENRE_GLOSS[activity.properties.장르] ?? activity.properties.장르
                        : ''}
                    </span>
                  </div>
                  <p className="text-xs text-[#6E565E] mt-1">
                    Documented participants ({participants.length}):{' '}
                    <span className="text-[#3B282E] font-medium">
                      {participants
                        .map((p) =>
                          p.id === '42' ? `${p.name} (node #42)` : p.name
                        )
                        .join(', ')}
                    </span>
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#6E565E] leading-relaxed mt-4">
              <strong className="text-[#3B282E]">Cross-reference note:</strong> Project notes cite
              Yena &amp; Chaeyeon in <em>전효성의 꿈꾸는 라디오</em> (confirmed in export) and{' '}
              <em>문명특급</em> (export connects Yena &amp; Nako), plus Sakura &amp; Nako in{' '}
              <em>クイズTHE違和感</em> (confirmed) and <em>ロクいち！福岡</em> (export contains
              Sakura’s edge only).
            </p>
          </article>

          {/* Finding 03: Produce 48 Unit Participation */}
          <article className="bg-[#FAF6F0] border border-[#EBDCE0] p-7">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="font-mono text-xs text-[#AD4664] mb-1">
                  Finding 03 · Research Question 3
                </p>
                <h3 className="font-serif text-2xl font-medium text-[#3B282E]">
                  Produce 48 Competition Units
                </h3>
              </div>
              <button
                type="button"
                onClick={() => onInspectNodeInGraph('33', 'units')}
                className="text-xs font-medium text-[#AD4664] hover:underline shrink-0"
              >
                Open subgraph &rarr;
              </button>
            </div>

            <p className="text-sm text-[#6E565E] leading-relaxed mb-5">
              The team revised this query from searching for recurring statistical patterns to
              mapping shared competition-unit membership, because the collected dataset was not
              sufficient to infer reliable recurring patterns across units:
            </p>

            <div className="divide-y divide-[#EBDCE0] border-t border-b border-[#EBDCE0] bg-[#FDFBF7] px-4">
              {unitRosters.map(({ unit, participants }) => (
                <div key={unit.id} className="py-3.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onInspectNodeInGraph(unit.id, 'units')}
                      className="font-medium text-sm text-[#3B282E] hover:text-[#AD4664] hover:underline text-left"
                    >
                      {unit.properties.name}
                    </button>
                    <span className="font-mono text-xs text-[#6E565E] tabular-nums shrink-0">
                      {unit.properties.id} · {participants.length}{' '}
                      {participants.length === 1 ? 'member' : 'members'}
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
                <strong className="text-[#3B282E]">Coverage note:</strong>{' '}
                {unlinkedUnitMembers.map((m) => `${m.properties.name} (${m.properties.id})`).join(', ')}{' '}
                has no <code className="font-mono">참여하였다</code> edge in this exported JSON snapshot.
              </p>
            )}
          </article>
        </div>

        {/* Dataset Integrity & Limitation Audit */}
        <div className="bg-[#F2F4FC] border border-[#C8D3F0] p-7 sm:p-9">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#4A5B8C] mb-1">
                Transparency & Data Verification
              </p>
              <h3 className="font-serif text-2xl sm:text-3xl font-medium text-[#3B282E]">
                Supplied Neo4j Export Audit Log
              </h3>
            </div>
            <span className="font-mono text-xs text-[#4A5B8C] tabular-nums">
              Raw file: {rawGraph.nodes.length} nodes · {rawGraph.relationships.length} edges
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#3B282E]">
            <div className="border-t border-[#C8D3F0] pt-4">
              <h4 className="font-semibold mb-1">1. Planned Scope vs. Exported Snapshot</h4>
              <p className="text-xs text-[#6E565E] leading-relaxed">
                The proposal documents 126 activity-related records as the planned target scope. The
                supplied Neo4j export contains 43 node lines and 47 relationship lines; all counts and
                visualizations strictly reflect the supplied file without extrapolating missing records.
              </p>
            </div>

            <div className="border-t border-[#C8D3F0] pt-4">
              <h4 className="font-semibold mb-1">2. Duplicate Entity Record (Node #42)</h4>
              <p className="text-xs text-[#6E565E] leading-relaxed">
                Node <code className="font-mono">#42</code> (<code className="font-mono">혼다 히토미</code>,{' '}
                <code className="font-mono">id: "[ID-NUMBER]"</code>) duplicates{' '}
                <code className="font-mono">C09</code> and holds the edge to{' '}
                <em>クイズTHE違和感</em>.{' '}
                <button
                  type="button"
                  onClick={() => onInspectNodeInGraph('42', 'anomaly')}
                  className="text-[#AD4664] font-medium hover:underline"
                >
                  Inspect #42 in Graph &rarr;
                </button>
              </p>
            </div>

            <div className="border-t border-[#C8D3F0] pt-4">
              <h4 className="font-semibold mb-1">3. Agency Naming Discrepancy (E11 / E13)</h4>
              <p className="text-xs text-[#6E565E] leading-relaxed">
                Both <code className="font-mono">E11</code> (<em>Peace 엔터테인먼트</em>) and{' '}
                <code className="font-mono">E13</code> (<em>Peace 터테인먼트</em>, missing “엔”)
                appear as separate agency nodes connected to 강혜원 and 조유리 in the raw export.
              </p>
            </div>

            <div className="border-t border-[#C8D3F0] pt-4">
              <h4 className="font-semibold mb-1">4. Exported Redebut Edge on C01</h4>
              <p className="text-xs text-[#6E565E] leading-relaxed">
                Relationship <code className="font-mono">1152934698746380288</code> connects 권은비 (
                <code className="font-mono">C01</code>) to <em>LE SSERAFIM</em> (
                <code className="font-mono">G02</code>) via <code className="font-mono">재데뷔하였다</code>,
                while 사쿠라 (<code className="font-mono">C02</code>) lacks that edge in the export.
                Preserved verbatim as an archival fidelity note.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
