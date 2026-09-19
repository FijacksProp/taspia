import { 
  createIcons, 
  ArrowUpRight, 
  ArrowDownRight, 
  ArrowDown, 
  ArrowUp, 
  ArrowLeft, 
  ArrowDownToLine, 
  Globe2, 
  Menu, 
  X, 
  Code2, 
  ScanSearch, 
  LayoutTemplate, 
  ListChecks, 
  Copy, 
  BookOpen, 
  MapPin 
} from 'lucide';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Initialize Lucide Icons
createIcons({ 
  icons: { 
    ArrowUpRight, 
    ArrowDownRight, 
    ArrowDown, 
    ArrowUp, 
    ArrowLeft, 
    ArrowDownToLine, 
    Globe2, 
    Menu, 
    X, 
    Code2, 
    ScanSearch, 
    LayoutTemplate, 
    ListChecks, 
    Copy, 
    BookOpen, 
    MapPin 
  } 
});

// Mobile Navigation
const menu = document.querySelector('.menu');
const header = document.querySelector('.header');

function closeMenu() { 
  if (!header) return;
  header.classList.remove('menu-open'); 
  if (menu) {
    menu.setAttribute('aria-expanded', 'false'); 
    menu.setAttribute('aria-label', 'Open navigation'); 
  }
}

if (menu) {
  menu.addEventListener('click', () => { 
    const open = header.classList.toggle('menu-open'); 
    menu.setAttribute('aria-expanded', String(open)); 
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); 
  });
}

document.querySelectorAll('.header a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

// Interactive Modal Content (Work Samples & Frameworks)
const notes = {
  webdev: {
    title: 'Building a responsive economic metrics calculator.',
    body: `
      <p class="note-disclosure">An illustrative web development sample prepared for this portfolio, demonstrating clean vanilla JavaScript and responsive CSS layout.</p>
      <h3>The objective</h3>
      <p>Create a lightweight, interactive web component that calculates compound growth and returns on economic indicators in real time, without heavy charting dependencies.</p>
      
      <h3>Implementation approach</h3>
      <ul>
        <li><strong>Vanilla JavaScript DOM APIs:</strong> Reactive input listeners that compute mathematical values without framework overhead.</li>
        <li><strong>Responsive CSS Grid:</strong> Fluid card layout that seamlessly adapts from mobile screens to desktop viewports.</li>
        <li><strong>Accessibility:</strong> Semantic form labels and screen-reader compliant value readouts.</li>
      </ul>

      <h3>Sample logic</h3>
      <pre><code>// Dynamic compound growth calculation
function calculateYield(principal, annualRate, years) {
  const rate = annualRate / 100;
  const futureValue = principal * Math.pow(1 + rate, years);
  const totalGain = futureValue - principal;
  return {
    futureValue: Math.round(futureValue),
    totalGain: Math.round(totalGain),
    roi: ((totalGain / principal) * 100).toFixed(1)
  };
}</code></pre>

      <h3>Why it matters</h3>
      <p>Combining economics math with frontend engineering produces fast, dependable web tools that load instantly and provide immediate value to the user.</p>
    `
  },
  research: {
    title: 'From raw market data to a verified answer.',
    body: `
      <p class="note-disclosure">An illustrative market research framework prepared for this portfolio. It describes a methodical approach to data verification and competitor intelligence.</p>
      
      <h3>01 / Define the core research question</h3>
      <p>What does the client or team actually need to decide? Setting a precise scope and hypothesis prevents wasted time collecting irrelevant noise.</p>
      
      <h3>02 / Identify primary &amp; verified sources</h3>
      <p>Rely on official industry reports, regulatory filings, institutional datasets, and primary competitor documentation. Always log source URLs and timestamps.</p>
      
      <h3>03 / Cross-verify and check anomalies</h3>
      <p>Compare competing claims across multiple independent channels. Flag missing context, methodology differences, or promotional bias before presenting figures.</p>
      
      <h3>04 / Structure into actionable intelligence</h3>
      <p>Organize the output into an executive summary, clear data tables (e.g. spreadsheet-ready), and source citations so any stakeholder can verify the logic.</p>
    `
  },
  seo: {
    title: 'Structuring web content for search and readability.',
    body: `
      <p class="note-disclosure">An illustrative digital operations and SEO case study prepared for this portfolio.</p>
      
      <h3>The challenge</h3>
      <p>Web pages often suffer from either keyword stuffing that hurts human readability, or unstructured prose that search engine crawlers struggle to interpret.</p>
      
      <h3>The approach</h3>
      <ul>
        <li><strong>Semantic Document Outline:</strong> Ensuring a single authoritative H1, logical H2/H3 subheadings, and descriptive paragraph leads.</li>
        <li><strong>User-Intent Keyword Integration:</strong> Embedding target search terms into natural, conversational copy rather than artificial keyword lists.</li>
        <li><strong>Metadata &amp; Internal Linking:</strong> Crafting accurate meta descriptions, descriptive anchor text, and clean URL slugs.</li>
      </ul>

      <h3>The result</h3>
      <p>Pages that both search engines index with confidence and human visitors read from start to finish with ease.</p>
    `
  }
};

// Dialog Controller
const dialog = document.querySelector('#note-dialog');
document.querySelectorAll('[data-note]').forEach(button => {
  button.addEventListener('click', () => { 
    const note = notes[button.dataset.note]; 
    if (note && dialog) {
      document.querySelector('#note-title').textContent = note.title; 
      document.querySelector('#note-body').innerHTML = note.body; 
      dialog.showModal(); 
      document.body.classList.add('dialog-open'); 
    }
  });
});

document.querySelectorAll('.close-dialog, .dialog-done').forEach(b => {
  b.addEventListener('click', () => {
    if (dialog) dialog.close();
  });
});

if (dialog) {
  dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  dialog.addEventListener('click', e => { 
    if (e.target === dialog) { 
      const r = dialog.getBoundingClientRect(); 
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
        dialog.close(); 
      }
    } 
  });
}

// Copy Email Button with Status Feedback
const copyBtn = document.querySelector('#copy-email');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => { 
    const label = copyBtn.querySelector('span'); 
    const status = document.querySelector('#copy-status'); 
    try { 
      await navigator.clipboard.writeText('joy02taspi@gmail.com'); 
      if (label) label.textContent = 'Copied!'; 
      if (status) status.textContent = 'Email address copied to clipboard'; 
    } catch { 
      if (label) label.textContent = 'Use the email link'; 
      if (status) status.textContent = 'Copy unavailable. Select the email address or use the email link.'; 
    } 
    setTimeout(() => { 
      if (label) label.textContent = 'Copy email address'; 
    }, 2500); 
  });
}

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);
gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  gsap.from('.hero-copy, .profile-card', { 
    y: 14, 
    duration: 0.7, 
    stagger: 0.1, 
    ease: 'power2.out' 
  });

  gsap.utils.toArray('.service, .role, .sample').forEach(el => { 
    gsap.from(el, { 
      y: 12, 
      duration: 0.5, 
      ease: 'power2.out', 
      scrollTrigger: { 
        trigger: el, 
        start: 'top 96%', 
        once: true 
      } 
    }); 
  });
});

// Navigation Active State on Scroll
const navLinks = [...document.querySelectorAll('#navigation a')];
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        if (link.hash === '#' + entry.target.id) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }
  });
}, { rootMargin: '-10% 0px -60% 0px', threshold: 0 });

navLinks.forEach(link => { 
  const section = document.querySelector(link.hash); 
  if (section) sectionObserver.observe(section); 
});
