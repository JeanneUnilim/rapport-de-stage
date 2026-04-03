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

// Nébuleuse canvas
;(function () {
  const canvas = document.getElementById('c')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  let W, H, t = 0

  const blobs = [
    { x: .22, y: .28, r: .38, c: '#a855f7', ph: 0 },
    { x: .78, y: .62, r: .30, c: '#ec4899', ph: 1.8 },
    { x: .50, y: .85, r: .24, c: '#818cf8', ph: 3.5 },
    { x: .12, y: .72, r: .20, c: '#7c3aed', ph: 5 },
    { x: .88, y: .18, r: .22, c: '#f472b6', ph: 2.2 },
  ]

  const stars = Array.from({ length: 220 }, () => ({
    x:  Math.random(),
    y:  Math.random(),
    r:  Math.random() * 1.1 + .2,
    o:  Math.random() * .7 + .25,
    ph: Math.random() * Math.PI * 2,
    sp: Math.random() * .6 + .3,
  }))

  function resize() {
    W = canvas.width  = innerWidth
    H = canvas.height = innerHeight
  }
  resize()
  addEventListener('resize', resize)

  ;(function draw() {
    ctx.clearRect(0, 0, W, H)
    t += .0025

    blobs.forEach(b => {
      const bx = (b.x + Math.sin(t * .35 + b.ph) * .05) * W
      const by = (b.y + Math.cos(t * .28 + b.ph) * .05) * H
      const br = b.r * Math.min(W, H)
      const g  = ctx.createRadialGradient(bx, by, 0, bx, by, br)
      g.addColorStop(0,  b.c + '28')
      g.addColorStop(.5, b.c + '12')
      g.addColorStop(1,  'transparent')
      ctx.beginPath()
      ctx.arc(bx, by, br, 0, Math.PI * 2)
      ctx.fillStyle = g
      ctx.fill()
    })

    stars.forEach(s => {
      const tw = Math.sin(t * s.sp + s.ph) * .3 + .7
      ctx.beginPath()
      ctx.arc(s.x * W, s.y * H, s.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(237,232,248,${s.o * tw})`
      ctx.fill()
    })

    requestAnimationFrame(draw)
  })()

  document.addEventListener('mousemove', e => {
    const nx = (e.clientX / W - .5) * .025
    const ny = (e.clientY / H - .5) * .025
    blobs.forEach((b, i) => {
      b.x += (nx * (i % 2 ? -.6 : 1)  - (b.x - .5)) * .008
      b.y += (ny * (i % 2 ?  1 : -.7) - (b.y - .4)) * .008
    })
  })
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

})