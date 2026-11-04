# Architectural Decision Records (ADRs)

## ADR-001: Adoption of 100% Static Export (`output: 'export'`)
- **Date**: 2026-11-04
- **Status**: **ACCEPTED**
- **Context**: The competition results portal requires high reliability, zero server operational overhead, instantaneous load times, and immutability against runtime alterations.
- **Decision**: Configure Next.js with `output: 'export'`, `images: { unoptimized: true }`, and `trailingSlash: true`. Compile entire application to static HTML/CSS/JS in `/out`.
- **Consequences**: Zero server-side API routes or database connections can be used. All dynamic candidate certificate pages must be pre-rendered using `generateStaticParams()`.

## ADR-002: Exclusively Awarded Rankers in Public Directory
- **Date**: 2026-11-04
- **Status**: **ACCEPTED**
- **Context**: Public presentation requirements dictate that only awarded candidates (Rank 1 Gold, Rank 2 Silver, Rank 3 Bronze, and Consolation) are showcased.
- **Decision**: Filter datasets strictly to prize winners. Non-prize general participants are excluded from the static build dataset.
- **Consequences**: Public search and category tables present a streamlined, celebratory roll of honor.

## ADR-003: Lucide React as Single Icon System (Zero Emojis)
- **Date**: 2026-11-04
- **Status**: **ACCEPTED**
- **Context**: Engineering rule (Phase 7) mandates strict icon discipline to maintain academic and aesthetic professionalism.
- **Decision**: Prohibit emoji and hand-written raw SVG icons. Standardize entirely on `lucide-react` with explicit accessibility `aria-label`s.
- **Consequences**: Consistent visual grammar and full WCAG 2.2 AA compliance.

## ADR-004: In-Memory Client-Side Filtering vs Server Search
- **Date**: 2026-11-04
- **Status**: **ACCEPTED**
- **Context**: Need real-time search across student roll numbers, registration numbers, and schools without network round-trips.
- **Decision**: Utilize React `useMemo` over static arrays in `data/prizeWinners.ts`.
- **Consequences**: Instant (< 5ms) fuzzy search with zero server latency and offline capability.

## ADR-005: Deferral of Onyx Vector Cluster
- **Date**: 2026-11-04
- **Status**: **ACCEPTED**
- **Context**: Antigravity Master Setup includes Onyx as an optional platform integration.
- **Decision**: Defer deployment of Onyx. The 100% static nature of the portal makes an 8GB RAM vector database cluster redundant and disproportionate.
- **Consequences**: Zero infrastructure bloat while keeping activation instructions preserved in `ONYX_INTEGRATION.md`.

