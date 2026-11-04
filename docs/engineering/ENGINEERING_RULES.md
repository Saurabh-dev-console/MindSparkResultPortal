# Engineering Rules & Architectural Governance

## 1. Icon Policy
1. **Approved Icon System**:
   - `lucide-react` is the sole approved icon library for this application.
   - All standard interface icons (trophies, medals, awards, search inputs, navigation buttons, external links, printers) must import named icons from `lucide-react`.
2. **Strict Icon Prohibitions**:
   - **No emoji or raw Unicode characters** (e.g., 🏆, 🥇, 🥈, 🥉, 🔍, 📜) may be used as UI icons or functional controls in production components.
   - **No hand-written inline SVG strings** for ordinary icons.
3. **Accessibility**:
   - Every standalone icon button must have an explicit `aria-label` attribute (e.g., `aria-label="Close modal"`).

## 2. Component Reuse & Clean Code Architecture
1. **Search Before Build**:
   - Before implementing any UI feature, check existing components in `components/`. Reuse or extend existing components rather than duplicating logic.
2. **SOLID & DRY Principles**:
   - Single Responsibility: Each component performs a distinct function (e.g., `Podium.tsx` handles top-3 visual presentation; `PrizeTable.tsx` handles tabular listings; `CertificateView.tsx` handles printable credential layouts).
   - DRY (Don't Repeat Yourself): Shared calculation logic, badges, or search filters are unified or parameterized.
   - KISS (Keep It Simple, Stupid): Prefer readable, standard React idioms over opaque abstractions.
   - YAGNI (You Aren't Gonna Need It): Avoid speculative abstractions or server-side scaffolding that contradicts the 100% static requirement.
3. **Design Tokens & Styling**:
   - Tailwind CSS utility classes are standard.
   - Design system colors: Primary Slate (`#0f172a`), Brand Blue (`#2563eb`), Amber/Gold (`#f59e0b` / `#d97706`).

## 3. Dependency Policy & Standards
1. **Zero Unjustified Dependencies**:
   - Only dependencies strictly required for static compilation, UI, and accessibility may be introduced.
   - No runtime database ORMs (Prisma, Drizzle), server engines (Express), or authentication backends are permitted.
2. **Lockfile Discipline**:
   - All installations must be npm-managed.
   - Never remove or regenerate `package-lock.json` with incompatible package managers (Yarn, pnpm, Bun).
3. **Accessibility (WCAG 2.2 AA)**:
   - Contrast ratio must meet or exceed WCAG AA standards (4.5:1 for normal text, 3:1 for large text).
   - High contrast badges for ranks:
     * Rank 1 (Gold): Dark amber text on light amber surface with high contrast border.
     * Rank 2 (Silver): Slate-900 text on slate-200 surface.
     * Rank 3 (Bronze): Deep amber-950 text on amber-100 surface.
     * Consolation: Deep blue-900 text on blue-50 surface.
   - Full keyboard accessibility for interactive elements, dialogs, and modals (Escape, ArrowLeft, ArrowRight).
