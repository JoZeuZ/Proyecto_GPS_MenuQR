const waiterCalls = []; // Lista en memoria para almacenar las llamadas

// Controlador para manejar la llamada al mesero
exports.callWaiter = (req, res) => {
    const { tableNumber, customerName } = req.body;

    if (!tableNumber || !customerName) {
        return res.status(400).json({ message: 'El numero de mesa y el nombre son obligatorios' });
    }

    const call = { tableNumber, customerName, time: new Date() };
    waiterCalls.push(call);

    // Aquí podrías agregar lógica adicional para notificar al mesero, por ejemplo enviando un email, una notificación push, etc.

    return res.status(200).json({ message: 'Waiter called successfully', call });
};

// Controlador para obtener todas las llamadas al mesero (solo para debugging, puedes eliminarlo en producción)
exports.getWaiterCalls = (req, res) => {
    return res.status(200).json({ calls: waiterCalls });
};
