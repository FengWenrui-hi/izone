import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, Search, GitMerge, Tag } from 'lucide-react';
import {
  ENTITY_META,
  EntityLabelKr,
  GENRE_GLOSS,
  ParsedGraphData,
  RELATIONSHIP_META,
  RawNeo4jNode,
  getDisplayGloss,
} from '../data/neo4jGraph';

export type GraphPresetId = 'all' | 'activities' | 'units' | 'lineage' | 'anomaly';

interface GraphPreset {
  id: GraphPresetId;
  label: string;
  cypher: string;
  description: string;
  allowedLabels: EntityLabelKr[];
  allowedRelTypes?: string[];
}

const PRESETS: GraphPreset[] = [
  {
    id: 'all',
    label: 'Full Network',
    cypher: 'MATCH (n)-[r]->(m) RETURN n, r, m',
    description: 'All exported entities and relationships across all five schema categories.',
    allowedLabels: ['인물', '소속사', '아이돌그룹', '유닛', '해체후활동'],
  },
  {
    id: 'activities',
    label: 'Shared Activities',
    cypher: 'MATCH (p:인물)-[r:출연하였다]->(a:해체후활동) RETURN p, r, a',
    description: 'Post-disbandment programs, radio broadcasts, and magazine features connecting members.',
    allowedLabels: ['인물', '해체후활동'],
    allowedRelTypes: ['출연하였다'],
  },
  {
    id: 'units',
    label: 'Produce 48 Units',
    cypher: 'MATCH (p:인물)-[r:참여하였다]->(u:유닛) RETURN p, r, u',
    description: 'Competition teams formed during Produce 48 and their participating members.',
    allowedLabels: ['인물', '유닛'],
    allowedRelTypes: ['참여하였다'],
  },
  {
    id: 'lineage',
    label: 'Agencies & Groups',
    cypher: 'MATCH (p:인물)-[r:소속되었다|재데뷔하였다|활동했었다]->(t) OPTIONAL MATCH (t)-[m:관리된다]->(e:소속사) RETURN p, r, t, m, e',
    description: 'Member agency affiliations, pre-debut groups, redebut groups, and group-managing agencies.',
    allowedLabels: ['인물', '소속사', '아이돌그룹'],
    allowedRelTypes: ['소속되었다', '재데뷔하였다', '활동했었다', '관리된다'],
  },
  {
    id: 'anomaly',
    label: 'Node #42 Audit',
    cypher: "MATCH (p:인물 {id: '[ID-NUMBER]'})-[r]->(a)<-[r2]-(other:인물) RETURN p, r, a, r2, other",
    description: 'Inspect unmerged duplicate node #42 (혼다 히토미) linked to クイズTHE違和感 (A04).',
    allowedLabels: ['인물', '해체후활동'],
    allowedRelTypes: ['출연하였다'],
  },
];

interface NodePos {
  x: number;
  y: number;
}

const VIEW_W = 1040;
const VIEW_H = 680;
const CX = VIEW_W / 2;
const CY = VIEW_H / 2;

