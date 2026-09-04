/* Tiny static file server for local preview only. Node stdlib, no deps. */
const http = require('http'), fs = require('fs'), path = require('path');
const root = __dirname, port = process.env.PORT || 4600;
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png',
  '.json':'application/json', '.ico':'image/x-icon', '.webp':'image/webp',
  '.jpg':'image/jpeg', '.jpeg':'image/jpeg' };
http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/' || p.endsWith('/')) p += 'index.html';
  const file = path.join(root, path.normalize(p));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('no'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, {'Content-Type':'text/plain'}); return res.end('404'); }
    res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache'});
    res.end(data);
  });
}).listen(port, () => console.log('website-deploy on http://localhost:' + port));
