# UI/UX Specification

## Design Philosophy

**Inspired by:** Apple, Tryeden, Ro, Hims  
**Core Principles:**
- Dark, premium aesthetic (black backgrounds)
- Smooth micro-interactions and transitions
- Single-page experience with minimal scroll
- Consistent UI patterns across all steps
- Focus on simplicity and elegance

---

## Visual Design System

### Color Palette

```css
/* Primary */
--background: #000000;
--background-elevated: #0A0A0A;
--background-card: #141414;
--background-card-hover: #1A1A1A;

/* Accent */
--accent-primary: #FFFFFF;
--accent-secondary: #A1A1A1;
--accent-muted: #666666;

/* Highlight */
--highlight: #3B82F6;        /* Blue for CTAs */
--highlight-hover: #2563EB;
--highlight-glow: rgba(59, 130, 246, 0.3);

/* Success */
--success: #22C55E;
--success-glow: rgba(34, 197, 94, 0.3);

/* Borders */
--border-subtle: #222222;
--border-active: #3B82F6;
```

### Typography

```css
/* Font Family */
font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Scale */
--text-hero: 4rem;       /* 64px - Landing page headline */
--text-title: 2.5rem;    /* 40px - Question headlines */
--text-subtitle: 1.5rem; /* 24px - Supporting text */
--text-body: 1.125rem;   /* 18px - Card content */
--text-small: 0.875rem;  /* 14px - Labels, captions */

/* Weights */
--font-light: 300;
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing and Layout

```css
/* Single page - no scroll on desktop */
min-height: 100vh;
max-height: 100vh;
overflow: hidden;

/* Content container */
max-width: 800px;
margin: 0 auto;
padding: 2rem;

/* Card spacing */
gap: 1rem;
```

### Animation Tokens

```css
/* Transitions */
--transition-fast: 150ms ease-out;
--transition-medium: 300ms ease-out;
--transition-slow: 500ms ease-out;
--transition-page: 600ms cubic-bezier(0.4, 0, 0.2, 1);

