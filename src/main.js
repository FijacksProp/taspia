import { 
  createIcons, 
  Code2, 
  Terminal, 
  Laptop, 
  Layers, 
  Cpu, 
  GitBranch, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Check, 
  Sun, 
  Moon, 
  Sparkles, 
  Database, 
  Smartphone, 
  Search, 
  Copy, 
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowDownToLine, 
  Globe2, 
  Menu, 
  X, 
  BookOpen, 
  MapPin, 
  FolderGit2, 
  Send, 
  Eye, 
  Sliders 
} from 'lucide';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Initialize Lucide Icons
function initIcons() {
  createIcons({
    icons: {
      Code2,
      Terminal,
      Laptop,
      Layers,
      Cpu,
      GitBranch,
      ExternalLink,
      Github,
      Linkedin,
      Check,
      Sun,
      Moon,
      Sparkles,
      Database,
      Smartphone,
      Search,
      Copy,
      ArrowUpRight,
      ArrowDownRight,
      ArrowDownToLine,
      Globe2,
      Menu,
      X,
      BookOpen,
      MapPin,
      FolderGit2,
      Send,
      Eye,
      Sliders
    }
  });
}

initIcons();

/* ==========================================================================
   Theme Switcher (Dark / Light Mode)
   ========================================================================== */
const themeToggleBtn = document.getElementById('theme-toggle');
const root = document.documentElement;

function getPreferredTheme() {
  const savedTheme = localStorage.getItem('taspia-theme');
  if (savedTheme) return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('taspia-theme', theme);
}

// Initial theme application
setTheme(getPreferredTheme());

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });
}

// Listen for system theme changes if user hasn't explicitly set a preference
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('taspia-theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

/* ==========================================================================
   Mobile Navigation Menu
   ========================================================================== */
const menuBtn = document.querySelector('.menu-btn');
const header = document.querySelector('.header');

function closeMenu() {
  if (!header) return;
  header.classList.remove('menu-open');
  if (menuBtn) {
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Open navigation');
  }
}

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const isOpen = header.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded', String(isOpen));
    menuBtn.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

/* ==========================================================================
   Hero Interactive Terminal / Preview Card
   ========================================================================== */
const heroTabs = document.querySelectorAll('.card-tab');
const codeView = document.getElementById('hero-code-view');
const previewView = document.getElementById('hero-preview-view');
const fileLabel = document.getElementById('card-file-label');

heroTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    heroTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    
    const target = tab.dataset.target;
    if (target === 'preview') {
      if (codeView) codeView.style.display = 'none';
      if (previewView) previewView.style.display = 'flex';
      if (fileLabel) fileLabel.textContent = 'rendered ~ preview.tsx';
    } else {
      if (codeView) codeView.style.display = 'block';
      if (previewView) previewView.style.display = 'none';
      if (fileLabel) fileLabel.textContent = 'config ~ taspia.config.js';
    }
  });
});

// Interactive Mini Counter in Hero Preview
const countDec = document.getElementById('count-dec');
const countInc = document.getElementById('count-inc');
const countVal = document.getElementById('count-val');
let counter = 3;

if (countDec && countInc && countVal) {
  countDec.addEventListener('click', () => {
    if (counter > 0) {
      counter--;
      countVal.textContent = counter;
    }
  });
  countInc.addEventListener('click', () => {
    counter++;
    countVal.textContent = counter;
  });
}

/* ==========================================================================
   Interactive Dev Lab / Playground
   ========================================================================== */
const labNavItems = document.querySelectorAll('.lab-nav-item');
const labPanels = document.querySelectorAll('.lab-demo-panel');

labNavItems.forEach(nav => {
  nav.addEventListener('click', () => {
    const demoId = nav.dataset.demo;
    labNavItems.forEach(item => item.classList.remove('active'));
    nav.classList.add('active');

    labPanels.forEach(panel => {
      panel.classList.toggle('active', panel.id === `lab-panel-${demoId}`);
    });
  });
});

