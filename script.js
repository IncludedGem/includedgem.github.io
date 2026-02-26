// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// GitHub Pages base path
const BASE_PATH = window.location.pathname.split('/')[1]
  ? `/${window.location.pathname.split('/')[1]}/`
  : '/';

document.querySelectorAll('.carousel').forEach(carousel => {
  const img = carousel.querySelector('img');
  const captionEl = carousel.querySelector('.carousel-caption');

  const projectFolder = carousel.dataset.project;
  const totalImages = parseInt(carousel.dataset.count);
  const captions = JSON.parse(carousel.dataset.captions);

  let current = 1;

  function updateCarousel() {
    img.src = `${BASE_PATH}Project Photos/${projectFolder}/p${current}.jpg`;
    captionEl.textContent = captions[current - 1] || '';
  }

  // Buttons
  carousel.querySelector('.left').addEventListener('click', () => {
    current = current === 1 ? totalImages : current - 1;
    updateCarousel();
  });

  carousel.querySelector('.right').addEventListener('click', () => {
    current = current === totalImages ? 1 : current + 1;
    updateCarousel();
  });

  // Swipe
  let startX = 0;

  img.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  img.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      current = diff > 0
        ? (current === totalImages ? 1 : current + 1)
        : (current === 1 ? totalImages : current - 1);
      updateCarousel();
    }
  });

  updateCarousel();
});