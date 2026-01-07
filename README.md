# FitnessFlicks Design System

This folder contains all design-only React components and pages for the FitnessFlicks app. These are pure UI components without any backend logic or API calls.

## Folder Structure

```
design/
├── components/         # Reusable UI components
│   ├── DesignButton.tsx
│   ├── DesignCard.tsx
│   ├── DesignInput.tsx
│   ├── DesignNavbar.tsx
│   ├── DesignHero.tsx
│   ├── DesignPricingCard.tsx
│   └── index.ts
├── pages/              # Complete page designs
│   ├── DesignHome.tsx
│   ├── DesignLogin.tsx
│   ├── DesignPricing.tsx
│   ├── DesignAccount.tsx
│   ├── DesignWatch.tsx
│   └── index.ts
├── layouts/            # Layout components (if needed)
├── DesignShowcase.tsx  # Preview all designs in one place
└── index.tsx           # Main export file
```

## Color Palette

- **Background**: `#0D0F14` (dark navy)
- **Primary/Orange**: `#F97316`
- **Cyan Accent**: `#22D3EE`
- **Text White**: `#FFFFFF`
- **Text Gray**: `#9CA3AF`
- **Border Gray**: `#374151`

## Components

### DesignButton
Primary button with variants: `primary`, `secondary`, `outline`, `ghost`

### DesignWorkoutCard
Workout video card with hover effects, play button, and progress bar

### DesignCategoryCard
Category card with gradient overlay

### DesignInput
Form input with optional icon

### DesignNavbar
Navigation bar with logo, menu items, and user dropdown

### DesignHero
Hero section with background image, title, and CTA buttons

### DesignPricingCard
Pricing plan card with features list

## Pages

- **DesignHomePage** - Main home/browse page
- **DesignLoginPage** - Phone login page
- **DesignVerifyOtpPage** - OTP verification page
- **DesignCompleteProfilePage** - Profile setup page
- **DesignPricingPage** - Subscription plans page
- **DesignAccountPage** - User account settings
- **DesignWatchPage** - Video player page
- **DesignSubscriptionRequiredPage** - Paywall page

## Usage

View the design showcase at `/design` route or import components directly:

```tsx
import { DesignButton, DesignWorkoutCard } from "@/design/components";
import { DesignHomePage } from "@/design/pages";
```