function computeInitialPositions(data: ParsedGraphData): Record<string, NodePos> {
  const pos: Record<string, NodePos> = {};

  const people = data.nodes.filter((n) => n.labels.includes('인물') && n.id !== '42');
  const units = data.nodes.filter((n) => n.labels.includes('유닛'));
  const activities = data.nodes.filter((n) => n.labels.includes('해체후활동'));
  const groups = data.nodes.filter((n) => n.labels.includes('아이돌그룹'));
  const agencies = data.nodes.filter((n) => n.labels.includes('소속사'));

  // Place 12 primary members on inner balanced ellipse
  people.forEach((n, idx) => {
    const angle = (idx / Math.max(people.length, 1)) * Math.PI * 2 - Math.PI / 2;
    pos[n.id] = {
      x: CX + Math.cos(angle) * 205,
      y: CY + Math.sin(angle) * 145,
    };
  });

  // Top-left sector: Produce 48 Units
  units.forEach((n, idx) => {
    const t = units.length > 1 ? idx / (units.length - 1) : 0.5;
    const angle = -Math.PI * 0.92 + t * (Math.PI * 0.42);
    pos[n.id] = {
      x: CX + Math.cos(angle) * 390,
      y: CY + Math.sin(angle) * 270,
    };
  });

  // Top-right sector: Post-disbandment Activities
  activities.forEach((n, idx) => {
    const t = activities.length > 1 ? idx / (activities.length - 1) : 0.5;
    const angle = -Math.PI * 0.42 + t * (Math.PI * 0.46);
    pos[n.id] = {
      x: CX + Math.cos(angle) * 400,
      y: CY + Math.sin(angle) * 270,
    };
  });

  // Bottom-right sector: Idol Groups
  groups.forEach((n, idx) => {
    const t = groups.length > 1 ? idx / (groups.length - 1) : 0.5;
    const angle = Math.PI * 0.12 + t * (Math.PI * 0.36);
    pos[n.id] = {
      x: CX + Math.cos(angle) * 370,
      y: CY + Math.sin(angle) * 255,
    };
  });

  // Bottom & left outer arc: Entertainment Agencies (15 nodes)
  agencies.forEach((n, idx) => {
    const t = agencies.length > 1 ? idx / (agencies.length - 1) : 0.5;
    const angle = Math.PI * 0.54 + t * (Math.PI * 0.5);
    const radiusBoost = idx % 2 === 0 ? 1 : 0.84;
    pos[n.id] = {
      x: CX + Math.cos(angle) * 440 * radiusBoost,
      y: CY + Math.sin(angle) * 290 * radiusBoost,
    };
  });

  // Unmerged duplicate #42 placed near A04 (node 40)
  if (data.nodeById.has('42')) {
    pos['42'] = { x: CX + 435, y: CY - 15 };
  }

  // Light deterministic force-relaxation keeping category sectors tidy
  const ids = Object.keys(pos);
  for (let iter = 0; iter < 45; iter++) {
    const forces: Record<string, { dx: number; dy: number }> = {};
    for (const id of ids) forces[id] = { dx: 0, dy: 0 };

    // Repulsion between nearby nodes so labels don't overlap
    for (let i = 0; i < ids.length; i++) {
      for (let j = i + 1; j < ids.length; j++) {
        const a = ids[i];
        const b = ids[j];
        const dx = pos[b].x - pos[a].x;
        const dy = pos[b].y - pos[a].y;
        const dist = Math.hypot(dx, dy) || 1;
        const minDist = 74;
        if (dist < minDist) {
          const push = ((minDist - dist) / dist) * 0.35;
          forces[a].dx -= dx * push;
          forces[a].dy -= dy * push;
          forces[b].dx += dx * push;
          forces[b].dy += dy * push;
        }
      }
    }

    // Gentle attraction along edges for outer non-person nodes
    for (const rel of data.relationships) {
      const s = pos[rel.start.id];
      const e = pos[rel.end.id];
      if (!s || !e) continue;
      const dx = e.x - s.x;
      const dy = e.y - s.y;
      const endNode = data.nodeById.get(rel.end.id);
      if (endNode && !endNode.labels.includes('인물')) {
        forces[rel.end.id].dx -= dx * 0.015;
        forces[rel.end.id].dy -= dy * 0.015;
      }
    }

    for (const id of ids) {
      pos[id].x = Math.max(70, Math.min(VIEW_W - 70, pos[id].x + forces[id].dx));
      pos[id].y = Math.max(55, Math.min(VIEW_H - 55, pos[id].y + forces[id].dy));
    }
  }

  return pos;
}

interface GraphExplorerProps {
  rawGraph: ParsedGraphData;
  mergedGraph: ParsedGraphData;
  mergeDuplicates: boolean;
  onToggleMergeDuplicates: () => void;
  selectedNodeId: string | null;
  onSelectNodeId: (id: string | null) => void;
  presetOverride: GraphPresetId | null;
  onClearPresetOverride: () => void;
}

