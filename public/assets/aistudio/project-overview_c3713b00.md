# Project Overview: IZ*ONE Activity Network

## Project Title
The Activity Network of IZ*ONE Members from Pre-debut to Post-disbandment

## Project Background
IZ*ONE was a project girl group whose members pursued different paths after the group's disbandment, including solo music careers, redebuting in other idol groups, acting, and other entertainment activities. This project examines how the members' activity trajectories and organizational affiliations changed across different periods.

## Project Objective
We aim to construct a knowledge graph of the twelve IZ*ONE members' activities and relationships with entertainment agencies, idol groups, performance units, and post-disbandment activities. By visualizing these connections, we explore how members' career paths diversified and how connections among members continued or reappeared through shared activities.

## Research Scope
- **Members:** All 12 members of IZ*ONE.
- **Time frame:** From the broadcast of *Produce 48* (June 15, 2018) through the date of our data collection.
- **Included data:** Entertainment agencies, pre- and post-disbandment group affiliations, redebut information, post-disbandment activities, and *Produce 48* competition-unit participation.
- **Excluded data:** Album and song information, member positions, and private relationships.
- **Activity inclusion principle:** We focus on documented, official activities and exclude activities with no formal or public connection relevant to the project.

## Research Questions
1. **Career-path diversification:** After IZ*ONE disbanded, how did members' career paths develop across solo activities, redebuting in groups, acting, and other entertainment fields?
2. **Post-disbandment connections:** Through which shared activities (such as television programs, radio, magazines, performances, or other public content) did members encounter or appear together after disbandment?
3. **Produce 48 unit participation:** Which members participated in the same competition units during *Produce 48*?

## Knowledge Graph Data Model
The graph organizes information using the following entity categories and relationships. The exact content displayed should reflect the supplied dataset.

### Entity Categories
- **People:** The 12 former IZ*ONE members.
- **Entertainment Agencies:** Agencies associated with members before or after IZ*ONE.
- **Idol Groups:** Groups in which members participated before or after IZ*ONE, including redebut groups.
- **Units:** Competition teams formed around performances during *Produce 48*.
- **Post-disbandment Activities:** Documented public activities such as programs, radio appearances, magazine features, performances, and other content.

### Relationships
- **Affiliated with:** A member's relationship with an entertainment agency.
- **Redebuted in:** A member's redebut in an idol group.
- **Participated in:** A member's participation in a *Produce 48* competition unit.
- **Appeared in:** A member's participation in a post-disbandment activity or content item.
- **Performed / active in:** A member's group activity, where supported by the dataset.

## Dataset and Research Work
The project dataset includes member affiliations, group activity and redebut information, *Produce 48* unit participation, and records of post-disbandment activities. The proposal documents 126 activity-related records as the planned dataset scope; the website must use the actual supplied database file as the source of truth for displayed counts and relationships.

The team used Neo4j to build the knowledge graph, formulate Cypher queries, examine connected entities, and visualize relationships.

## Preliminary Findings and Examples
These are observations recorded in the project materials and should be presented as preliminary findings, not as universal conclusions:

- Members' career paths after disbandment diverged into different areas, including solo music, redebuting in groups, and acting.
- Members continued to have shared points of connection through public activities after disbandment.
- The project materials identify examples of shared appearances, including Yena and Chaeyeon appearing together in *文明特急* and *전효성의 꿈꾸는 라디오*, and Sakura and Nako appearing together in *ロクいち！福岡* and *クイズTHE違和感*.
- The unit-participation query was revised from looking for recurring patterns to identifying which members participated in the same units, because the dataset was not sufficient to reliably infer repeated patterns.

Use the dataset and project materials to support visualizations and conclusions. Do not extrapolate beyond the available evidence.

## Data Sources and Validation
- The proposal identifies Namuwiki as a source for data collection.
- The team intended to prioritize official sources when possible and exclude unverified information from confirmed data.
- Names and entity labels should be consistent, using Korean names and official group or agency names where possible.
- Each data record should retain source information where available.

## Team
- Baek Juyeon — in-depth research
- Bong Munye — presentation materials
- Shim Yerin — presentation
- Yu Sara — presentation materials

## Expected Website Sections
1. **Home:** Project title, short introduction, and links to the main sections.
2. **Project Overview:** Background, objective, scope, and research questions.
3. **Data & Methodology:** Dataset scope, data structure, source and validation approach, and the knowledge-graph model.
4. **Graph Explorer:** Interactive graph exploration using the provided dataset, if feasible.
5. **Activity Explorer:** Browse and filter activities, people, agencies, groups, and units, as supported by the dataset.
6. **Findings:** Query results and observations, carefully grounded in the actual dataset.
7. **About the Team:** Team members and project credits.

## Website Content and Accuracy Guidelines
- Use the supplied JSON/database export as the source of truth for nodes, relationships, counts, and graph interactions.
- Do not invent node names, relationships, dates, statistics, activity records, or findings.
- If a query or visualization cannot be supported by the supplied data, clearly state the limitation instead of generating fabricated results.
- Preserve the project's scope and exclusions.

## Project Deliverables
- Neo4j knowledge graph database
- Knowledge graph visualization
- Project website / public presentation page
- Final project report
