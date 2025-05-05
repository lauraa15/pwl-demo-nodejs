const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    const pathname = q.pathname;
    const menu = q.query.menu;

    if (pathname === '/data') {
        fs.readFile('./data/data.json', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Gagal membaca data' }));
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }
        });
        return;
    }

    if (pathname.startsWith('/public/')) {
        const cssPath = path.join(__dirname, pathname);
        fs.readFile(cssPath, (err, data) => {
            if (err) {
                res.writeHead(404);
                res.end("File not found");
            } else {
                res.writeHead(200, { 'Content-Type': 'text/css' });
                res.end(data);
            }
        });
        return;
    }

    let fileLocation = '';
    switch (menu) {
        case 'mahasiswa':
            fileLocation = 'pages/mahasiswa.html';
            break;
        case 'dosen':
            fileLocation = 'pages/dosen.html';
            break;
        default:
            fileLocation = 'pages/index.html';
            break;
    }

    fs.readFile(fileLocation, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end("404 Not Found");
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        }
    });
});
//
//

server.listen(8000);
