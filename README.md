# Joynob Akhter Taspia — Frontend Web Developer Portfolio

A fast, responsive, and accessible personal portfolio website showcasing modern frontend web development, UI engineering, and data-driven systems design.

Built with **HTML5**, **Modern CSS (Custom Properties, Grid, Flexbox)**, **JavaScript (ES6+)**, **Vite**, **GSAP (ScrollTrigger)**, and **Lucide Icons**.

## Features

- **Web Developer Identity**: Focused on frontend engineering, responsive design systems, accessibility (WCAG), and clean code architectures.
- **Dark / Light Theme System**: Dynamic CSS custom property token system with automatic system preference detection and `localStorage` persistence.
- **Interactive Hero Dev Card**: Terminal code inspector with live interactive mini-preview and reactive state demo.
- **Featured Web Projects**: In-depth project case studies with an interactive code inspector dialog (Architecture, JavaScript Logic, CSS & a11y tokens).
- **Interactive Dev Lab**: Live client-side playground featuring:
  1. *Economics Compound Growth Modeler* (Dynamic math engine and real-time reactive DOM calculation)
  2. *Accessible Toast Notification Dispatcher* (ARIA live regions with auto-dismiss timers)
  3. *Dynamic CSS Variable Token Styler* (Real-time border curvature and accent color testing)
- **Technical Skills Matrix**: Comprehensive categorization of Core Frontend, Tooling & Build, Quality & a11y, and Systems & Design.
- **Interactive Contact Hub**: Client-side validated contact form with email client triggering, instant copy-to-clipboard button, and social links.

## Local Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Structure

- `index.html`: Semantic HTML5 markup, meta tags, and accessibility landmarks.
- `src/style.css`: Comprehensive design system, theme variables, fluid typography (`clamp()`), and responsive media queries.
- `src/main.js`: Theme toggle logic, interactive Dev Lab widgets, project inspector modal dialog, Lucide icons, and GSAP animations.
- `public/`: Static assets, favicon, and downloadable résumé PDF.
