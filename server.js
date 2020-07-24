const http = require('http');

http
  .createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
        .end('Hello World, welcome to WeJapa Internships');
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
        .end('Page Not Found');
    }
  })
  .listen(8080);