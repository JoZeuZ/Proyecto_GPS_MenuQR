const { notifyWaiterCall } = require('../config/websocket');

// Controlador para manejar la llamada al mesero
exports.callWaiter = (req, res) => {
    const { tableNumber, customerName } = req.body;

    if (!tableNumber || !customerName) {
        return res.status(400).json({ message: 'El número de mesa y el nombre son obligatorios' });
    }

    const call = { tableNumber, customerName, time: new Date() };
    notifyWaiterCall(call);

    return res.status(200).json({ message: 'Waiter called successfully', call });
};

// Controlador para obtener todas las llamadas al mesero (solo para debugging, puedes eliminarlo en producción)
exports.getWaiterCalls = (req, res) => {
    return res.status(200).json({ calls: waiterCalls });
};
