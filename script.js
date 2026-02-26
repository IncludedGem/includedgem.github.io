// Smooth scroll (nice touch)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href'))
      .scrollIntoView({ behavior: 'smooth' });
  });
});

// Auto-detect GitHub Pages repo base path
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
  const names = [
    `${current}.jpg`,
    `${current}.jpeg`,
    `${current}.png`,
    `0${current}.jpg`,
    `0${current}.jpeg`,
    `0${current}.png`
  ];

  let i = 0;

  img.onerror = () => {
    i++;
    if (i < names.length) {
      img.src = `${BASE_PATH}Project Photos/${projectFolder}/${names[i]}`;
    } else {
      img.src = `${BASE_PATH}Project Photos/placeholder.png`;
    }
  };

  img.src = `${BASE_PATH}Project Photos/${projectFolder}/${names[i]}`;
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