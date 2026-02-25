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
  const projectFolder = carousel.dataset.project;
  const totalImages = parseInt(carousel.dataset.count);
  let current = 1;

  carousel.querySelector('.left').addEventListener('click', () => {
    current = current === 1 ? totalImages : current - 1;
    img.src = `Project Photos/${projectFolder}/${current}.jpg`;
  });

  carousel.querySelector('.right').addEventListener('click', () => {
    current = current === totalImages ? 1 : current + 1;
    img.src = `Project Photos/${projectFolder}/${current}.jpg`;
  });
});


document.querySelectorAll('.carousel').forEach(carousel => {
  const img = carousel.querySelector('img');
  const captionEl = carousel.querySelector('.carousel-caption');

  const projectFolder = carousel.dataset.project;
  const totalImages = parseInt(carousel.dataset.count);
  const captions = JSON.parse(carousel.dataset.captions);

  let current = 1;

  function updateCarousel() {
    img.src = `Project Photos/${projectFolder}/${current}.jpg`;
    captionEl.textContent = captions[current - 1] || '';
  }

  carousel.querySelector('.left').addEventListener('click', () => {
    current = current === 1 ? totalImages : current - 1;
    updateCarousel();
  });

  carousel.querySelector('.right').addEventListener('click', () => {
    current = current === totalImages ? 1 : current + 1;
    updateCarousel();
  });

  /* ---- Swipe Support ---- */
  let startX = 0;

  img.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  img.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        current = current === totalImages ? 1 : current + 1; // swipe left
      } else {
        current = current === 1 ? totalImages : current - 1; // swipe right
      }
      updateCarousel();
    }
  });

  // initialize
  updateCarousel();
});