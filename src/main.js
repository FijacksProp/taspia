import { createIcons, ArrowUpRight, ArrowDownRight, ArrowDown, ArrowUp, ArrowLeft, ArrowDownToLine, Globe2, Menu, X, PenLine, ScanSearch, LayoutTemplate, ListChecks, Copy } from 'lucide';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

createIcons({ icons: { ArrowUpRight, ArrowDownRight, ArrowDown, ArrowUp, ArrowLeft, ArrowDownToLine, Globe2, Menu, X, PenLine, ScanSearch, LayoutTemplate, ListChecks, Copy } });
const menu = document.querySelector('.menu');
const header = document.querySelector('.header');
function closeMenu() { header.classList.remove('menu-open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); }
menu.addEventListener('click', () => { const open = header.classList.toggle('menu-open'); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); });
document.querySelectorAll('.header a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
matchMedia('(min-width: 761px)').addEventListener('change', closeMenu);

const notes = {
  writing: { title: 'A small edit. A better sentence.', body: `<p class="note-disclosure">An illustrative writing exercise prepared for this portfolio. This is independent sample content, not a client assignment.</p><h3>The starting point</h3><blockquote>It is important to note that students should make sure that they carefully review all of the requirements prior to submitting their application.</blockquote><h3>A clearer version</h3><blockquote class="edited">Review every requirement before submitting your application.</blockquote><h3>What changed?</h3><p>The revised sentence leads with the action, removes repeated wording, and keeps the instruction intact. For educational content, a direct sentence can make the next step easier to understand.</p><p>The aim is to preserve meaning while giving the reader less work to do.</p>` },
  research: { title: 'From a question to a useful answer.', body: `<p class="note-disclosure">An illustrative research framework prepared for this portfolio. It describes an approach, not a completed client project.</p><h3>01 / Define the question</h3><p>What does the reader actually need to know? Set a clear scope before collecting information.</p><h3>02 / Find the source</h3><p>Start with original publications, official guidance, or the organization responsible for the information. Record the source and its date.</p><h3>03 / Check the details</h3><p>Compare key claims, look for missing context, and flag anything that needs confirmation. A confident answer should still show where uncertainty remains.</p><h3>04 / Make it usable</h3><p>Organize the findings around the original question. Use short explanations, clear headings, and source links so another person can follow the reasoning.</p>` }
};
const dialog = document.querySelector('#note-dialog');
document.querySelectorAll('[data-note]').forEach(button => button.addEventListener('click', () => { const note = notes[button.dataset.note]; document.querySelector('#note-title').textContent = note.title; document.querySelector('#note-body').innerHTML = note.body; dialog.showModal(); document.body.classList.add('dialog-open'); }));
document.querySelectorAll('.close-dialog,.dialog-done').forEach(b => b.addEventListener('click', () => dialog.close()));
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
dialog.addEventListener('click', e => { if(e.target === dialog) { const r = dialog.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
document.querySelector('#copy-email').addEventListener('click', async () => { const label = document.querySelector('#copy-email span'); const status = document.querySelector('#copy-status'); try { await navigator.clipboard.writeText('joy02taspi@gmail.com'); label.textContent = 'Copied!'; status.textContent = 'Email address copied'; } catch { label.textContent = 'Use the email link'; status.textContent = 'Copy unavailable. Select the email address or use the email link.'; } setTimeout(() => { label.textContent = 'Copy email'; }, 3000); });

gsap.registerPlugin(ScrollTrigger);
gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
  gsap.from('.hero h1', { y: 24, opacity: 0, duration: 1, ease: 'power2.out' });
  gsap.from('.hero-bottom', { y: 16, opacity: 0, duration: .8, delay: .2 });
  gsap.utils.toArray('.section-heading,.about-grid,.academic,.skill-card,.role,.notebook-card,.learning').forEach(el => { gsap.from(el, { y: 22, opacity: 0, duration: .65, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } }); });
});
