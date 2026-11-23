import React, { useMemo, useState } from 'react';
import { Search, ArrowUpRight } from 'lucide-react';
import {
  ENTITY_META,
  EntityLabelKr,
  GENRE_GLOSS,
  ParsedGraphData,
  RELATIONSHIP_META,
  RelationshipLabelKr,
  getDisplayGloss,
} from '../data/neo4jGraph';

interface ActivityExplorerProps {
  graphData: ParsedGraphData;
  categoryFilter: EntityLabelKr | 'ALL';
  onChangeCategoryFilter: (cat: EntityLabelKr | 'ALL') => void;
  relationshipFilter: RelationshipLabelKr | 'ALL';
  onChangeRelationshipFilter: (rel: RelationshipLabelKr | 'ALL') => void;
  onInspectInGraph: (nodeId: string) => void;
}

export function ActivityExplorer({
  graphData,
  categoryFilter,
  onChangeCategoryFilter,
  relationshipFilter,
  onChangeRelationshipFilter,
  onInspectInGraph,
}: ActivityExplorerProps) {
  const [query, setQuery] = useState('');

  const nodeConnections = useMemo(() => {
    const map = new Map<
      string,
      {
        outgoing: { relLabel: RelationshipLabelKr; targetId: string; targetName: string }[];
        incoming: { relLabel: RelationshipLabelKr; sourceId: string; sourceName: string }[];
      }
    >();

    for (const node of graphData.nodes) {
      map.set(node.id, { outgoing: [], incoming: [] });
    }

    for (const rel of graphData.relationships) {
      const startEntry = map.get(rel.start.id);
      const endEntry = map.get(rel.end.id);
      if (startEntry) {
        startEntry.outgoing.push({
          relLabel: rel.label,
          targetId: rel.end.id,
          targetName: rel.end.properties.name,
        });
      }
      if (endEntry) {
        endEntry.incoming.push({
          relLabel: rel.label,
          sourceId: rel.start.id,
          sourceName: rel.start.properties.name,
        });
      }
    }

    return map;
  }, [graphData]);

  const filteredNodes = useMemo(() => {
    const q = query.trim().toLowerCase();

    return graphData.nodes.filter((node) => {
      if (categoryFilter !== 'ALL' && !node.labels.includes(categoryFilter)) {
        return false;
      }

      if (relationshipFilter !== 'ALL') {
        const conns = nodeConnections.get(node.id);
        const hasRel =
          conns?.outgoing.some((c) => c.relLabel === relationshipFilter) ||
          conns?.incoming.some((c) => c.relLabel === relationshipFilter);
        if (!hasRel) return false;
      }

      if (q.length > 0) {
        const gloss = getDisplayGloss(node).toLowerCase();
        const name = node.properties.name.toLowerCase();
        const propId = node.properties.id.toLowerCase();
        const conns = nodeConnections.get(node.id);
        const connectedMatch =
          conns?.outgoing.some((c) => c.targetName.toLowerCase().includes(q)) ||
          conns?.incoming.some((c) => c.sourceName.toLowerCase().includes(q));
        return name.includes(q) || gloss.includes(q) || propId.includes(q) || Boolean(connectedMatch);
      }

      return true;
    });
  }, [graphData, categoryFilter, relationshipFilter, query, nodeConnections]);

  const categories: { id: EntityLabelKr | 'ALL'; label: string }[] = [
    { id: 'ALL', label: 'All Entities' },
    { id: '인물', label: 'People' },
    { id: '소속사', label: 'Agencies' },
    { id: '아이돌그룹', label: 'Idol Groups' },
    { id: '유닛', label: 'Produce 48 Units' },
    { id: '해체후활동', label: 'Activities' },
  ];

  return (
    <section id="explorer" className="bg-[#FAF6F0] border-b border-[#EBDCE0] py-20 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#6E565E] mb-2">
              04 · Activity & Entity Explorer
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#B85A74]">
              Browse Records & Affiliations
            </h2>
            <p className="text-sm text-[#6E565E] mt-2 max-w-xl">
              Filter every member, entertainment agency, idol group, Produce 48 unit, and
              post-disbandment activity recorded in the supplied Neo4j dataset.
            </p>
          </div>
          <p className="font-mono text-xs text-[#6E565E] tabular-nums">
            Displaying {filteredNodes.length} of {graphData.nodes.length} records
          </p>
        </div>

        {/* Filter Controls */}
        <div className="bg-[#FDFBF7] border border-[#EBDCE0] p-4 mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Category Segmented Tabs */}
          <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filter by entity category">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={categoryFilter === cat.id}
                onClick={() => onChangeCategoryFilter(cat.id)}
                className={`px-3.5 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                  categoryFilter === cat.id
                    ? 'bg-[#C65B7A] text-white'
                    : 'bg-[#FAF6F0] text-[#3B282E] hover:bg-[#FBECEF]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Relationship Filter */}
            <select
              value={relationshipFilter}
              onChange={(e) =>
                onChangeRelationshipFilter(e.target.value as RelationshipLabelKr | 'ALL')
              }
              aria-label="Filter by relationship type"
              className="px-3 py-2 text-xs bg-[#FAF6F0] border border-[#EBDCE0] text-[#3B282E] focus:outline-none focus:border-[#C65B7A]"
            >
              <option value="ALL">All Relationship Types</option>
              {(Object.keys(RELATIONSHIP_META) as RelationshipLabelKr[]).map((rel) => (
                <option key={rel} value={rel}>
                  {RELATIONSHIP_META[rel].en} ({rel})
                </option>
              ))}
            </select>

            {/* Search Input */}
            <div className="relative sm:w-64">
              <Search
                className="w-3.5 h-3.5 text-[#6E565E] absolute left-3 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search entity or member..."
                aria-label="Search entity directory"
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF6F0] border border-[#EBDCE0] text-[#3B282E] placeholder:text-[#6E565E]/70 focus:outline-none focus:border-[#C65B7A]"
              />
            </div>
          </div>
        </div>

        {/* Entity Directory Grid */}
        {filteredNodes.length === 0 ? (
          <div className="bg-[#FDFBF7] border border-[#EBDCE0] p-12 text-center">
            <p className="font-serif text-xl text-[#3B282E]">No matching records found</p>
            <p className="text-sm text-[#6E565E] mt-1">
              Clear your search term or reset the category and relationship filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                onChangeCategoryFilter('ALL');
                onChangeRelationshipFilter('ALL');
              }}
              className="mt-5 px-5 py-2 text-xs font-medium uppercase tracking-wider bg-[#C65B7A] text-white hover:bg-[#AD4664]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredNodes.map((node) => {
              const cat = node.labels[0];
              const meta = ENTITY_META[cat];
              const conns = nodeConnections.get(node.id);
              const totalConns =
                (conns?.outgoing.length ?? 0) + (conns?.incoming.length ?? 0);

              return (
                <article
                  key={node.id}
                  className="bg-[#FDFBF7] border border-[#EBDCE0] p-6 flex flex-col justify-between"
                >
                  <div>
                    {/* Quiet unboxed metadata line (zero pills!) */}
                    <div className="flex items-center justify-between gap-2 text-xs text-[#6E565E] mb-2">
                      <span className="truncate">
                        {meta.en} · <span className="font-mono">{node.properties.id}</span>
                      </span>
                      <span className="font-mono tabular-nums shrink-0">
                        {totalConns} {totalConns === 1 ? 'link' : 'links'}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-[#3B282E] leading-snug">
                      {node.properties.name}
                    </h3>
                    <p className="text-xs text-[#6E565E] mt-0.5">
                      {getDisplayGloss(node)}
                      {node.properties.데뷔년도 && ` · Debut ${node.properties.데뷔년도}`}
                      {node.properties.장르 &&
                        ` · ${node.properties.장르} (${
                          GENRE_GLOSS[node.properties.장르] ?? node.properties.장르
                        })`}
                    </p>

                    {/* Connected Records List */}
                    <div className="mt-4 pt-4 border-t border-[#EBDCE0]/80 space-y-1.5 text-xs">
                      {conns?.outgoing.map((c, idx) => (
                        <div key={`out-${idx}`} className="flex items-baseline justify-between gap-2">
                          <span className="text-[#6E565E] shrink-0">
                            {RELATIONSHIP_META[c.relLabel].en}
                          </span>
                          <span className="font-medium text-[#3B282E] text-right truncate">
                            {c.targetName}
                          </span>
                        </div>
                      ))}
                      {conns?.incoming.map((c, idx) => (
                        <div key={`in-${idx}`} className="flex items-baseline justify-between gap-2">
                          <span className="text-[#6E565E] shrink-0">
                            ← {RELATIONSHIP_META[c.relLabel].en}
                          </span>
                          <span className="font-medium text-[#3B282E] text-right truncate">
                            {c.sourceName}
                          </span>
                        </div>
                      ))}
                      {totalConns === 0 && (
                        <p className="text-[#6E565E] italic">No edges recorded in export</p>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-[#EBDCE0]/60 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#6E565E]">
                      Neo4j #{node.id}
                    </span>
                    <button
                      type="button"
                      onClick={() => onInspectInGraph(node.id)}
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#AD4664] hover:underline underline-offset-4"
                    >
                      <span>Highlight in Graph</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
