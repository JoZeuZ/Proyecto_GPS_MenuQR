const express = require('express');

require('dotenv').config();
require('./config/db');

const app = express();

//Config express
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', require('./routes/platos.routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
} )