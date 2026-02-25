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