// Lab Demo 1: Economics Data Calculator
const calcCapital = document.getElementById('calc-capital');
const calcGrowth = document.getElementById('calc-growth');
const calcYears = document.getElementById('calc-years');

const valCapital = document.getElementById('val-capital');
const valGrowth = document.getElementById('val-growth');
const valYears = document.getElementById('val-years');

const resFinal = document.getElementById('res-final');
const resYield = document.getElementById('res-yield');
const resRoi = document.getElementById('res-roi');

function updateCalculator() {
  if (!calcCapital || !calcGrowth || !calcYears) return;
  const p = parseFloat(calcCapital.value);
  const r = parseFloat(calcGrowth.value) / 100;
  const t = parseFloat(calcYears.value);

  if (valCapital) valCapital.textContent = `$${p.toLocaleString()}`;
  if (valGrowth) valGrowth.textContent = `${(r * 100).toFixed(1)}%`;
  if (valYears) valYears.textContent = `${t} yr${t > 1 ? 's' : ''}`;

  // Compound Interest Formula A = P(1 + r)^t
  const a = p * Math.pow(1 + r, t);
  const gain = a - p;
  const roi = (gain / p) * 100;

  if (resFinal) resFinal.textContent = `$${Math.round(a).toLocaleString()}`;
  if (resYield) resYield.textContent = `+$${Math.round(gain).toLocaleString()}`;
  if (resRoi) resRoi.textContent = `${roi.toFixed(1)}%`;
}

[calcCapital, calcGrowth, calcYears].forEach(input => {
  if (input) input.addEventListener('input', updateCalculator);
});
updateCalculator();

// Lab Demo 2: Accessible Toast System
const toastContainer = document.getElementById('toast-container');
const toastSuccessBtn = document.getElementById('trigger-toast-success');
const toastInfoBtn = document.getElementById('trigger-toast-info');
const toastWarnBtn = document.getElementById('trigger-toast-warn');

function showToast(message, type = 'info') {
  if (!toastContainer) return;
  const toast = document.createElement('div');
  toast.className = `toast-item toast-${type}`;
  toast.setAttribute('role', 'alert');
  toast.innerHTML = `
    <span>${message}</span>
    <button style="color:inherit;opacity:0.8;font-size:16px;" aria-label="Dismiss toast">×</button>
  `;

  toast.querySelector('button').addEventListener('click', () => {
    toast.remove();
  });

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

if (toastSuccessBtn) {
  toastSuccessBtn.addEventListener('click', () => {
    showToast('✓ State synchronized successfully with localStorage.', 'success');
  });
}
if (toastInfoBtn) {
  toastInfoBtn.addEventListener('click', () => {
    showToast('ℹ Fetching latest economics time-series data feed.', 'info');
  });
}
if (toastWarnBtn) {
  toastWarnBtn.addEventListener('click', () => {
    showToast('⚠ High latency detected on API endpoint (320ms).', 'warning');
  });
}

// Lab Demo 3: Live Component Styler
const stylerCard = document.getElementById('styler-preview-card');
const radiusBtns = document.querySelectorAll('[data-radius]');
const accentBtns = document.querySelectorAll('[data-accent]');

radiusBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    radiusBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (stylerCard) {
      stylerCard.style.borderRadius = btn.dataset.radius;
    }
  });
});

accentBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    accentBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    if (stylerCard) {
      stylerCard.style.borderColor = btn.dataset.accent;
      const tag = stylerCard.querySelector('.styler-tag');
      if (tag) tag.style.background = btn.dataset.accent;
    }
  });
});

/* ==========================================================================
   Project Inspection Modal
   ========================================================================== */
