# Skill Registry & Integrations Audit (Phase 4 Specification)

This registry catalogs the verification, source assessment, and deployment status for the ten requested external integrations, following the **Antigravity Master Agent Setup v2** protocol.

## 1. Registry Table

| # | Integration Name | Candidate Source | Classification | Local Skill Path | Purpose | Audit & Verification Status |
| :-: | :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **REA** | `github.com/morluto/rea` | Agent Skill | `.agents/skills/rea/` | Authorized reverse engineering | **INSTALLED AND VERIFIED** |
| **2** | **Ponytail** | `github.com/DietrichGebert/ponytail` | Agent Skill | `.agents/skills/ponytail/` | Minimal, clean implementation | **INSTALLED AND VERIFIED** |
| **3** | **Hallmark** | `github.com/Nutlope/hallmark` | Agent Skill | `.agents/skills/hallmark/` | UI/design capability | **INSTALLED AND VERIFIED** |
| **4** | **Humanizer** | `github.com/hannsxpeter/humanizer` | Agent Skill | `.agents/skills/humanizer/` | Natural-language polish | **INSTALLED AND VERIFIED** |
| **5** | **Onyx** | `github.com/onyx-dot-app/onyx` | Platform (MCP) | N/A (Full platform) | RAG / Searchable knowledge | **DEFERRED (DOCUMENTED)** (See [`ONYX_INTEGRATION.md`](./ONYX_INTEGRATION.md)) |
| **6** | **Impeccable** | `github.com/pbakaus/impeccable` | Agent Skill | `.agents/skills/impeccable/` | UI audit and refinement | **INSTALLED AND VERIFIED** |
| **7** | **UI UX Pro Max** | `github.com/nextlevelbuilder/ui-ux-pro-max-skill` | Agent Skill | `.agents/skills/ui-ux-pro-max/` | Design system intelligence | **INSTALLED AND VERIFIED** |
| **8** | **Last30Days** | `github.com/mvanhorn/last30days-skill` | Agent Skill | `.agents/skills/last30days/` | Recent tech research | **INSTALLED AND VERIFIED** |
| **9** | **Scrapling** | `github.com/D4Vinci/Scrapling` | Python Library | N/A (Python package) | Website extraction | **NOT INSTALLED** (SSG portal uses in-tree static data) |
| **10** | **Diagram Design** | `github.com/cathrynlavery/diagram-design` | Agent Skill | `.agents/skills/diagram-design/` | Technical diagrams | **INSTALLED AND VERIFIED** |

---

## 2. Open Items (Phase 2.2)

| Item | Status | Action Taken / Plan |
| :--- | :--- | :--- |
| **Animaster official URL / package** | `PENDING USER INPUT` | No unverified packages or guessed repositories were installed. |
| **Task-chunking skill repository** | `PENDING USER INPUT` | Local workflow (Phase 8) implemented in [`IMPLEMENTATION_WORKFLOW.md`](./IMPLEMENTATION_WORKFLOW.md). |

---

## 3. Safety & Supply Chain Audit
- **Zero curl-to-shell installers**: All packages installed strictly through explicit inspection with exact semantic version lock.
- **Zero credential exposures**: No API keys, database credentials, or auth tokens are embedded anywhere in source code or static artifacts.
- **Least privilege**: Static compilation requires no ambient network or server runtime access.