/* Spring animations (Framer Motion) */
--spring-gentle: { stiffness: 100, damping: 15 };
--spring-snappy: { stiffness: 300, damping: 25 };
--spring-bouncy: { stiffness: 400, damping: 10 };
```

---

## Page Flow

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                     1. LANDING PAGE                         │
│                  (Apple-style hero)                         │
│                                                             │
│         "Your personalized treatment plan awaits"           │
│                    [Begin] button                           │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼ (fade + slide transition)
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                 2. SELECT MEDICATION                        │
│                                                             │
│     "Which medication are you interested in?"               │
│                                                             │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐       │
│   │ Sema-   │  │ Tirze-  │  │ Reta-   │  │ Sermo-  │       │
│   │ glutide │  │ patide  │  │ trutide │  │ relin   │       │
│   └─────────┘  └─────────┘  └─────────┘  └─────────┘       │
│                                                             │
│              [Back]                    [Next]               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼ (fade + slide transition)
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                 3. PATIENT TYPE                             │
│                                                             │
│        "Have you taken this medication before?"             │
│                                                             │
│         ┌──────────────┐    ┌──────────────┐               │
│         │  I'm new to  │    │  I've taken  │               │
│         │     this     │    │  this before │               │
│         └──────────────┘    └──────────────┘               │
│                                                             │
│              [Back]                    [Next]               │
└─────────────────────────────────────────────────────────────┘
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
┌───────────────────────┐    ┌───────────────────────────────┐
│                       │    │                               │
│  4a. NEW PATIENT      │    │  4b. EXISTING PATIENT         │
│      DOSE             │    │      CURRENT DOSE             │
│                       │    │                               │
│  "We'll start you     │    │  "What dose are you           │
│   at the recommended  │    │   currently taking?"          │
│   starting dose"      │    │                               │
│                       │    │   ○ 0.25mg                    │
│   ✓ 0.25mg starting   │    │   ○ 0.5mg                     │
│                       │    │   ○ 1.0mg                     │
│                       │    │   ○ Other                     │
│                       │    │                               │
└───────────────────────┘    └───────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                 5. SELECT PLAN                              │
│                                                             │
│           "Choose your treatment plan"                      │
│                                                             │
│   ┌─────────────────┐  ┌─────────────────┐                 │
│   │   MONTHLY       │  │   3-MONTH       │                 │
│   │   $299/mo       │  │   $239/mo       │                 │
│   │                 │  │   SAVE 20%      │                 │
│   │   Flexible      │  │   Best Value    │                 │
│   └─────────────────┘  └─────────────────┘                 │
│                                                             │
│              [Back]                    [Next]               │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              6. BUILDING YOUR PLAN                          │
│                 (Loading Animation)                         │
│                                                             │
│                    ╭───────────╮                           │
│                    │  ◠ ◠ ◠   │  Animated orb/pulse       │
│                    ╰───────────╯                           │
│                                                             │
│           "Creating your personalized plan..."              │
│                                                             │
│               ━━━━━━━━━━━━━━━━━━━━━                        │
│                   Progress bar                              │
│                                                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼ (reveal animation)
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│              7. YOUR TREATMENT PLAN                         │
│                                                             │
│                  ✓ Plan Created                             │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                                                     │   │
│   │  SEMAGLUTIDE                                        │   │
│   │  3-Month Subscription                               │   │
│   │                                                     │   │
│   │  ┌─────────────────────────────────────────────┐   │   │
│   │  │  Month 1    │    Month 2    │    Month 3   │   │   │
│   │  │  0.25mg     │    0.5mg      │    1.0mg     │   │   │
│   │  │  $239       │    $279       │    $319      │   │   │
│   │  └─────────────────────────────────────────────┘   │   │
│   │                                                     │   │
│   │  Total: $837  (Save $210)                          │   │
│   │                                                     │   │
│   │  ✓ Includes supplies                               │   │
│   │  ✓ Monthly consultations                           │   │
│   │  ✓ Free shipping                                   │   │
│   │                                                     │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                             │
│              [Start Over]        [Continue to Checkout]     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Specifications

### 1. Landing Page (Hero)

**Layout:**
- Full viewport height, centered content
- Gradient mesh background or subtle particle animation
- Floating medication icons/pills in background (parallax)

**Elements:**
```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                         [Logo]                                 │
│                                                                │
│                                                                │
│              Your personalized                                 │
│              treatment awaits.                                 │
│                                                                │
│         Science-backed medications. Delivered.                 │
│                                                                │
│                                                                │
│                   ┌─────────────────┐                          │
│                   │   Get Started   │  ← Glowing button        │
│                   └─────────────────┘                          │
│                                                                │
│                                                                │
│                    Scroll indicator ↓                          │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Animations:**
- Hero text: Fade in + slide up (staggered per word)
- CTA button: Pulse glow effect
- Background: Subtle gradient shift or floating particles
- On click: Smooth zoom + fade transition to next step

---

### 2. Question Card (Consistent UI)

**Every question uses this same structure:**

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│  ← Step 1 of 4                           Progress ━━━━━░░░░░   │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│                                                                │
│           [Icon related to question - animated]                │
│                                                                │
│                                                                │
│              Question headline here                            │
│                 (2.5rem, semibold)                             │
│                                                                │
│          Optional supporting text goes here                    │
│                 (1.125rem, muted)                              │
│                                                                │
│                                                                │
│      ┌──────────┐  ┌──────────┐  ┌──────────┐                 │
│      │ Option 1 │  │ Option 2 │  │ Option 3 │                 │
│      └──────────┘  └──────────┘  └──────────┘                 │
│                                                                │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│    [← Back]                                      [Next →]      │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Selection Cards:**
```css
/* Default state */
.selection-card {
  background: var(--background-card);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 300ms ease;
}

/* Hover state */
.selection-card:hover {
  background: var(--background-card-hover);
  border-color: var(--accent-muted);
  transform: translateY(-2px);
}

/* Selected state */
.selection-card.selected {
  background: var(--background-card);
  border-color: var(--highlight);
  box-shadow: 0 0 0 1px var(--highlight),
              0 0 20px var(--highlight-glow);
}
```

---

### 3. Sticky Navigation Footer

