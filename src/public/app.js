
const ws = new WebSocket('ws://localhost:3000');
console.log(ws);
ws.onerror= console.error;

ws.onopen = function open() {
  console.log('connected');
  ws.send('something');
};

var term = new Terminal({
  rendererType: 'canvas',
  convertEol: true,
  cursorBlink: true,
  cursorStyle: 'block'
})
term.onKey(({ key, domEvent }) => {
  console.log(key, domEvent);
  term.write(key)

  if (domEvent.keyCode === 13) {
    term.write('\r\n >')
  }
})

//   term.textarea.onkeypress = function (e) {
//     console.log(e)
//     term.write(String.fromCharCode(e.keyCode))
//   }
term.open(document.getElementById('terminal'))
term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')

