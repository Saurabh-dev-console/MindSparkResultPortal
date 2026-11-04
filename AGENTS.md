# MINDSPARK STATIC RESULT & SHOWCASE PORTAL — AGENT MANIFEST

## Project Overview
This repository contains the official, 100% **Static Site Generated (SSG)** Result & Event Showcase Portal for the **MINDSPARK Competition** at **Meena Shah Public School**, built with Next.js (App Router), TypeScript, and Tailwind CSS.

## Architecture & Core Directives
1. **100% Static Export**:
   - `output: 'export'` configured in `next.config.mjs`
   - Static HTML/CSS/JS output compiled to `/out` directory
   - Zero runtime server APIs, zero database connections
2. **Exclusively Prize Winners & Rankers**:
   - All published listings strictly represent certified rankers (Rank 1 Gold, Rank 2 Silver, Rank 3 Bronze, and Consolation)
   - Non-prize participants are excluded from the public directory
3. **Pre-rendered Certificates**:
   - Dynamic route `/verify/[regNo]` uses `generateStaticParams()` to pre-render static HTML certificates for all rankers
   - Native A4 landscape printing via `@media print`
4. **Icons & UI Standards**:
   - Strictly `lucide-react` icons (WCAG 2.2 AA compliant)
   - Zero emoji or raw Unicode characters as UI icons

## Engineering Reference Directory
All governance, architecture, and verification documentation is maintained in `docs/engineering/`:
- [`README.md`](file:///c:/Users/Saurabh%20Tiwari/Desktop/MINDSPARK_RESULT_PORTAL/docs/engineering/README.md): System index & setup status
- [`ARCHITECTURE.md`](file:///c:/Users/Saurabh%20Tiwari/Desktop/MINDSPARK_RESULT_PORTAL/docs/engineering/ARCHITECTURE.md): System topology & SSG data flow
- [`ENGINEERING_RULES.md`](file:///c:/Users/Saurabh%20Tiwari/Desktop/MINDSPARK_RESULT_PORTAL/docs/engineering/ENGINEERING_RULES.md): Icons, component reuse, and dependency policy
- [`UI_LIBRARY_GUIDE.md`](file:///c:/Users/Saurabh%20Tiwari/Desktop/MINDSPARK_RESULT_PORTAL/docs/engineering/UI_LIBRARY_GUIDE.md): UI libraries, licensing, component inventory
- [`SKILL_REGISTRY.md`](file:///c:/Users/Saurabh%20Tiwari/Desktop/MINDSPARK_RESULT_PORTAL/docs/engineering/SKILL_REGISTRY.md): Status of the 10 requested integrations
- [`ONYX_INTEGRATION.md`](file:///c:/Users/Saurabh%20Tiwari/Desktop/MINDSPARK_RESULT_PORTAL/docs/engineering/ONYX_INTEGRATION.md): Onyx assessment & deferred justification
- [`CODE_GRAPH_GUIDE.md`](file:///c:/Users/Saurabh%20Tiwari/Desktop/MINDSPARK_RESULT_PORTAL/docs/engineering/CODE_GRAPH_GUIDE.md): Knowledge graph evaluation & engine selection
- [`IMPLEMENTATION_WORKFLOW.md`](file:///c:/Users/Saurabh%20Tiwari/Desktop/MINDSPARK_RESULT_PORTAL/docs/engineering/IMPLEMENTATION_WORKFLOW.md): Local task chunking protocol
- [`DECISIONS.md`](file:///c:/Users/Saurabh%20Tiwari/Desktop/MINDSPARK_RESULT_PORTAL/docs/engineering/DECISIONS.md): Dated architectural decision records
- [`TESTING_AND_VERIFICATION.md`](file:///c:/Users/Saurabh%20Tiwari/Desktop/MINDSPARK_RESULT_PORTAL/docs/engineering/TESTING_AND_VERIFICATION.md): Verification commands, build validation, artifact checklist

## Primary Development Commands
- `npm run dev`: Launch local development server at `http://localhost:3000`
- `npm run build`: Compile 100% static SSG production build to `/out`
- `npm run lint`: Run Next.js and TypeScript linting suite
