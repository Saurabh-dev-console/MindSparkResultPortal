# System Architecture — Mindspark Static Result Portal

## 1. Architectural Philosophy
The Mindspark Result & Showcase Portal is engineered with **100% Static Site Generation (SSG)** (`output: 'export'`). 

### Core Axioms
1. **Zero Runtime Server Costs & Zero Dynamic Vulnerabilities**: No Node.js runtime is needed in production. The output in `out/` consists exclusively of flat HTML, CSS, client JS bundles, and static image assets. It can be hosted on GitHub Pages, Cloudflare Pages, Netlify, AWS S3, or any static object storage CDN.
2. **Deterministic Data Propagation**:
   - `data/categories.ts`: Master catalog of all 18 Mindspark competitive arenas.
   - `data/prizeWinners.ts`: Strictly verified records of all awarded rankers (Rank 1, 2, 3, Consolation).
   - `data/gallery.ts`: Static photo gallery dataset with descriptive metadata.
3. **Pre-rendered Dynamic Slugs**:
   - The route `/verify/[regNo]` leverages `generateStaticParams()` to compile individual static HTML certificate files at build time for every single ranker in `data/prizeWinners.ts`.

## 2. Component Topology

```text
mindspark-static-portal/
├── next.config.mjs               # output: 'export', images: { unoptimized: true }, trailingSlash: true
├── app/
│   ├── layout.tsx                # Static Root Layout (Navbar, Footer, Global Meta)
│   ├── page.tsx                  # Home: Hero, Metrics, Grand Champions, Gallery Preview
│   ├── results/
│   │   └── page.tsx              # Programme-wise Prize Winners & Podium directory (18 Categories)
│   ├── gallery/
│   │   └── page.tsx              # Filterable static photo gallery with modal lightbox
│   └── verify/
│       ├── page.tsx              # Instant Roll No / Reg No candidate search
│       └── [regNo]/
│           └── page.tsx          # Pre-rendered static certificate page (generateStaticParams)
├── components/
│   ├── Navbar.tsx                # Official top navigation bar
│   ├── Footer.tsx                # Official footer with institutional details
│   ├── Hero.tsx                  # Hero banner with verified metric counters
│   ├── StaticSearch.tsx          # Instant client-side fuzzy search component
│   ├── Podium.tsx                # 3-step visual podium for Top 3 category rankers
│   ├── PrizeTable.tsx            # Strict table of awarded rankers with in-tab filtering
│   ├── CertificateView.tsx       # Printable A4 Certificate component (window.print())
│   └── GalleryView.tsx           # Category-filtered media grid with keyboard-controlled lightbox
├── data/
│   ├── categories.ts             # All 18 Mindspark categories
│   ├── prizeWinners.ts           # 52 complete verified ranker records
│   └── gallery.ts                # 12 high-resolution gala event photo records
└── types/
    └── index.ts                  # TypeScript interfaces (PrizeWinner, Category, GalleryImage)
```

## 3. Data Flow & State Management
- **Search & Filtering**: Handled entirely through React `useState` and `useMemo` hooks against static in-memory TypeScript arrays. Instant response time (< 5ms) without HTTP request overhead.
- **Certificate Verification**: When an external user scans a QR code or opens `/verify/MS26-ROB-101/`, the static CDN serves the pre-compiled `out/verify/MS26-ROB-101/index.html` file immediately with zero server lag.
