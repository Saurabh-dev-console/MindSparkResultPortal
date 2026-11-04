# Onyx Knowledge & RAG Platform Integration Review

## 1. Executive Summary
- **Classification**: Enterprise Knowledge / Retrieval-Augmented Generation (RAG) Platform & MCP Server. (Explicitly **NOT** an agent skill).
- **Upstream Repository**: `github.com/onyx-dot-app/onyx`
- **Current Status**: **DEFERRED (DOCUMENTED & JUSTIFIED)**

## 2. Infrastructure & Resource Assessment

| Resource Dimension | Requirement for Live Onyx Deployment | Mindspark Static Portal Context | Evaluation |
| :--- | :--- | :--- | :--- |
| **Container Engine** | Docker / Docker Compose / WSL2 | Windows local workstation | Available if required |
| **RAM Footprint** | Minimum 8 GB dedicated RAM for vector engine + backend | Light Next.js SSG build requires < 512 MB | Heavy overhead |
| **CPU Utilization** | Multi-core indexing & embeddings generation | Static TS compilation is near-instant (< 10s) | Disproportionate |
| **Persistence / Storage** | Postgres + Qdrant / Vespa + MinIO volume mounts | Project is 100% static TS files in `data/` | Redundant |
| **Network Exposure** | Ports 3000 (UI), 8080 (API), 5432 (Postgres), 6333 (Vector DB) | Target deployment is static CDN (`out/`) | Security surface expansion |

## 3. Justification for Deferral
1. **Architectural Constraint**: The Mindspark Result Portal is strictly mandated as a **100% Static Site Generated (SSG)** artifact with zero server-side runtimes, zero API calls, and zero live database dependencies.
2. **Data Scope**: All competition results (52 verified rankers across 18 categories) are fully codified in static, typed TypeScript structures (`data/prizeWinners.ts`, `data/categories.ts`). Client-side in-memory search runs in `< 5ms` with zero infrastructure costs.
3. **Security Discipline**: Running an Onyx vector cluster introduces unneeded network ports, background daemons, and storage persistence that contradict the static distribution model.

## 4. Activation Protocol (If Required in Future)
If institutional knowledge indexing across thousands of PDF research papers or admitting documents is authorized by school leadership:
1. Deploy Onyx via Docker Compose in an isolated VPC or WSL2 environment.
2. Configure scoped read-only MCP credentials stored exclusively in local OS secret vaults (never committed to repository).
3. Connect Antigravity IDE via sanctioned MCP server configuration.
