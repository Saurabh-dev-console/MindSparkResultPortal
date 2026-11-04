# UI Library Guide & Component Inventory (Redesigned with Zero AI-Blobs)

## 1. Upstream Library Integration Overview

In compliance with user directive to **eliminate all AI-generated themes, AI-looking gradients, and generic blobs**, and to plan all UI elements directly from the specified component registries (**Skiper UI** & **Vengeance UI**), the UI architecture has been completely redesigned into tangible, high-craft components.

| Component Primitive | Design Library Lineage | Implementation File | Purpose & UI Role |
| :--- | :--- | :--- | :--- |
| **`SpotlightCard`** | **Vengeance UI** (`vengenceui.com`) | `components/ui/spotlight-card.tsx` | Mouse-tracking spotlight border cards for metrics, champions bento grid, and photo galleries |
| **`AnimatedButton`** | **Vengeance UI** (*Button Forge*) | `components/ui/animated-button.tsx` | Interactive tactile buttons with micro-sweep shine and physics-based tap/hover feedback |
| **`StatsCounter`** | **Vengeance UI** (*Text & Motion*) | `components/ui/stats-counter.tsx` | Numeric count-up easing engine for competition metrics |
| **`SegmentedDock`** | **Skiper UI** (`skiper-ui.com`) | `components/ui/segmented-dock.tsx` | Spring-animated dock switcher across all 18 Mindspark competition categories |
| **`RankBadge`** | **Custom Hallmark System** | `components/ui/badge.tsx` | Strict WCAG 2.2 AA distinction badges (Gold Rank 1, Silver Rank 2, Bronze Rank 3, Consolation) |

---

## 2. Zero AI-Theme Directives Applied
1. **No Ambient Blur Blobs**: Removed all `mix-blend-multiply blur-3xl` gradient circles and glowing colored blobs.
2. **No Purple-to-Cyan Gradients**: Replaced with deep institutional collegiate navy (`#0B192C` / `#0F172A`), warm architectural parchment (`#F8FAFC`), and genuine academic medal tones (Gold `#D97706`, Silver `#94A3B8`, Bronze `#B45309`).
3. **No Decorative AI Status Dots or Unicode Icons**: Strictly `lucide-react` icons (WCAG 2.2 AA compliant).
4. **Authentic Institutional Branding**: Centered around the authentic crest of **Meena Shah Public School** and official Mindspark emblem.

---

## 3. Library Installation & License Details
- **`framer-motion`**: `^12.4.7` (MIT) — Underpins spring layout transitions for Skiper UI Segmented Dock and Vengeance UI button press dynamics.
- **`tailwindcss`**: `^3.4.19` (MIT) — Utility architecture.
- **`lucide-react`**: `^0.475.0` (ISC) — Approved single icon system.
- **`canvas-confetti`**: `^1.9.4` (ISC) — Podium celebration bursts.
- **`Animaster`**: `PENDING USER INPUT` (No unverified/guessed packages installed).
