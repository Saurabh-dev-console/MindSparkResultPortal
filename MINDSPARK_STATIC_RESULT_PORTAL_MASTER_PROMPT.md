# PROMPT: 100% STATIC MINDSPARK PRIZE WINNERS & SHOWCASE PORTAL (NEXT.JS)

You are tasked with building a complete, production-grade, 100% **Static (Static Site Generated - SSG / `output: 'export'`)** Result & Event Showcase Portal for the **MINDSPARK Competition** using **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 1. ARCHITECTURAL CONSTRAINTS (100% STATIC SITE)

1. **Static Export (`output: 'export'`)**:
   - The entire website must compile to static HTML, CSS, and client-side JavaScript (`out/` directory).
   - Zero server-side runtime, zero API routes, zero external database connection (No Prisma, No Supabase, No SQL).
   - Dynamic routes (e.g., `/verify/[regNo]`) must implement `generateStaticParams()` to pre-render all candidate certificate pages at build time.
2. **Exclusively Prize Winners & Rankers**:
   - The public results section must **ONLY** list candidates who are awarded prizes (Rank 1 Gold, Rank 2 Silver, Rank 3 Bronze, and Consolation Prize winners).
   - General non-prize participants are excluded from the public directory.
3. **Data Source**:
   - All data resides in static TypeScript files (`data/categories.ts`, `data/prizeWinners.ts`, `data/gallery.ts`).
   - Search, filtering, and tab navigation must execute entirely on the client side using React state/memoization.

---

## 2. DIRECTORY STRUCTURE

```text
mindspark-static-portal/
├── next.config.ts                # Configured with output: 'export' & unoptimized images
├── app/
│   ├── layout.tsx                # Static Root Layout (Navbar, Footer, Meta)
│   ├── page.tsx                  # Home: Hero, Metrics, Grand Champions, Gallery Preview
│   ├── results/
│   │   └── page.tsx              # Programme-wise Prize Winners & Podium directory
│   ├── gallery/
│   │   └── page.tsx              # Filterable static photo gallery with modal lightbox
│   └── verify/
│       ├── page.tsx              # Static Search page for Roll No / Reg No
│       └── [regNo]/
│           └── page.tsx          # Pre-rendered static certificate page (generateStaticParams)
├── components/
│   ├── Navbar.tsx                # Static navigation bar
│   ├── Footer.tsx                # Official footer
│   ├── Hero.tsx                  # Hero banner with static counter badges
│   ├── StaticSearch.tsx          # Client-side instantaneous search input
│   ├── Podium.tsx                # Top 3 visual podium component
│   ├── PrizeTable.tsx            # Category-wise table of prize winners only
│   ├── CertificateView.tsx       # Printable Certificate component (window.print())
│   └── GalleryView.tsx           # Client-side filterable photo grid with modal
├── data/
│   ├── categories.ts             # Static list of all 18 Mindspark categories
│   ├── prizeWinners.ts           # Static database of all awarded rankers
│   └── gallery.ts                # Static array of event photos and captions
├── types/
│   └── index.ts                  # TypeScript definitions
└── tailwind.config.ts
```

---

## 3. STATIC CONFIGURATION & TYPES

### `next.config.ts`
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static HTML export
  },
  trailingSlash: true,
};

export default nextConfig;
```

### `types/index.ts`
```typescript
export interface PrizeWinner {
  id: string;
  regNo: string;
  rollNo: string;
  name: string;
  schoolName: string;
  className: string;
  categoryId: string;
  categoryName: string;
  rank: 1 | 2 | 3 | 4; // 1: Gold, 2: Silver, 3: Bronze, 4: Consolation
  positionTitle: string; // e.g. "1st Position (Champion)"
  prizeAwarded: string; // e.g. "Trophy + Gold Medal + Certificate"
  score: number;
  maxScore: number;
  photoUrl?: string;
}

export interface Category {
  id: string;
  code: string;
  name: string;
  gradeGroup: string;
  prizeCount: number; // e.g. 3 or 4 winners
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'stage' | 'awards' | 'science' | 'candid';
  imageUrl: string;
  caption: string;
}
```

---

## 4. STATIC PAGE SPECIFICATIONS

### A. Homepage (`app/page.tsx`)
- **Hero & Metrics**:
  - Event Heading: "MINDSPARK 2026 — OFFICIAL RANKERS & PRIZE WINNERS"
  - Subtitle: "Honoring the Young Innovators and Champions of Meena Shah Public School"
  - Static Metric Cards: `18 Categories`, `50+ Participating Schools`, `100+ Total Medals & Trophies Awarded`.
  - Client-side quick search: Instant fuzzy match against `data/prizeWinners.ts`.
- **Championship Showcase**:
  - Highlights top Gold Medalists across premier categories.
- **Photo Gallery Highlights**:
  - Static 6-photo preview linking to `/gallery`.

### B. Results & Prize Winners Page (`app/results/page.tsx`)
- **Client-Side Category Tabs**:
  - Tab buttons for all 18 categories (Category 01 to 18).
  - Switching tabs updates the active category instantly without network requests.
- **Active Category Podium**:
  - Top 3 visual podium for the active category:
    - **1st Position (Center, Gold Accent)**: Winner name, school, "Trophy + Gold Medal".
    - **2nd Position (Left, Silver Accent)**: Winner name, school, Silver medal badge.
    - **3rd Position (Right, Bronze Accent)**: Winner name, school, Bronze medal badge.
- **Winners List Table**:
  - **Strictly lists awarded rankers only** (no non-prize candidates).
  - Columns: `Rank`, `Roll / Reg No`, `Winner Name`, `School Name`, `Class`, `Score`, `Prize Details`, `Certificate Link`.
  - Client-side search bar for real-time name/school filtering within the active tab.

### C. Static Certificate & Verification (`app/verify/[regNo]/page.tsx`)
- Must implement `generateStaticParams()`:
  ```typescript
  import { prizeWinners } from '@/data/prizeWinners';

  export async function generateStaticParams() {
    return prizeWinners.map((winner) => ({
      regNo: winner.regNo,
    }));
  }
  ```
- Renders pre-generated static certificate:
  - Official layout: School Header, Mindspark Seal, Candidate Credentials, Rank, Prize Awarded.
  - Native print button triggering `window.print()` with `@media print` styles for clean A4 printing.

### D. Photo Gallery (`app/gallery/page.tsx`)
- Static image dataset rendered with responsive CSS grid.
- Client-side category filters (`All`, `Awards`, `Stage`, `Exhibitions`).
- Modal lightbox for full-screen view.

---

## 5. SEED DATA REQUIREMENT (`data/prizeWinners.ts`)

- Provide at least 30 to 40 complete records covering multiple categories.
- **Every record must be a ranker** (Rank 1, 2, 3, or Consolation Prize).
- Zero unranked or failed candidates in this dataset.

---

## 6. DELIVERABLE INSTRUCTIONS

1. Generate the complete source code for all specified files.
2. Ensure `next build` runs cleanly and generates the static export directory `out/` with zero build warnings or server dependencies.
3. Use Tailwind CSS for all responsive layouts and styling.

Generate the full project code now.

