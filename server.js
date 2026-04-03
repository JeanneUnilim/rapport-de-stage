// Imports et constantes : URLs propres (/rapport-de-lancement 
// au lieu de /rapport-de-lancement/index.html)
const http = require('http')
const fs   = require('fs')
const path = require('path')
// "process.env.PORT" est important : sur Render, le port est imposé par la plateforme
// via une variable d'environnement. En local il sera undefined donc on tombe sur 3000.
const PORT   = process.env.PORT || 3000
const PUBLIC = path.join(__dirname, 'public')

// Le navigateur a besoin d'un dictionnaire des types MIME pour interpréter les fichiers
// qu'il reçoit (sinon il affiche le texte brut)
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css' : 'text/css',
  '.js'  : 'text/javascript',
  '.png' : 'image/png',
  '.jpg' : 'image/jpeg',
  '.svg' : 'image/svg+xml',
  '.webp': 'image/webp',
}

// Routes
const ROUTES = {
  '/'          : '/index.html',
  '/rapport-de-lancement' : '/templates/rapport-de-lancement/index.html',
  '/rapport-final'     : '/templates/rapport-final/index.html',
}

// Fonction qui lit et envoie un fichier
function serve(res, filePath, status = 200) {
  const ext  = path.extname(filePath)
  const type = MIME[ext] || 'application/octet-stream'
  try {
    const data = fs.readFileSync(filePath)
    res.writeHead(status, { 'Content-Type': type })
    res.end(data)
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end('<h1>404</h1>')
  }
}

// Serveur
const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0] // Ignore les query strings

  if (ROUTES[url]) {
    return serve(res, path.join(PUBLIC, ROUTES[url]))
  }

  const filePath = path.join(PUBLIC, url)
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    return serve(res, filePath)
  }

  serve(res, path.join(PUBLIC, '404.html'), 404)
})

server.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})