const projectData = {
  econpulse: {
    title: 'EconPulse — Financial & Economic Metrics Dashboard',
    category: 'Web Application',
    overview: `
      <h4>Project Architecture & Intent</h4>
      <p>EconPulse is a modular web dashboard designed to track real-time macro-economic indicators, currency exchange movements, and key market indices without loading heavy graphing bloatware.</p>
      <p>Combining frontend engineering with an economics perspective, the application structures complex time-series datasets into clear, intuitive SVG and CSS-based visualizations that maintain a 60fps frame rate even on low-power mobile devices.</p>
      <h4>Engineering Highlights</h4>
      <ul>
        <li>Pure vanilla JavaScript state management using a lightweight PubSub subscriber pattern.</li>
        <li>Fluid responsive CSS Grid dashboard layout with dynamic container query adaptation.</li>
        <li>Optimized DOM rendering with zero runtime layout thrashing.</li>
        <li>Accessible data tables with keyboard navigation and ARIA landmarks.</li>
      </ul>
    `,
    code: `// Lightweight PubSub State Store for EconPulse
class MetricStore {
  constructor(initialData = {}) {
    this.state = initialData;
    this.subscribers = new Set();
  }

  getState() {
    return Object.freeze({ ...this.state });
  }

  setState(updates) {
    this.state = { ...this.state, ...updates };
    this.notify();
  }

  subscribe(listener) {
    this.subscribers.add(listener);
    return () => this.subscribers.delete(listener);
  }

  notify() {
    for (const sub of this.subscribers) {
      sub(this.state);
    }
  }
}

export const pulseStore = new MetricStore({
  indicators: ['GDP', 'CPI', 'Unemployment', 'Bond Yields'],
  activeFilter: 'quarterly',
  isRefreshing: false
});`,
    css: `/* Responsive CSS Grid Dashboard Architecture */
.econ-dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 1.5rem;
  contain: content;
}

.metric-widget {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.metric-widget:hover {
  transform: translateY(-2px);
  border-color: var(--border-accent);
}`
  },
  omniflow: {
    title: 'OmniFlow — Accessible UI Component System',
    category: 'Component Library',
    overview: `
      <h4>Accessible Design System Engineering</h4>
      <p>OmniFlow is a lightweight, dependency-free UI component toolkit built around the WAI-ARIA 1.2 authoring guidelines. It provides developers with drop-in accessible accordions, modals with focus trapping, tab lists, and fluid form controls.</p>
      <p>Every component is engineered to be fully operable via keyboard alone (Tab, Shift+Tab, Escape, Arrow keys) and verified with screen readers like NVDA and VoiceOver.</p>
      <h4>Engineering Highlights</h4>
      <ul>
        <li>Custom focus-trap algorithm restricting tab cycling within open modal layers.</li>
        <li>CSS custom property token architecture supporting seamless theme transitions.</li>
        <li>Automated ARIA state management (aria-expanded, aria-selected, aria-controls).</li>
      </ul>
    `,
    code: `// Focus Trap Manager for Accessible Dialogs
export function trapFocus(element) {
  const focusables = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstEl = focusables[0];
  const lastEl = focusables[focusables.length - 1];

  function handleKeydown(e) {
    if (e.key !== 'Tab') return;

    if (e.shiftKey) {
      if (document.activeElement === firstEl) {
        lastEl.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastEl) {
        firstEl.focus();
        e.preventDefault();
      }
    }
  }

  element.addEventListener('keydown', handleKeydown);
  firstEl?.focus();

  return () => element.removeEventListener('keydown', handleKeydown);
}`,
    css: `/* High-Contrast Accessible Focus Tokens */
:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 3px;
  box-shadow: 0 0 0 4px var(--accent-glow);
}

[role="tab"][aria-selected="true"] {
  border-bottom: 2px solid var(--accent-primary);
  color: var(--text-main);
  font-weight: 600;
}`
  },
  oakportal: {
    title: 'Oak Admissions Portal — Applicant Tracking UI',
    category: 'Educational Web App',
    overview: `
      <h4>Admissions Portal Architecture</h4>
      <p>Inspired by hands-on experience as an Educational Consultancy Assistant at Oak Admissions, this web application manages student application milestones, university document tracking, and deadline monitoring in a unified interface.</p>
      <p>Built with client-side reactive filtering and offline caching via localStorage, the portal ensures consultants and students have instant access to application statuses with zero page refreshes.</p>
      <h4>Engineering Highlights</h4>
      <ul>
        <li>Client-side fuzzy search and multi-criteria applicant status filtering.</li>
        <li>Form validation engine checking document formats and required fields before submission.</li>
        <li>Mobile-first interface tested on various viewport dimensions.</li>
      </ul>
    `,
    code: `// Dynamic Applicant Status Filter & Cache
export function filterApplicants(applicants, query, activeStatus) {
  return applicants.filter(app => {
    const matchesQuery = app.name.toLowerCase().includes(query.toLowerCase()) ||
                         app.university.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = activeStatus === 'all' || app.status === activeStatus;
    return matchesQuery && matchesStatus;
  });
}

// Local Storage Document Status Persistence
export function persistDocStatus(appId, docName, isVerified) {
  const current = JSON.parse(localStorage.getItem('oak_docs') || '{}');
  current[appId + '_' + docName] = {
    verified: isVerified,
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem('oak_docs', JSON.stringify(current));
}`,
    css: `/* Mobile-First Status Badges */
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-family: var(--font-mono);
}

.status-pill.verified {
  background: var(--accent-secondary-light);
  color: var(--accent-secondary);
}

.status-pill.pending {
  background: #fef3c7;
  color: #92400e;
}`
  },
  readwell: {
    title: 'ReadWell — Editorial Web Reader & Publication UI',
    category: 'Editorial Platform',
    overview: `
      <h4>High-Craft Editorial Web Reader</h4>
      <p>ReadWell is an editorial reading application optimized for readability, accessibility, and typographic harmony. It features dynamic font sizing, custom reading themes (Light, Dark, Sepia, High-Contrast), and an animated reading progress indicator.</p>
      <p>The interface uses Intersection Observers to track the reader's scroll position, dynamically highlighting active chapters and calculating estimated time remaining without degrading scroll performance.</p>
      <h4>Engineering Highlights</h4>
      <ul>
        <li>Fluid typography utilizing modern CSS clamp() functions across all breakpoints.</li>
        <li>Dynamic reading time and progress computation via passive scroll listeners.</li>
        <li>User preference persistence for typography scale and contrast themes.</li>
      </ul>
    `,
    code: `// Reading Progress and Active Section Tracker
export function initReadingTracker(articleEl, progressBar) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        document.querySelectorAll('.toc-link').forEach(link => {
          link.classList.toggle('active', link.hash === '#' + activeId);
        });
      }
    });
  }, { rootMargin: '0px 0px -70% 0px' });

  articleEl.querySelectorAll('section[id]').forEach(sec => observer.observe(sec));

  // Passive Scroll Progress
  window.addEventListener('scroll', () => {
    const totalHeight = articleEl.scrollHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, window.scrollY / totalHeight));
    progressBar.style.transform = \`scaleX(\${progress})\`;
  }, { passive: true });
}`,
    css: `/* Fluid Typography & Reading Progress Bar */
.reading-progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--accent-primary);
  transform-origin: 0 50%;
  transform: scaleX(0);
  z-index: 200;
  will-change: transform;
}

.editorial-body {
  font-size: clamp(1.05rem, 0.95rem + 0.5vw, 1.25rem);
  line-height: 1.8;
  max-width: 68ch;
  margin-inline: auto;
}`
  }
};

