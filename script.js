const links = [...document.querySelectorAll('#contents-nav a')];
const sections = links
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

    if (!visible) return;

    links.forEach((link) => {
      const isCurrent = link.getAttribute('href') === `#${visible.target.id}`;
      link.classList.toggle('active', isCurrent);
      if (isCurrent) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -70% 0px', threshold: 0 });

  sections.forEach((section) => observer.observe(section));
}
