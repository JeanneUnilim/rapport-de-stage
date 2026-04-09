// Choix du thème
function toggleTheme() {
  const isDark = document.documentElement.dataset.theme === 'dark'
  document.documentElement.dataset.theme = isDark ? '' : 'dark'
  document.getElementById('theme-btn').textContent = isDark ? '☽ Mode sombre' : '☀ Mode clair'
  localStorage.setItem('theme', isDark ? 'light' : 'dark')
}

;(function () {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') {
    document.documentElement.dataset.theme = 'dark'
    document.addEventListener('DOMContentLoaded', () => {
      const btn = document.getElementById('theme-btn')
      if (btn) btn.textContent = '☀ Mode clair'
    })
  }
})()

document.addEventListener('DOMContentLoaded', () => {

  // Lien actif nav
  const path = window.location.pathname
  document.querySelectorAll('.nav-links a').forEach(a => {
    if (a.getAttribute('href') === path) a.classList.add('active')
  })

  // Scroll reveal
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('vis')
    })
  }, { threshold: .1 })
  document.querySelectorAll('.rev, .tl-item').forEach(el => io.observe(el))

  // Tilt 3D stack
  const sc = document.getElementById('stack-scene')
  const s3 = document.getElementById('s3d')
  if (sc && s3) {
    sc.addEventListener('mousemove', e => {
      const r  = sc.getBoundingClientRect()
      const cx = (e.clientX - r.left - r.width  / 2) / r.width
      const cy = (e.clientY - r.top  - r.height / 2) / r.height
      s3.style.transform = `rotateX(${22 - cy * 18}deg) rotateY(${-18 + cx * 22}deg)`
    })
    sc.addEventListener('mouseleave', () => {
      s3.style.transform = 'rotateX(22deg) rotateY(-18deg)'
    })
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === window.location.pathname) {
      link.setAttribute('aria-current', 'page');
    }
  });

  const hero = document.querySelector('.hero');
  const heroBefore = document.querySelector('.hero');

  window.addEventListener('scroll', () => {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        hero.style.setProperty('--parallax', `${scrollY * 0.6}px`);
      }
    });
  });

  // Bouton de scoll vers le haut
  const btnTop = document.getElementById('btn-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.5) {
      btnTop.classList.add('visible');
    } else {
      btnTop.classList.remove('visible');
    }
  });

})