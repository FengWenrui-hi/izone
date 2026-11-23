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
  onSelectCategoryFilter: (cat: EntityLabelKr) => void;
  onSelectRelationshipFilter: (rel: RelationshipLabelKr) => void;
}

const STEPS = [
  {
    step: 'Step One',
    bowColor: '#D59C5C',
    title: 'Collection & Validation',
    body: 'Records were gathered from Namuwiki and cross-checked against official agency and broadcast sources, retaining source identifiers and excluding unverified rumors.',
  },
  {
    step: 'Step Two',
    bowColor: '#C65B7A',
    title: 'Neo4j Graph Modeling',
    body: 'Entities were standardized with Korean primary labels across five node classes and six directional relationship types linking people, agencies, groups, units, and activities.',
  },
  {
    step: 'Step Three',
    bowColor: '#6C7FC0',
    title: 'Dataset Scope Audit',
    body: 'While the project proposal planned 126 activity-related records, this public interface renders strictly from the supplied Neo4j JSON export (43 raw nodes, 47 edges) without fabrication.',
  },
];

export function MethodologySection({
  nodes,
  relationships,
  onSelectCategoryFilter,
  onSelectRelationshipFilter,
}: MethodologyProps) {
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
        {/* Framed Ivory Sheet inside Striped Editorial Band (inspired by Build Your Box frame) */}
        <div className="bg-[#FDFBF7] border border-[#EBDCE0] px-8 py-12 sm:px-12 sm:py-16">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#6E565E] mb-3">
              02 · Data & Methodology
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#B85A74]">
              Constructing the Knowledge Graph
            </h2>
            <p className="text-sm text-[#6E565E] mt-3 leading-relaxed">
              Source validation, Neo4j schema architecture, and strict parity between the
              exported JSON file and every displayed metric.
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

          {/* Interactive Schema Breakdown Tables */}
          <div className="pt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Entity Categories Table */}
            <div>
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-serif text-2xl font-medium text-[#3B282E]">
                  Entity Categories
                </h3>
                <span className="text-xs font-mono text-[#6E565E] tabular-nums">
                  {nodes.length} exported nodes
                </span>
              </div>
              <div className="divide-y divide-[#EBDCE0] border-t border-b border-[#EBDCE0]">
                {entityCounts.map(({ label, meta, count }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => onSelectCategoryFilter(label)}
                    className="w-full text-left py-3.5 px-2 flex items-center justify-between gap-4 hover:bg-[#FAF6F0] transition-colors group"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2.5 text-sm font-medium text-[#3B282E] group-hover:text-[#AD4664]">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: meta.color }}
                          aria-hidden="true"
                        />
                        <span>{meta.en}</span>
                        <span className="text-[#6E565E] font-normal">· {meta.kr}</span>
                      </div>
                      <p className="text-xs text-[#6E565E] mt-0.5 pl-5">{meta.description}</p>
                    </div>
                    <span className="font-mono text-sm font-medium text-[#3B282E] tabular-nums shrink-0">
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Relationship Types Table */}
            <div>
              <div className="flex items-baseline justify-between mb-4">
                <h3 className="font-serif text-2xl font-medium text-[#3B282E]">
                  Relationship Schema
                </h3>
                <span className="text-xs font-mono text-[#6E565E] tabular-nums">
                  {relationships.length} exported edges
                </span>
              </div>
              <div className="divide-y divide-[#EBDCE0] border-t border-b border-[#EBDCE0]">
                {relCounts.map(({ label, meta, count }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => onSelectRelationshipFilter(label)}
                    className="w-full text-left py-3.5 px-2 flex items-center justify-between gap-4 hover:bg-[#FAF6F0] transition-colors group"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-sm font-medium text-[#3B282E] group-hover:text-[#AD4664]">
                        <span>{meta.en}</span>
                        <span className="font-mono text-xs text-[#6E565E] font-normal">
                          [:{meta.kr}]
                        </span>
                      </div>
                      <p className="text-xs text-[#6E565E] mt-0.5">{meta.description}</p>
                    </div>
                    <span className="font-mono text-sm font-medium text-[#3B282E] tabular-nums shrink-0">
                      {count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
