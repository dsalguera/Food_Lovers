'use strict';
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
$('#year').textContent = new Date().getFullYear();
const menuToggle = $('#menuToggle');
const nav = $('#nav');
menuToggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); menuToggle.setAttribute('aria-expanded', String(open)); });
$$('.nav a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuToggle.setAttribute('aria-expanded','false'); }));
const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); } }); }, { threshold: .09 });
$$('.reveal').forEach(el => observer.observe(el));
$$('.filter').forEach(btn => btn.addEventListener('click', () => { const filter = btn.dataset.filter; $$('.filter').forEach(b => { const active = b === btn; b.classList.toggle('active',active); b.setAttribute('aria-pressed',String(active)); }); $$('.menu-card').forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; }); }));
let previousFocus = null;
function openDialog(dialog){ previousFocus = document.activeElement; dialog.classList.add('open'); dialog.setAttribute('aria-hidden','false'); document.body.classList.add('locked'); dialog.querySelector('button')?.focus(); }
function closeDialog(dialog){ dialog.classList.remove('open'); dialog.setAttribute('aria-hidden','true'); document.body.classList.remove('locked'); previousFocus?.focus(); }
const lightbox = $('#lightbox');
$$('.gallery-tile').forEach(tile => tile.addEventListener('click', () => { const img = $('#lightboxImage'); img.src = getComputedStyle(tile).backgroundImage.slice(5,-2); img.alt = tile.dataset.caption; $('#lightboxCaption').textContent = tile.dataset.caption; openDialog(lightbox); }));
$('#lightboxClose').addEventListener('click', () => closeDialog(lightbox));
lightbox.addEventListener('click', e => { if(e.target === lightbox) closeDialog(lightbox); });
const modal = $('#menuModal');
$$('.menu-detail').forEach(button => button.addEventListener('click', () => { $('#modalTitle').textContent = button.dataset.item; $('#modalPrice').textContent = button.dataset.price; $('#modalDescription').textContent = button.dataset.description; openDialog(modal); }));
$('#modalClose').addEventListener('click', () => closeDialog(modal));
$('#modalDone').addEventListener('click', () => closeDialog(modal));
modal.addEventListener('click', e => { if(e.target === modal) closeDialog(modal); });
document.addEventListener('keydown', e => { if(e.key === 'Escape'){ if(lightbox.classList.contains('open')) closeDialog(lightbox); if(modal.classList.contains('open')) closeDialog(modal); } });
$('#newsletter').addEventListener('submit', e => { e.preventDefault(); $('#newsletterMessage').textContent = 'Thanks! This is a demo, so no email was submitted.'; e.target.reset(); });
