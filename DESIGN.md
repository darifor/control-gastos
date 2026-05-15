---
name: Professional Finance System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#40000d'
  on-tertiary-container: '#f23d5c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffdadb'
  tertiary-fixed-dim: '#ffb2b7'
  on-tertiary-fixed: '#40000d'
  on-tertiary-fixed-variant: '#92002a'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  data-mono:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is anchored in the concept of **Financial Clarity**. It balances the stoic reliability of traditional banking with the agility of modern fintech. The aesthetic is a hybrid of **Corporate Modern** and **Minimalism**, prioritizing data density without sacrificing legibility or airiness.

The target audience consists of professionals who value precision and efficiency. The UI evokes a sense of "organized calm," using a structured layout to reduce the cognitive load associated with managing money. Visual signals are intentional: stability is communicated through deep tones, while action and status are highlighted by vibrant, high-contrast accents.

## Colors

The palette is designed for semantic clarity and visual hierarchy:

*   **Primary (Slate Navy):** Used for core navigation, text, and structural elements to provide a foundation of stability.
*   **Secondary (Emerald Green):** Reserved for "positive" financial data—income, growth, savings goals, and success states.
*   **Tertiary (Coral Red):** Reserved for "negative" data—expenses, budget overages, alerts, and destructive actions.
*   **Neutral (Slate Grey):** Used for secondary text, borders, and inactive states to maintain a clean, professional backdrop.
*   **Surface:** A crisp white (#FFFFFF) background with ultra-light grey (#F8FAFC) for secondary containers to define depth.

## Typography

The design system utilizes **Inter** for its exceptional legibility and neutral, systematic character. It is a workhorse font that ensures financial figures are clear at any size.

The type scale is highly structured. Headlines use a tighter letter-spacing and heavier weights to anchor sections. Body copy is optimized for readability with generous line heights. For financial data specifically, we utilize `data-mono` (Inter with tabular lining figures enabled) to ensure that columns of numbers align perfectly for easy comparison.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. On desktop, content is contained within a 1280px max-width 12-column grid to maintain focus. On mobile, it transitions to a fluid 4-column layout.

Spacing is built on a 4px base unit. We use "Stacked Spacing" for vertical rhythm:
*   **Small (8px):** For related items like labels and inputs.
*   **Medium (16px):** For standard padding inside cards and components.
*   **Large (32px):** For separating distinct sections or card groups.

Ample whitespace is used strategically to prevent the "data-heavy" feel typical of finance apps, allowing the eye to rest between complex charts and lists.

## Elevation & Depth

This design system uses **Ambient Shadows** and **Tonal Layers** to create a layered, functional feel. We avoid heavy skeuomorphism in favor of subtle elevation levels:

1.  **Level 0 (Flat):** Main background.
2.  **Level 1 (Subtle):** Large cards and containers. Uses a soft, low-opacity shadow (0px 4px 12px rgba(15, 23, 42, 0.05)) to distinguish itself from the background.
3.  **Level 2 (Active):** Modals, dropdowns, and floating action buttons. Uses a more pronounced shadow (0px 12px 24px rgba(15, 23, 42, 0.12)) to indicate a layer closer to the user.

Depth is also communicated through color; secondary containers use a slightly cooler, lighter grey than the main canvas to "sink" or "lift" information without needing a shadow.

## Shapes

The shape language is **Soft-Geometric**. By using 0.5rem (8px) as the default corner radius, we soften the rigidity of a data-focused interface while maintaining a professional, structured appearance. 

*   **Small Elements (Checkboxes, Tags):** 4px radius.
*   **Standard Elements (Buttons, Inputs, Cards):** 8px radius.
*   **Large Elements (Modals, Feature Banners):** 16px radius.

Interactive elements never use sharp corners, ensuring the app feels approachable and modern.

## Components

### Buttons
Primary buttons are solid Slate Navy with white text. Secondary buttons use a Slate Grey outline. Action buttons (like "Add Income" or "Pay Bill") can adopt Emerald or Coral backgrounds to signify their intent.

### Input Fields
Inputs feature a subtle 1px Slate Grey border. When focused, the border transitions to Slate Navy with a soft 2px outer glow. Labels always sit above the field in `label-md`.

### Cards
The primary container for all financial data. Cards feature a white background, 8px corner radius, and Level 1 elevation. They have no border, relying on the shadow for definition against the slightly off-white background.

### Chips & Tags
Used for transaction categories. They feature low-saturation backgrounds (e.g., pale green background with emerald green text) to provide visual categorization without overwhelming the primary data.

### Lists
Transaction lists use a clean, horizontal row format. Income and Expense figures are right-aligned using `data-mono` typography, with income figures colored Emerald and expenses Slate Navy (not Coral, to avoid visual "noise"—Coral is reserved for alerts or over-budget states).

### Progress Bars
Used for budget tracking. The track is a light grey, while the fill is Emerald. If a budget is exceeded, the fill color switches to Coral.
