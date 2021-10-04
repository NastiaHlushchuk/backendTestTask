const http = require('http');

const config = require('./config');

const host = config.system.host;
const port = config.system.port;

const app = require('./server');

const server = http.createServer(app);

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `pipe ${addr.port}`;

  console.log(`the server started listening on port ${bind}`);
}

server.listen(port, host, onListening);

module.exports = server;