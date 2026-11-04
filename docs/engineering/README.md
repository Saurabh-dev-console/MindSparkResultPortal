# Engineering Index & System Setup Status

## 1. Overview
This directory serves as the engineering governance repository for the **MINDSPARK Static Prize Winners & Showcase Portal**. It follows the **Antigravity Master Agent Setup v2** specification, ensuring modularity, token-efficiency, architectural safety, and rigorous verification.

## 2. Document Map

| Document | Purpose | Status |
| :--- | :--- | :--- |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Structural overview, SSG pipelines, data flow | **VERIFIED** |
| [`ENGINEERING_RULES.md`](./ENGINEERING_RULES.md) | Icon policies, component reuse, dependency limits | **ACTIVE** |
| [`UI_LIBRARY_GUIDE.md`](./UI_LIBRARY_GUIDE.md) | UI components, tailwind configs, library registry | **ACTIVE** |
| [`SKILL_REGISTRY.md`](./SKILL_REGISTRY.md) | Audit & status of 10 external agent integrations | **DOCUMENTED** |
| [`ONYX_INTEGRATION.md`](./ONYX_INTEGRATION.md) | RAG evaluation, resource review, deferral rationale | **DEFERRED (DOCUMENTED)** |
| [`CODE_GRAPH_GUIDE.md`](./CODE_GRAPH_GUIDE.md) | Knowledge graph evaluation & local symbol routing | **ACTIVE** |
| [`IMPLEMENTATION_WORKFLOW.md`](./IMPLEMENTATION_WORKFLOW.md) | Task chunking workflow, verification gates | **ACTIVE** |
| [`DECISIONS.md`](./DECISIONS.md) | Dated architectural decision records (ADRs) | **ACTIVE** |
| [`TESTING_AND_VERIFICATION.md`](./TESTING_AND_VERIFICATION.md) | Build runs, validation commands, export audit | **VERIFIED** |

## 3. Environment & Runtime Summary
- **OS**: Windows (PowerShell Shell)
- **Node.js**: v22.23.4
- **NPM**: 10.9.9
- **Framework**: Next.js 14.2.35 (App Router)
- **Static Export Target**: `out/` (Zero server dependencies)
- **Total Static Routes Generated**: 59 static routes pre-rendered successfully

