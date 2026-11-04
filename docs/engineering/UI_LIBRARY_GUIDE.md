# UI Library Guide & Component Inventory

## 1. Core UI Stack

| Library | Version | Source | License | Purpose & Installed Scope |
| :--- | :--- | :--- | :--- | :--- |
| **Tailwind CSS** | `^3.4.17` | npm `tailwindcss` | MIT | Complete utility-first design system |
| **Lucide React** | `^0.475.0` | npm `lucide-react` | ISC | Approved icon library for all UI surfaces |
| **Canvas Confetti** | `^1.9.4` | npm `canvas-confetti` | ISC | Celebration burst effects for podium & winners |
| **Clsx & Tailwind-Merge** | `^2.1.1` / `^2.6.0` | npm `clsx`, `tailwind-merge` | MIT | Conflict-free conditional CSS className merging |

## 2. Upstream UI Library Review (Phase 3 Specification)

### A. Animaster
- **Official Source**: `PENDING USER INPUT` (No verified URL supplied in master prompt).
- **Status**: **NOT INSTALLED / BLOCKED**. In accordance with Phase 3 safety rules, no third-party package or repository was guessed or installed under a similar name.

### B. Skiper UI
- **Official Source**: `skiper-ui.com/docs/quick-start`
- **Audit**: Component-level micro-interaction library.
- **Evaluation**: The portal’s current visual requirements (Hero, Category Tabs, Podium, Static Search, Lightbox) are fully satisfied by custom, accessible Tailwind components with zero external bloat.
- **Status**: **NOT INSTALLED (No approved task requirement)**.

### C. Vengence UI
- **Official Source**: `vengenceui.com`
- **Audit**: Component registry for modern interfaces.
- **Evaluation**: Verified spelling and component commands. Evaluated against project scope; current components meet all UI specs without adding external registry dependencies.
- **Status**: **NOT INSTALLED (No approved task requirement)**.

## 3. Installed Component Inventory

1. **`Navbar` (`components/Navbar.tsx`)**:
   - Sticky top navigation with glassmorphism backdrop (`backdrop-blur-md`).
   - Integrated mobile responsive drawer, active route indicators, quick verify action button.
2. **`Hero` (`components/Hero.tsx`)**:
   - Official event headline, 4 verified static metric counter cards, instant search bar integration.
3. **`StaticSearch` (`components/StaticSearch.tsx`)**:
   - In-memory real-time search across `data/prizeWinners.ts` with dynamic result flyout and keyboard focus traps.
4. **`Podium` (`components/Podium.tsx`)**:
   - 3-step visual podium: Gold (Rank 1, center), Silver (Rank 2, left), Bronze (Rank 3, right).
   - Confetti particle trigger integration (`canvas-confetti`).
5. **`PrizeTable` (`components/PrizeTable.tsx`)**:
   - Full tabular directory of prize winners with in-tab filtering by candidate name, roll number, or school.
6. **`CertificateView` (`components/CertificateView.tsx`)**:
   - Official academic certificate layout featuring institutional seals, signatures, and `@media print` rules for A4 landscape output.
7. **`GalleryView` (`components/GalleryView.tsx`)**:
   - Filterable photo grid with category tabs (`all`, `awards`, `stage`, `science`, `candid`) and modal lightbox with keyboard shortcuts.