const dialog = document.getElementById('project-dialog');
const dialogTitle = document.getElementById('dialog-title');
const dialogContent = document.getElementById('dialog-content');
const dialogCloseBtns = document.querySelectorAll('.dialog-close, .dialog-done');
const modalTabs = document.querySelectorAll('.dialog-tab-btn');

let currentActiveProjectKey = 'econpulse';
let currentActiveTab = 'overview';

function renderModalTab() {
  const proj = projectData[currentActiveProjectKey];
  if (!proj || !dialogContent) return;

  if (currentActiveTab === 'overview') {
    dialogContent.innerHTML = proj.overview;
  } else if (currentActiveTab === 'code') {
    dialogContent.innerHTML = `
      <h4>Core JavaScript Implementation</h4>
      <p>Clean, modular code engineered with zero external framework dependencies:</p>
      <pre class="dialog-code-block"><code>${escapeHtml(proj.code)}</code></pre>
    `;
  } else if (currentActiveTab === 'css') {
    dialogContent.innerHTML = `
      <h4>CSS Architecture & Responsive Tokens</h4>
      <p>Modern layout primitives, accessibility focus tokens, and responsive custom properties:</p>
      <pre class="dialog-code-block"><code>${escapeHtml(proj.css)}</code></pre>
    `;
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

modalTabs.forEach(btn => {
  btn.addEventListener('click', () => {
    modalTabs.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentActiveTab = btn.dataset.tab;
    renderModalTab();
  });
});

document.querySelectorAll('[data-inspect]').forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.inspect;
    if (projectData[key]) {
      currentActiveProjectKey = key;
      currentActiveTab = 'overview';
      modalTabs.forEach(b => b.classList.toggle('active', b.dataset.tab === 'overview'));
      if (dialogTitle) dialogTitle.textContent = projectData[key].title;
      renderModalTab();
      if (dialog) dialog.showModal();
      document.body.classList.add('dialog-open');
    }
  });
});

