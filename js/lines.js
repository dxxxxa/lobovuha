// Анимация абстрактных линий на canvas
const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100vw';
canvas.style.height = '100vh';
canvas.style.zIndex = '0';
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let w, h;

function resize() {
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.width = w;
  canvas.height = h;
}
window.addEventListener('resize', resize);
resize();

function randomLine() {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    length: 200 + Math.random() * 300,
    angle: Math.random() * Math.PI * 2,
    speed: 0.2 + Math.random() * 0.4,
    color: Math.random() > 0.5 ? 'rgba(58,141,255,0.35)' : 'rgba(255,58,94,0.25)',
    width: 2 + Math.random() * 3
  };
}

const lines = Array.from({length: 12}, randomLine);

function animate() {
  ctx.clearRect(0, 0, w, h);
  for (let line of lines) {
    ctx.save();
    ctx.translate(line.x, line.y);
    ctx.rotate(line.angle);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(line.length, 0);
    ctx.strokeStyle = line.color;
    ctx.lineWidth = line.width;
    ctx.shadowColor = line.color;
    ctx.shadowBlur = 16;
    ctx.stroke();
    ctx.restore();
    line.x += Math.cos(line.angle) * line.speed;
    line.y += Math.sin(line.angle) * line.speed;
    if (line.x < -400 || line.x > w + 400 || line.y < -400 || line.y > h + 400) {
      Object.assign(line, randomLine());
    }
  }
  requestAnimationFrame(animate);
}
animate();

// Анимация появления блоков при скролле
function animateOnScroll() {
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-in, .fade-in-up').forEach(el => {
    observer.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const hero = document.querySelector('.hero');
  if (hero) hero.classList.remove('visible');
  animateOnScroll();
}); 