export function GraphExplorer({
  rawGraph,
  mergedGraph,
  mergeDuplicates,
  onToggleMergeDuplicates,
  selectedNodeId,
  onSelectNodeId,
  presetOverride,
  onClearPresetOverride,
}: GraphExplorerProps) {
  const activeGraph = mergeDuplicates ? mergedGraph : rawGraph;

  const [activePreset, setActivePreset] = useState<GraphPresetId>('all');
  const [visibleCategories, setVisibleCategories] = useState<Record<EntityLabelKr, boolean>>({
    인물: true,
    소속사: true,
    아이돌그룹: true,
    유닛: true,
    해체후활동: true,
  });
  const [showEdgeLabels, setShowEdgeLabels] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [positions, setPositions] = useState<Record<string, NodePos>>(() =>
    computeInitialPositions(activeGraph)
  );

  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragState = useRef<{
    type: 'node' | 'pan' | null;
    nodeId?: string;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
  }>({ type: null, startX: 0, startY: 0, origX: 0, origY: 0 });

  useEffect(() => {
    setPositions(computeInitialPositions(activeGraph));
  }, [mergeDuplicates]);

  useEffect(() => {
    if (presetOverride) {
      applyPreset(presetOverride);
      onClearPresetOverride();
    }
  }, [presetOverride]);

  const applyPreset = (id: GraphPresetId) => {
    setActivePreset(id);
    const preset = PRESETS.find((p) => p.id === id) ?? PRESETS[0];
    setVisibleCategories({
      인물: preset.allowedLabels.includes('인물'),
      소속사: preset.allowedLabels.includes('소속사'),
      아이돌그룹: preset.allowedLabels.includes('아이돌그룹'),
      유닛: preset.allowedLabels.includes('유닛'),
      해체후활동: preset.allowedLabels.includes('해체후활동'),
    });
    if (id === 'anomaly') {
      if (mergeDuplicates) {
        onToggleMergeDuplicates();
      }
      onSelectNodeId('42');
    } else if (id === 'activities') {
      setShowEdgeLabels(true);
    }
  };

  const currentPresetObj = PRESETS.find((p) => p.id === activePreset) ?? PRESETS[0];

  const { filteredNodes, filteredRels } = useMemo(() => {
    const allowedRelTypes = currentPresetObj.allowedRelTypes;

    const rels = activeGraph.relationships.filter((rel) => {
      if (allowedRelTypes && !allowedRelTypes.includes(rel.label)) return false;
      const startNode = activeGraph.nodeById.get(rel.start.id);
      const endNode = activeGraph.nodeById.get(rel.end.id);
      if (!startNode || !endNode) return false;
      const sVis = startNode.labels.some((l) => visibleCategories[l]);
      const eVis = endNode.labels.some((l) => visibleCategories[l]);
      if (!sVis || !eVis) return false;
      if (activePreset === 'anomaly') {
        return rel.end.id === '40';
      }
      return true;
    });

    const nodeIdsInAnomaly = new Set<string>();
    if (activePreset === 'anomaly') {
      rels.forEach((r) => {
        nodeIdsInAnomaly.add(r.start.id);
        nodeIdsInAnomaly.add(r.end.id);
      });
    }

    const nodes = activeGraph.nodes.filter((node) => {
      if (!node.labels.some((l) => visibleCategories[l])) return false;
      if (activePreset === 'anomaly') {
        return nodeIdsInAnomaly.has(node.id);
      }
      return true;
    });

    return { filteredNodes: nodes, filteredRels: rels };
  }, [activeGraph, visibleCategories, currentPresetObj, activePreset]);

  const highlightedIds = useMemo(() => {
    const set = new Set<string>();
    const q = searchQuery.trim().toLowerCase();

    if (selectedNodeId) {
      set.add(selectedNodeId);
      for (const rel of filteredRels) {
        if (rel.start.id === selectedNodeId) set.add(rel.end.id);
        if (rel.end.id === selectedNodeId) set.add(rel.start.id);
      }
      return set;
    }

    if (q.length > 0) {
      for (const n of filteredNodes) {
        const gloss = getDisplayGloss(n).toLowerCase();
        if (
          n.properties.name.toLowerCase().includes(q) ||
          n.properties.id.toLowerCase().includes(q) ||
          gloss.includes(q)
        ) {
          set.add(n.id);
        }
      }
    }
    return set;
  }, [selectedNodeId, searchQuery, filteredNodes, filteredRels]);

  const hasFocus = selectedNodeId !== null || searchQuery.trim().length > 0;

  const selectedNode: RawNeo4jNode | null = selectedNodeId
    ? activeGraph.nodeById.get(selectedNodeId) ?? null
    : null;

  const selectedEdges = useMemo(() => {
    if (!selectedNodeId) return { outgoing: [], incoming: [] };
    return {
      outgoing: activeGraph.relationships.filter((r) => r.start.id === selectedNodeId),
      incoming: activeGraph.relationships.filter((r) => r.end.id === selectedNodeId),
    };
  }, [selectedNodeId, activeGraph]);

  const handleSvgPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if ((e.target as Element).closest('[data-node-id]')) return;
    dragState.current = {
      type: 'pan',
      startX: e.clientX,
      startY: e.clientY,
      origX: pan.x,
      origY: pan.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleNodePointerDown = (e: React.PointerEvent<SVGGElement>, nodeId: string) => {
    e.stopPropagation();
    const p = positions[nodeId] ?? { x: CX, y: CY };
    dragState.current = {
      type: 'node',
      nodeId,
      startX: e.clientX,
      startY: e.clientY,
      origX: p.x,
      origY: p.y,
    };
    onSelectNodeId(nodeId);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const st = dragState.current;
    if (!st.type || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = VIEW_W / rect.width / zoom;
    const scaleY = VIEW_H / rect.height / zoom;

    if (st.type === 'pan') {
      setPan({
        x: st.origX + (e.clientX - st.startX) * scaleX,
        y: st.origY + (e.clientY - st.startY) * scaleY,
      });
    } else if (st.type === 'node' && st.nodeId) {
      const nx = st.origX + (e.clientX - st.startX) * scaleX;
      const ny = st.origY + (e.clientY - st.startY) * scaleY;
      setPositions((prev) => ({
        ...prev,
        [st.nodeId!]: {
          x: Math.max(35, Math.min(VIEW_W - 35, nx)),
          y: Math.max(35, Math.min(VIEW_H - 35, ny)),
        },
      }));
    }
  };

  const handlePointerUp = () => {
    dragState.current.type = null;
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setPositions(computeInitialPositions(activeGraph));
    onSelectNodeId(null);
    setSearchQuery('');
    applyPreset('all');
    setShowEdgeLabels(false);
  };

  return (
    <section id="graph" className="bg-[#FDFBF7] border-b border-[#EBDCE0] py-20 lg:py-24">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div>
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#6E565E] mb-2">
              03 · Interactive Graph Explorer
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#B85A74]">
              Neo4j Knowledge Graph Canvas
            </h2>
            <p className="text-sm text-[#6E565E] mt-2 max-w-2xl">
              Inspect nodes and relationships directly from the exported Neo4j database. Click any
              node to isolate its connections, drag nodes to rearrange, or run a preset Cypher view.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onToggleMergeDuplicates}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                mergeDuplicates
                  ? 'bg-[#EDF0FC] border-[#6C7FC0] text-[#394985]'
                  : 'bg-[#FAF6F0] border-[#EBDCE0] text-[#3B282E] hover:border-[#C65B7A]'
              }`}
            >
              <GitMerge className="w-3.5 h-3.5" aria-hidden="true" />
              <span>
                {mergeDuplicates ? 'Merged View (42 nodes)' : 'Raw Export (43 nodes)'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setShowEdgeLabels((v) => !v)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                showEdgeLabels
                  ? 'bg-[#FBECEF] border-[#C65B7A] text-[#8D2D49]'
                  : 'bg-[#FAF6F0] border-[#EBDCE0] text-[#3B282E] hover:border-[#C65B7A]'
              }`}
            >
              <Tag className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{showEdgeLabels ? 'Hide Edge Labels' : 'Show Edge Labels'}</span>
            </button>
          </div>
        </div>

        {/* Cypher Preset Bar */}
        <div className="bg-[#FAF6F0] border border-[#EBDCE0] p-4 mb-6 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => applyPreset(p.id)}
                  className={`px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    activePreset === p.id
                      ? 'bg-[#C65B7A] text-white'
                      : 'bg-[#FDFBF7] text-[#3B282E] border border-[#EBDCE0] hover:border-[#C65B7A]'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search
                className="w-3.5 h-3.5 text-[#6E565E] absolute left-3 top-1/2 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (selectedNodeId) onSelectNodeId(null);
                }}
                placeholder="Search name or ID (e.g. 최예나, C04)"
                aria-label="Search graph nodes"
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FDFBF7] border border-[#EBDCE0] text-[#3B282E] placeholder:text-[#6E565E]/70 focus:outline-none focus:border-[#C65B7A]"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#EBDCE0]/80 text-xs">
            <code className="font-mono text-[11px] text-[#4A5B8C] bg-[#F2F4FC] px-2.5 py-1 border border-[#C8D3F0]/60 overflow-x-auto">
              {currentPresetObj.cypher}
            </code>
            <span className="text-[#6E565E] tabular-nums shrink-0">
              Showing {filteredNodes.length} nodes · {filteredRels.length} edges
            </span>
          </div>
        </div>

        {/* Main Workspace: Graph Canvas + Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Interactive SVG Canvas */}
          <div className="lg:col-span-8 bg-[#FAF6F0] border border-[#EBDCE0] relative flex flex-col">
            {/* Category Filter & Zoom Toolbar */}
            <div className="px-4 py-3 border-b border-[#EBDCE0] bg-[#FDFBF7] flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                {(Object.keys(ENTITY_META) as EntityLabelKr[]).map((cat) => {
                  const meta = ENTITY_META[cat];
                  const active = visibleCategories[cat];
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        setVisibleCategories((prev) => ({ ...prev, [cat]: !prev[cat] }))
                      }
                      aria-pressed={active}
                      className={`inline-flex items-center gap-1.5 text-xs py-1 px-2 border transition-opacity whitespace-nowrap shrink-0 ${
                        active
                          ? 'border-[#EBDCE0] bg-[#FDFBF7] text-[#3B282E]'
                          : 'border-transparent bg-transparent text-[#6E565E] opacity-50'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: meta.color }}
                        aria-hidden="true"
                      />
                      <span>{meta.en}</span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(2.2, +(z + 0.2).toFixed(2)))}
                  aria-label="Zoom in"
                  className="w-8 h-8 inline-flex items-center justify-center border border-[#EBDCE0] bg-[#FDFBF7] text-[#3B282E] hover:border-[#C65B7A]"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(0.6, +(z - 0.2).toFixed(2)))}
                  aria-label="Zoom out"
                  className="w-8 h-8 inline-flex items-center justify-center border border-[#EBDCE0] bg-[#FDFBF7] text-[#3B282E] hover:border-[#C65B7A]"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={resetView}
                  aria-label="Reset graph layout and filters"
                  className="w-8 h-8 inline-flex items-center justify-center border border-[#EBDCE0] bg-[#FDFBF7] text-[#3B282E] hover:border-[#C65B7A]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* SVG Viewport */}
            <div className="relative h-[540px] sm:h-[600px] overflow-hidden select-none">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                className="w-full h-full cursor-grab active:cursor-grabbing"
                onPointerDown={handleSvgPointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerLeave={handlePointerUp}
                role="img"
                aria-label="Interactive IZ*ONE Neo4j Knowledge Graph"
              >
                <defs>
                  <marker
                    id="arrow-soft"
                    viewBox="0 0 10 10"
                    refX="18"
                    refY="5"
                    markerWidth="5"
                    markerHeight="5"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#B6A3A9" />
                  </marker>
                  <marker
                    id="arrow-active"
                    viewBox="0 0 10 10"
                    refX="18"
                    refY="5"
                    markerWidth="5.5"
                    markerHeight="5.5"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#C65B7A" />
                  </marker>
                </defs>

                <g
                  transform={`translate(${CX}, ${CY}) scale(${zoom}) translate(${-CX + pan.x}, ${
                    -CY + pan.y
                  })`}
                >
                  {/* Edges */}
                  {filteredRels.map((rel) => {
                    const p1 = positions[rel.start.id];
                    const p2 = positions[rel.end.id];
                    if (!p1 || !p2) return null;

                    const isSelectedEdge =
                      selectedNodeId !== null &&
                      (rel.start.id === selectedNodeId || rel.end.id === selectedNodeId);
                    const dimmed = hasFocus && !isSelectedEdge;

                    const midX = (p1.x + p2.x) / 2;
                    const midY = (p1.y + p2.y) / 2;

                    return (
                      <g key={rel.id} opacity={dimmed ? 0.14 : isSelectedEdge ? 1 : 0.72}>
                        <line
                          x1={p1.x}
                          y1={p1.y}
                          x2={p2.x}
                          y2={p2.y}
                          stroke={isSelectedEdge ? '#C65B7A' : '#CDBEC3'}
                          strokeWidth={isSelectedEdge ? 2 : 1.15}
                          markerEnd={isSelectedEdge ? 'url(#arrow-active)' : 'url(#arrow-soft)'}
                        />
                        {(showEdgeLabels || isSelectedEdge) && (
                          <text
                            x={midX}
                            y={midY - 4}
                            textAnchor="middle"
                            fontSize="8.5"
                            fill={isSelectedEdge ? '#8D2D49' : '#6E565E'}
                            className="pointer-events-none font-sans"
                          >
                            {rel.label}
                          </text>
                        )}
                      </g>
                    );
                  })}

                  {/* Nodes */}
                  {filteredNodes.map((node) => {
                    const p = positions[node.id];
                    if (!p) return null;
                    const label = node.labels[0];
                    const meta = ENTITY_META[label];
                    const isPerson = label === '인물';
                    const isSelected = node.id === selectedNodeId;
                    const isNeighbor = highlightedIds.has(node.id);
                    const dimmed = hasFocus && !isNeighbor;
                    const radius = isPerson ? 15 : 11;
                    const isAnomaly = node.id === '42';

                    return (
                      <g
                        key={node.id}
                        data-node-id={node.id}
                        transform={`translate(${p.x}, ${p.y})`}
                        onPointerDown={(e) => handleNodePointerDown(e, node.id)}
                        className="cursor-pointer"
                        opacity={dimmed ? 0.22 : 1}
                      >
                        {isSelected && (
                          <circle
                            r={radius + 6}
                            fill="none"
                            stroke="#C65B7A"
                            strokeWidth="1.5"
                            strokeDasharray="3 2"
                          />
                        )}
                        <circle
                          r={radius}
                          fill={meta.color}
                          stroke={isAnomaly ? '#3B282E' : '#FDFBF7'}
                          strokeWidth={isAnomaly ? 2 : 2}
                        />
                        <text
                          y={radius + 13}
                          textAnchor="middle"
                          fontSize={isPerson ? '10.5' : '9.5'}
                          fontWeight={isSelected || isPerson ? '600' : '500'}
                          fill="#3B282E"
                          className="pointer-events-none select-none"
                        >
                          {node.properties.name}
                          {isAnomaly ? ' (#42)' : ''}
                        </text>
                      </g>
                    );
                  })}
                </g>
              </svg>

              {selectedNodeId && (
                <button
                  type="button"
                  onClick={() => onSelectNodeId(null)}
                  className="absolute bottom-3 left-3 px-3 py-1.5 text-xs font-medium bg-[#FDFBF7] border border-[#EBDCE0] text-[#3B282E] hover:border-[#C65B7A]"
                >
                  Clear node selection
                </button>
              )}
            </div>
          </div>

          {/* Node Inspector Sidebar */}
          <aside className="lg:col-span-4 bg-[#FDFBF7] border border-[#EBDCE0] p-6 flex flex-col justify-between">
            {selectedNode ? (
              <div className="space-y-6">
                <div className="border-b border-[#EBDCE0] pb-4">
                  <p className="text-xs font-mono text-[#6E565E] mb-1">
                    Neo4j #{selectedNode.id} · Property ID {selectedNode.properties.id}
                  </p>
                  <h3 className="font-serif text-2xl font-semibold text-[#3B282E]">
                    {selectedNode.properties.name}
                  </h3>
                  <p className="text-sm text-[#6E565E] mt-0.5">{getDisplayGloss(selectedNode)}</p>
                  <p className="text-xs text-[#AD4664] mt-2 font-medium">
                    {ENTITY_META[selectedNode.labels[0]].en} · {selectedNode.labels[0]}
                  </p>
                </div>

                {/* Properties */}
                {(selectedNode.properties.데뷔년도 || selectedNode.properties.장르) && (
                  <dl className="grid grid-cols-2 gap-3 text-xs border-b border-[#EBDCE0] pb-4">
                    {selectedNode.properties.데뷔년도 && (
                      <div>
                        <dt className="text-[#6E565E]">Debut Year (데뷔년도)</dt>
                        <dd className="font-mono text-sm font-medium text-[#3B282E] tabular-nums mt-0.5">
                          {selectedNode.properties.데뷔년도}
                        </dd>
                      </div>
                    )}
                    {selectedNode.properties.장르 && (
                      <div>
                        <dt className="text-[#6E565E]">Genre (장르)</dt>
                        <dd className="text-sm font-medium text-[#3B282E] mt-0.5">
                          {selectedNode.properties.장르} (
                          {GENRE_GLOSS[selectedNode.properties.장르] ??
                            selectedNode.properties.장르}
                          )
                        </dd>
                      </div>
                    )}
                  </dl>
                )}

                {selectedNode.id === '42' && (
                  <div className="bg-[#FAF6F0] border border-[#EBDCE0] p-3 text-xs text-[#3B282E] leading-relaxed">
                    <strong className="font-medium text-[#AD4664]">Export Audit Note:</strong> This
                    node (<code className="font-mono">id: "[ID-NUMBER]"</code>) represents an
                    unmerged duplicate record for 혼다 히토미 (<code className="font-mono">C09</code>)
                    in the raw Neo4j export. Toggle “Merged View” above to unify it.
                  </div>
                )}

                {/* Outgoing & Incoming Edges */}
                <div className="space-y-4 max-h-[340px] overflow-y-auto pr-1">
                  {selectedEdges.outgoing.length > 0 && (
                    <div>
                      <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#6E565E] mb-2">
                        Outgoing ({selectedEdges.outgoing.length})
                      </p>
                      <ul className="divide-y divide-[#EBDCE0]/70 border-t border-b border-[#EBDCE0]/70">
                        {selectedEdges.outgoing.map((rel) => {
                          const target = activeGraph.nodeById.get(rel.end.id);
                          if (!target) return null;
                          return (
                            <li key={rel.id} className="py-2 flex items-center justify-between gap-2 text-xs">
                              <span className="text-[#6E565E] shrink-0">
                                {RELATIONSHIP_META[rel.label].en} ({rel.label})
                              </span>
                              <button
                                type="button"
                                onClick={() => onSelectNodeId(target.id)}
                                className="font-medium text-[#AD4664] hover:underline text-right truncate"
                              >
                                {target.properties.name} &rarr;
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {selectedEdges.incoming.length > 0 && (
                    <div>
                      <p className="text-xs font-medium tracking-[0.14em] uppercase text-[#6E565E] mb-2">
                        Incoming ({selectedEdges.incoming.length})
                      </p>
                      <ul className="divide-y divide-[#EBDCE0]/70 border-t border-b border-[#EBDCE0]/70">
                        {selectedEdges.incoming.map((rel) => {
                          const source = activeGraph.nodeById.get(rel.start.id);
                          if (!source) return null;
                          return (
                            <li key={rel.id} className="py-2 flex items-center justify-between gap-2 text-xs">
                              <button
                                type="button"
                                onClick={() => onSelectNodeId(source.id)}
                                className="font-medium text-[#AD4664] hover:underline text-left truncate"
                              >
                                {source.properties.name}
                              </button>
                              <span className="text-[#6E565E] shrink-0">
                                {RELATIONSHIP_META[rel.label].en} ({rel.label})
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col justify-between">
                <div>
                  <p className="text-xs font-medium tracking-[0.16em] uppercase text-[#6E565E] mb-2">
                    Node Inspector
                  </p>
                  <h3 className="font-serif text-2xl font-medium text-[#3B282E] mb-3">
                    Select any node to inspect
                  </h3>
                  <p className="text-sm text-[#6E565E] leading-relaxed">
                    Click a member, agency, group, Produce 48 unit, or post-disbandment activity
                    on the canvas to examine its Neo4j properties and directional edges.
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-[#EBDCE0]">
                  <p className="text-xs font-medium text-[#3B282E] mb-3">
                    Quick Member Selection
                  </p>
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
                    {activeGraph.nodes
                      .filter((n) => n.labels.includes('인물') && n.id !== '42')
                      .map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => onSelectNodeId(m.id)}
                          className="text-left text-xs py-1 text-[#6E565E] hover:text-[#AD4664] truncate"
                        >
                          <span className="font-mono text-[10px] mr-1.5 text-[#AD4664]">
                            {m.properties.id}
                          </span>
                          {m.properties.name}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