**Always visible at bottom of viewport:**

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│   ┌─────────────┐                        ┌─────────────────┐   │
│   │   ← Back    │                        │      Next →     │   │
│   └─────────────┘                        └─────────────────┘   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Styles:**
```css
.sticky-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 2rem;
  background: linear-gradient(transparent, var(--background) 30%);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: space-between;
  z-index: 100;
}

/* Back button */
.btn-back {
  background: transparent;
  border: 1px solid var(--border-subtle);
  color: var(--accent-secondary);
}

/* Next button */
.btn-next {
  background: var(--highlight);
  color: white;
  min-width: 140px;
}

.btn-next:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

### 4. Progress Indicator

**Top of every question page:**

```
Step 2 of 4                                    ━━━━━━━━━░░░░░░░░
```

**Styles:**
```css
.progress-bar {
  height: 4px;
  background: var(--border-subtle);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--highlight);
  transition: width 500ms ease;
}
```

---

### 5. Page Transitions

**Using Framer Motion:**

```typescript
// Page transition variants
const pageVariants = {
  initial: {
    opacity: 0,
    x: 50,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: {
      duration: 0.3,
    },
  },
}

// Stagger children (for card lists)
const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4 }
  },
}
```

---

### 6. Loading Animation ("Building Your Plan")

**Visual:**
```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                                                                │
│                                                                │
│                         ◉                                      │
│                      ╱     ╲                                   │
│                    ◉    ●    ◉      ← Orbiting dots           │
│                      ╲     ╱                                   │
│                         ◉                                      │
│                                                                │
│                                                                │
│          Creating your personalized plan...                    │
│                                                                │
│                                                                │
│             ━━━━━━━━━━━━━━━━━━━━░░░░░░░░░░                     │
│                    Building treatment                          │
│                                                                │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Animation Sequence (3-5 seconds):**

1. **0-1s:** Orbiting dots animation starts
2. **1-2s:** "Analyzing your preferences..."
3. **2-3s:** "Selecting optimal dosing..."
4. **3-4s:** "Calculating savings..."
5. **4-5s:** "Finalizing your plan..." → Transition to results

**Code concept:**
```typescript
const loadingSteps = [
  "Analyzing your preferences...",
  "Selecting optimal dosing...",
  "Calculating savings...",
  "Finalizing your plan...",
]
```

---

### 7. Treatment Plan Summary

