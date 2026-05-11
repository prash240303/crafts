# Wabi Onboarding UI - Complete Specification

## Overview
This is an animated onboarding flow for the "Wabi" software platform. The animation loops through a sequence of screens with smooth transitions and a rotating 3D blob animation.

## Screen Layout
- **Format**: Mobile mockup (iPhone style with notch)
- **Dimensions**: 720x720px (displayed in phone frame)
- **Background**: Light/white with colorful gradient blur effects in corners
- **Phone Bezel**: Black frame with rounded corners and notch at top

## Animation Sequence (Loop - ~19 seconds total)

### Screen 1: Welcome (0-1s)
- **Text**: "A new era of software is here."
- **CTA Text**: "Swipe up to enter"
- **Animation**: Subtle fade-in, no blob visible
- **Duration**: ~1 second

### Screen 2: Blob Intro (1-3s)
- **Text**: "Meet Wabi."
- **Elements**: Single subtle circle/blob above text
- **Animation**: Blob appears and begins rotating
- **Duration**: ~2 seconds

### Screen 3: Full Interface (3-19s) - MAIN SCREEN
- **Primary Heading**: "Meet Wabi."
- **Subtitle**: "The first personal software platform."
- **Blob Animation**: Large, colorful 3D rotating sphere with:
  - Multiple circular icons/images inside
  - Vibrant colors: orange, purple, blue, red, gold
  - Continuous rotation (360°) throughout
  - Morphing/scaling particles within
  - Positioned at top center of screen
  
- **Interactive Button**: Plus (+) icon
  - Positioned below the blob
  - Light gray/white background circle
  - Slightly elevated/subtle shadow
  - *Note: Non-functional in this demo*
  
- **Auth Buttons** (at bottom):
  1. **Google Button**
     - White background
     - Google logo (left side)
     - Text: "Continue with Google"
     - Rounded corners
     - Clickable state
  
  2. **Apple Button**
     - Black background
     - Apple logo (left side)
     - Text: "Continue with Apple"
     - Rounded corners
     - Slightly larger/more prominent than Google button
     - Positioned below Google button

- **Layout Spacing**:
  - Blob: Top 20-25% of screen
  - Plus icon: Centered, ~40% from top
  - Main text: ~55% from top
  - Auth buttons: Bottom 20-25% of screen
  - 16px padding on sides

## Visual Details

### Colors
- **Background**: White (#FFFFFF)
- **Text**: Dark gray/black (#000000 or #1a1a1a)
- **Plus Icon**: Light gray (#E5E5E5)
- **Button Text**: White text on black, black text on white
- **Accent Gradients**: Rainbow/neon colors in blob (RGB spectrum)

### Typography
- **Heading "Meet Wabi."**: 28-32px, bold/semibold, centered
- **Subtitle**: 18-20px, regular weight, centered
- **Button Text**: 16px, medium weight
- **"Swipe up to enter"**: 12-14px, light gray, small text

### Shadows & Effects
- **Buttons**: Subtle shadow (0 2px 8px rgba(0,0,0,0.1))
- **Plus Icon**: Subtle elevation
- **Phone Mockup**: Dark border stroke (~2-3px)
- **Background Blur**: Colorful gradient blur in background corners (bokeh effect)

## Animation Details

### 3D Blob Animation
- **Type**: Continuous rotation + morphing
- **Rotation**: 360° complete rotation cycle (~3-4 seconds per full rotation)
- **Morphing**: Subtle shape changes, particles flow through
- **Scale**: Expands and contracts slightly (95-105% of base size)
- **Particle Effect**: Multiple 3D orbs within the main blob, rotating at different speeds
- **Colors**: Dynamic - shifts through warm colors (orange → purple → blue)

### Screen Transitions
- **Fade**: Opacity transitions between screens (200-300ms)
- **Timing**: Eased (ease-in-out)
- **Loop**: Seamlessly loops back to Screen 1 after Screen 3 completes

### Interaction States
- **Hover States**: Buttons show slight darkening/opacity change
- **Click States**: Buttons press down slightly (active state)
- **Plus Icon**: Light hover effect (opacity increase)

## Technical Implementation Notes

### For React/TypeScript:
1. Use `Three.js` or similar for 3D blob animation
2. Implement animation with `framer-motion` for transitions
3. Use CSS for button styling and base layout
4. Canvas element for blob rendering
5. Consider `Spline` or pre-rendered 3D model for blob

### Key Components:
- `PhoneMockup`: Container with phone frame styling
- `Blob3D`: 3D rotating sphere component
- `OnboardingScreen`: Screen content wrapper
- `AuthButton`: Reusable button component
- `ScreenTransition`: Controls animation between screens

### Animation Library Recommendation:
- **Primary**: Three.js (for 3D blob)
- **Secondary**: Framer Motion (for screen transitions)
- **Alternative**: Spline (for pre-made 3D models with easier integration)

## Responsive Considerations
- Mobile: 100% width (account for safe areas)
- Tablet: Constrain to ~400px width (mockup style)
- Desktop: Center on screen, keep max-width ~450px

## Accessibility
- Ensure ARIA labels on buttons
- Sufficient color contrast (WCAG AA minimum)
- Reduce motion: Respect `prefers-reduced-motion` media query
- Keyboard navigation for auth buttons