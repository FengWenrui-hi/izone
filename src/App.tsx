import React from 'react';
import { parseNeo4jExport } from './data/neo4jGraph';
import { TopNav } from './components/TopNav';
import { HeroSection } from './components/HeroSection';
import { OverviewSection } from './components/OverviewSection';
import { MethodologySection } from './components/MethodologySection';
import { StaticGraphPlate } from './components/StaticGraphPlate';
import { StaticEntityCatalog } from './components/StaticEntityCatalog';
import { FindingsSection } from './components/FindingsSection';
import { TeamDeliverablesSection } from './components/TeamDeliverablesSection';

const GRAPH_DATA = parseNeo4jExport(false);
const DISTINCT_MEMBERS_COUNT = GRAPH_DATA.nodes.filter(
  (n) => n.labels.includes('인물') && n.id !== '42'
).length;

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#3B282E]">
      <TopNav />
      <main className="flex-1">
        <HeroSection
          stats={{
            distinctMembers: DISTINCT_MEMBERS_COUNT,
            rawNodeCount: GRAPH_DATA.nodes.length,
            rawRelationshipCount: GRAPH_DATA.relationships.length,
            categoryCount: 5,
          }}
        />
        <OverviewSection />
        <MethodologySection
          nodes={GRAPH_DATA.nodes}
          relationships={GRAPH_DATA.relationships}
        />
        <StaticGraphPlate graphData={GRAPH_DATA} />
        <StaticEntityCatalog graphData={GRAPH_DATA} />
        <FindingsSection graphData={GRAPH_DATA} />
        <TeamDeliverablesSection />
      </main>
    </div>
  );
}
