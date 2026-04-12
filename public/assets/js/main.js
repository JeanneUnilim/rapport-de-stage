// Choix du thème
function updateLogo(isDark) {
  const logo = document.getElementById('logo-agglo')
  if (!logo) return
  logo.src = isDark
    ? '/assets/images/logo_lavalagglo_white.png'
    : '/assets/images/logo_lavalagglo.png'
}

function toggleTheme() {
  const isDark = document.documentElement.dataset.theme === 'dark'
  const newDark = !isDark
  document.documentElement.dataset.theme = newDark ? 'dark' : ''
  const btn = document.getElementById('theme-btn')
  btn.textContent = newDark ? '☀ Mode clair' : '☽ Mode sombre'
  btn.setAttribute('aria-label', newDark ? 'Activer le mode clair' : 'Activer le mode sombre')
  localStorage.setItem('theme', newDark ? 'dark' : 'light')
  updateLogo(newDark)
}

;(function () {
  const saved = localStorage.getItem('theme')
  const isDark = saved === 'dark'
  if (isDark) {
    document.documentElement.dataset.theme = 'dark'
    document.addEventListener('DOMContentLoaded', () => {
      const btn = document.getElementById('theme-btn')
      if (btn) {
        btn.textContent = '☀ Mode clair'
        btn.setAttribute('aria-label', 'Activer le mode clair')
      }
      updateLogo(true)
    })
  } else {
    document.addEventListener('DOMContentLoaded', () => updateLogo(false))
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