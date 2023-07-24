
import { WebSocketServer } from 'ws';
import express from 'express';

function heartbeat() {
  this.isAlive = true;
}

const app = express()
app.use('/',express.static('src/public'))

const port = 3000


const srv = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

const wss = new WebSocketServer({ server: srv });

wss.on('connection', function connection(ws) {
  console.log('new connection');
  ws.isAlive = true;
  ws.on('error', console.error);
  ws.on('pong', heartbeat);
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

wss.on('close', function close() {
  clearInterval(interval);
});