**Layout:**
```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│                    ✓ Your Plan is Ready                        │
│                                                                │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                                                          │  │
│  │   ┌────────┐                                             │  │
│  │   │  💉   │   SEMAGLUTIDE                               │  │
│  │   └────────┘   Weight Management                         │  │
│  │                                                          │  │
│  │   ─────────────────────────────────────────────────────  │  │
│  │                                                          │  │
│  │   3-MONTH NEW PATIENT PROGRAM                           │  │
│  │                                                          │  │
│  │   ┌────────────┬────────────┬────────────┐              │  │
│  │   │  MONTH 1   │  MONTH 2   │  MONTH 3   │              │  │
│  │   │────────────│────────────│────────────│              │  │
│  │   │  0.25mg    │   0.5mg    │   1.0mg    │              │  │
│  │   │  $239      │   $279     │   $319     │              │  │
│  │   └────────────┴────────────┴────────────┘              │  │
│  │                                                          │  │
│  │   ─────────────────────────────────────────────────────  │  │
│  │                                                          │  │
│  │   Total                                        $837      │  │
│  │   You save                                    -$210      │  │
│  │                                         ─────────────    │  │
│  │   Due today                                    $837      │  │
│  │                                                          │  │
│  │   ─────────────────────────────────────────────────────  │  │
│  │                                                          │  │
│  │   ✓ All injection supplies included                     │  │
│  │   ✓ Monthly physician consultations                     │  │
│  │   ✓ Free priority shipping                              │  │
│  │   ✓ Cancel anytime                                      │  │
│  │                                                          │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                │
│                                                                │
│   [Start Over]                      [Continue to Checkout →]   │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

**Animations:**
- Card slides up + fades in
- Checkmark animates in (draw effect)
- Price numbers count up
- Savings badge pulses subtly

---

## Iconography

Use **Lucide React** icons for consistency:

| Context | Icon |
|---------|------|
| Medication | `Pill`, `Syringe` |
| New Patient | `UserPlus`, `Sparkles` |
| Existing Patient | `UserCheck`, `RefreshCw` |
| Dosing | `Droplets`, `Scale` |
| Plan/Subscription | `Calendar`, `CreditCard` |
| Success | `CheckCircle`, `PartyPopper` |
| Back | `ArrowLeft`, `ChevronLeft` |
| Next | `ArrowRight`, `ChevronRight` |
| Loading | `Loader2` (spinning) |

---

## Responsive Behavior

### Desktop (1024px+)
- Centered content, max-width 800px
- Side-by-side cards (2-4 columns)
- Sticky footer with full-width buttons

### Tablet (768px - 1023px)
- 2-column card grid
- Slightly reduced padding

### Mobile (< 768px)
- Single column cards (stacked)
- Full-width sticky footer
- Bottom sheet for additional info
- Larger touch targets (min 48px)

---

## Micro-interactions

### Selection Card
1. **Hover:** Scale up 2%, border brightens
2. **Click:** Quick scale down (98%) then back
3. **Selected:** Blue border + glow pulse once

### Buttons
1. **Hover:** Background lightens, slight lift
2. **Click:** Scale to 97%, then back
3. **Loading:** Spinner replaces text

### Page Transitions
1. **Enter:** Fade in + slide from right
2. **Exit:** Fade out + slide to left
3. **Duration:** 400ms ease-out

### Progress Bar
1. **Fill:** Smooth width transition (500ms)
2. **Glow:** Subtle pulse on the leading edge

---

## Accessibility

- **Focus states:** Visible outline matching highlight color
- **Keyboard navigation:** Tab through all interactive elements
- **Screen readers:** Proper ARIA labels on all controls
- **Motion:** Respect `prefers-reduced-motion`
- **Contrast:** All text meets WCAG AA (4.5:1 minimum)

---

## Dependencies

```json
{
  "framer-motion": "^11.x",
  "lucide-react": "^0.x",
  "@radix-ui/react-radio-group": "^1.x",
  "tailwindcss": "^3.x",
  "clsx": "^2.x",
  "tailwind-merge": "^2.x"
}
```

---

## File Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   └── treatment/
│       └── page.tsx                # Treatment flow (single page app)
├── components/
│   ├── ui/                         # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Progress.tsx
│   │   └── RadioGroup.tsx
│   └── treatment/                  # Treatment flow components
│       ├── TreatmentFlow.tsx       # Main flow controller
│       ├── LandingHero.tsx
│       ├── QuestionCard.tsx        # Reusable question wrapper
│       ├── SelectionCard.tsx       # Reusable selection option
│       ├── MedicationSelect.tsx
│       ├── PatientTypeSelect.tsx
│       ├── DoseSelect.tsx
│       ├── PlanSelect.tsx
│       ├── LoadingAnimation.tsx
│       ├── TreatmentSummary.tsx
│       └── StickyFooter.tsx
├── hooks/
│   └── useTreatmentFlow.ts         # State management hook
└── lib/
    ├── types.ts
    ├── data/
    └── animations.ts               # Shared animation variants
```

---

## Additional Suggestions

### Nice-to-Have Features

1. **Medication Comparison Modal**
   - Quick comparison of selected med vs alternatives
   - Slide-up bottom sheet on mobile

2. **Dose Visualization**
   - Visual representation of dose progression
   - Animated syringe filling graphic

3. **Savings Calculator**
   - Interactive slider showing savings over time
   - "Save $X over 12 months" callout

4. **Confetti on Completion**
   - Subtle celebration animation when plan is ready
   - Using `canvas-confetti` library

5. **Sound Effects (Optional)**
   - Subtle click sounds on selection
   - Success chime on plan completion
   - Toggle in settings

6. **Share/Save Plan**
   - Generate shareable link
   - Download PDF summary
   - Email to self

### Future Considerations

- **A/B Testing:** Track which UI variations convert better
- **Analytics Events:** Track step completion, drop-off points
- **Error States:** Graceful handling if medication unavailable
- **Session Persistence:** Save progress to localStorage

