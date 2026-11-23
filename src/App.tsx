import React, { useMemo, useState } from 'react';
import {
  EntityLabelKr,
  RelationshipLabelKr,
  parseNeo4jExport,
} from './data/neo4jGraph';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { OverviewSection } from './components/OverviewSection';
import { MethodologySection } from './components/MethodologySection';
import { GraphExplorer, GraphPresetId } from './components/GraphExplorer';
import { ActivityExplorer } from './components/ActivityExplorer';
import { FindingsSection } from './components/FindingsSection';
import { TeamDeliverablesSection } from './components/TeamDeliverablesSection';

export default function App() {
  const rawGraph = useMemo(() => parseNeo4jExport(false), []);
  const mergedGraph = useMemo(() => parseNeo4jExport(true), []);

  const [mergeDuplicates, setMergeDuplicates] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [presetOverride, setPresetOverride] = useState<GraphPresetId | null>(null);

  const [explorerCategory, setExplorerCategory] = useState<EntityLabelKr | 'ALL'>('ALL');
  const [explorerRelationship, setExplorerRelationship] = useState<RelationshipLabelKr | 'ALL'>(
    'ALL'
  );

  const activeGraph = mergeDuplicates ? mergedGraph : rawGraph;

  const distinctMembersCount = useMemo(
    () => rawGraph.nodes.filter((n) => n.labels.includes('인물') && n.id !== '42').length,
    [rawGraph]
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryFromSchema = (cat: EntityLabelKr) => {
    setExplorerCategory(cat);
    setExplorerRelationship('ALL');
    scrollToSection('explorer');
  };

  const handleSelectRelationshipFromSchema = (rel: RelationshipLabelKr) => {
    setExplorerCategory('ALL');
    setExplorerRelationship(rel);
    scrollToSection('explorer');
  };

  const handleInspectNodeInGraph = (nodeId: string, preset?: GraphPresetId) => {
    if (nodeId === '42' && mergeDuplicates) {
      setMergeDuplicates(false);
    }
    if (preset) {
      setPresetOverride(preset);
    }
    setSelectedNodeId(nodeId);
    scrollToSection('graph');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#3B282E]">
      <TopNav />
      <main className="flex-1">
        <HeroSection
          stats={{
            distinctMembers: distinctMembersCount,
            rawNodeCount: rawGraph.nodes.length,
            rawRelationshipCount: rawGraph.relationships.length,
            categoryCount: 5,
          }}
        />
        <OverviewSection />
        <MethodologySection
          nodes={activeGraph.nodes}
          relationships={activeGraph.relationships}
          onSelectCategoryFilter={handleSelectCategoryFromSchema}
          onSelectRelationshipFilter={handleSelectRelationshipFromSchema}
        />
        <GraphExplorer
          rawGraph={rawGraph}
          mergedGraph={mergedGraph}
          mergeDuplicates={mergeDuplicates}
          onToggleMergeDuplicates={() => setMergeDuplicates((v) => !v)}
          selectedNodeId={selectedNodeId}
          onSelectNodeId={setSelectedNodeId}
          presetOverride={presetOverride}
          onClearPresetOverride={() => setPresetOverride(null)}
        />
        <ActivityExplorer
          graphData={activeGraph}
          categoryFilter={explorerCategory}
          onChangeCategoryFilter={setExplorerCategory}
          relationshipFilter={explorerRelationship}
          onChangeRelationshipFilter={setExplorerRelationship}
          onInspectInGraph={(nodeId) => handleInspectNodeInGraph(nodeId, 'all')}
        />
        <FindingsSection
          rawGraph={rawGraph}
          activeGraph={activeGraph}
          mergeDuplicates={mergeDuplicates}
          onInspectNodeInGraph={handleInspectNodeInGraph}
        />
        <TeamDeliverablesSection />
      </main>
    </div>
  );
}
