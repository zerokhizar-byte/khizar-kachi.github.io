(() => {
  const progress = document.getElementById('progress');
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.getElementById('menuToggle');
  const year = document.getElementById('year');
  year.textContent = new Date().getFullYear();

  // Accessible typing effect for the hero specialties.
  const typingText = document.getElementById('typingText');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typingText && !reduceMotion) {
    const words = ['Robotics', 'Artificial Intelligence', 'Machine Learning', 'Computer Vision', 'Industrial Automation'];
    let wordIndex = 0;
    let charIndex = words[0].length;
    let deleting = true;
    const type = () => {
      const word = words[wordIndex];
      if (deleting) {
        charIndex--;
        typingText.textContent = word.slice(0, Math.max(0, charIndex));
        if (charIndex <= 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          window.setTimeout(type, 300);
          return;
        }
        window.setTimeout(type, 48);
      } else {
        const nextWord = words[wordIndex];
        charIndex++;
        typingText.textContent = nextWord.slice(0, charIndex);
        if (charIndex >= nextWord.length) {
          deleting = true;
          window.setTimeout(type, 1450);
          return;
        }
        window.setTimeout(type, 82);
      }
    };
    window.setTimeout(type, 1400);
  }

  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }));

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }
})();
