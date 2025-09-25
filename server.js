// Node HTTP server to serve Reentry Portal files

import { createServer } from 'node:http';       // HTTP server module
import { readFile } from 'node:fs/promises';    // async file reading
import { exec } from 'node:child_process';      // to open browser automatically
import path from 'path';                         // handle file paths
import url from 'url';                           // parse request URLs

// Create server
const server = createServer(async (req, res) => {
  try {
    // Parse request URL
    const parsedUrl = url.parse(req.url);                 // get pathname and query
    let pathname = parsedUrl.pathname === '/' ? '/index.html' : parsedUrl.pathname; // default to home

    // Resolve file path
    const filePath = `.${pathname}`;
    const ext = path.extname(filePath).toLowerCase();    // get file extension

    // Read file contents
    const file = await readFile(filePath);

    // Set content type based on extension
    let contentType = 'application/octet-stream';       // default
    if (ext === '.css') contentType = 'text/css';
    else if (ext === '.js') contentType = 'text/javascript';
    else if (ext === '.html') contentType = 'text/html';
    else if (ext === '.png') contentType = 'image/png';
    else if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';

    // Set headers
    const headers = { 'Content-Type': contentType };
    if (ext === '.html') headers['X-Frame-Options'] = 'ALLOWALL'; // allow iframes

    // Send file
    res.writeHead(200, headers);
    res.end(file);

  } catch (err) {
    // File not found
    res.writeHead(404);
    res.end('Not Found');
  }
});

// Listen on port 8080
server.listen(8080, '127.0.0.1', () => {
  const url = 'http://127.0.0.1:8080';
  console.log(`Listening on ${url}`);

  // Auto open browser based on OS
  switch (process.platform) {
    case 'win32': exec(`start ${url}`); break;
    case 'darwin': exec(`open ${url}`); break;
    case 'linux': exec(`xdg-open ${url}`); break;
    default: console.log('Auto open not supported on this platform');
  }
});
