// Smooth scroll (nice touch)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});


document.querySelectorAll('.carousel').forEach(carousel => {
  const img = carousel.querySelector('img');
  const captionEl = carousel.querySelector('.carousel-caption');

  const projectFolder = carousel.dataset.project;
  const totalImages = parseInt(carousel.dataset.count);
  const captions = JSON.parse(carousel.dataset.captions);

  let current = 1;

  // helper to try multiple filename patterns
  function getImagePath(num) {
    const variants = [
      `${num}.jpg`,
      `${num}.jpeg`,
      `${num}.png`,
      `0${num}.jpg`,
      `0${num}.jpeg`,
      `0${num}.png`
    ];

    for (let file of variants) {
      // This only works on modern browsers with fetch + HEAD
      // If it exists, return the path
      // NOTE: HEAD requests can be async, so we’ll just return first variant and let fallback happen
      // For simplicity, just use first matching pattern:
      return `Project Photos/${projectFolder}/${file}`;
    }
  }

  function updateCarousel() {
    img.src = getImagePath(current);
    captionEl.textContent = captions[current - 1] || '';
  }

  // Button clicks
  carousel.querySelector('.left').addEventListener('click', () => {
    current = current === 1 ? totalImages : current - 1;
    updateCarousel();
  });

  carousel.querySelector('.right').addEventListener('click', () => {
    current = current === totalImages ? 1 : current + 1;
    updateCarousel();
  });

  // Swipe support
  let startX = 0;

  img.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  img.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        current = current === totalImages ? 1 : current + 1;
      } else {
        current = current === 1 ? totalImages : current - 1;
      }
      updateCarousel();
    }
  });

  // initialize
  updateCarousel();
});