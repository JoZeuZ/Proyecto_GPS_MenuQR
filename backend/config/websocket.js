const WebSocket = require('ws');

const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Función para enviar notificaciones de llamada al mesero a todos los clientes conectados
function notifyWaiterCall(call) {
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(call));
        }
    });
}

module.exports = { wss, notifyWaiterCall };