dialogCloseBtns.forEach(b => {
  b.addEventListener('click', () => {
    if (dialog) dialog.close();
  });
});

if (dialog) {
  dialog.addEventListener('close', () => {
    document.body.classList.remove('dialog-open');
  });

  dialog.addEventListener('click', e => {
    if (e.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        dialog.close();
      }
    }
  });
}

/* ==========================================================================
   Copy Email Action
   ========================================================================== */
const copyEmailBtn = document.getElementById('copy-email');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', async () => {
    const label = copyEmailBtn.querySelector('span');
    const originalText = label ? label.textContent : 'Copy email';
    try {
      await navigator.clipboard.writeText('joy02taspi@gmail.com');
      if (label) label.textContent = 'Copied to clipboard!';
    } catch {
      if (label) label.textContent = 'joy02taspi@gmail.com';
    }
    setTimeout(() => {
      if (label) label.textContent = originalText;
    }, 2500);
  });
}

/* ==========================================================================
   Interactive Contact Form Validation & Mailto Trigger
   ========================================================================== */
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const messageInput = document.getElementById('form-message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const message = messageInput ? messageInput.value.trim() : '';

    if (!name || !email || !message) {
      if (formStatus) {
        formStatus.textContent = 'Please fill out all fields before sending.';
        formStatus.style.color = '#ef4444';
      }
      return;
    }

    if (formStatus) {
      formStatus.textContent = '✓ Opening email client with your message...';
      formStatus.style.color = 'var(--accent-terminal)';
    }

    const subject = encodeURIComponent('Web Development Inquiry from ' + name);
    const body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);
    window.location.href = 'mailto:joy02taspi@gmail.com?subject=' + subject + '&body=' + body;

    setTimeout(() => {
      contactForm.reset();
      if (formStatus) {
        setTimeout(() => { formStatus.textContent = ''; }, 5000);
      }
    }, 1500);
  });
}

/* ==========================================================================
   GSAP Animations & ScrollTriggers
   ========================================================================== */
gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  gsap.from('.hero-copy, .dev-card', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out'
  });

  gsap.utils.toArray('.project-card, .skill-category, .exp-card, .pillar-card').forEach(el => {
    gsap.from(el, {
      y: 18,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 92%',
        once: true
      }
    });
  });
});

/* ==========================================================================
   Active Navigation Link on Scroll
   ========================================================================== */
const navAnchors = [...document.querySelectorAll('.nav-links a')];
const trackedSections = navAnchors
  .map(link => document.querySelector(link.hash))
  .filter(Boolean);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => {
          if (a.hash === `#${entry.target.id}`) {
            a.setAttribute('aria-current', 'location');
          } else {
            a.removeAttribute('aria-current');
          }
        });
      }
    });
  },
  { rootMargin: '-20% 0px -65% 0px', threshold: 0 }
);

trackedSections.forEach(section => observer.observe(section));
