/* Tiny static file server for local preview only. Node stdlib, no deps.
   Serves the pre-rendered site the way Hostinger (Apache) does: a folder URL
   gets its index.html, a folder without the trailing slash is redirected to
   it, and anything missing gets 404.html with a 404 status. */
const http = require('http'), fs = require('fs'), path = require('path');
const root = __dirname, port = process.env.PORT || 4600;
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8',
  '.js':'text/javascript; charset=utf-8', '.svg':'image/svg+xml', '.png':'image/png',
  '.json':'application/json', '.ico':'image/x-icon', '.webp':'image/webp',
  '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.txt':'text/plain; charset=utf-8', '.xml':'application/xml' };
function send(res, status, file) {
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, {'Content-Type':'text/plain'}); return res.end('404'); }
    res.writeHead(status, {'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-cache'});
    res.end(data);
  });
}
http.createServer((req, res) => {
  const [urlPath, query] = req.url.split('?');
  const p = decodeURIComponent(urlPath);
  let file = path.join(root, path.normalize(p));
  if (!file.startsWith(root)) { res.writeHead(403); return res.end('no'); }
  fs.stat(file, (err, st) => {
    if (!err && st.isDirectory()) {
      if (!p.endsWith('/')) { res.writeHead(301, { Location: p + '/' + (query ? '?' + query : '') }); return res.end(); }
      file = path.join(file, 'index.html');
    }
    fs.access(file, (missing) => missing ? send(res, 404, path.join(root, '404.html')) : send(res, 200, file));
  });
}).listen(port, () => console.log('website-deploy on http://localhost:' + port));
