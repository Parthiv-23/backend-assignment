const express = require('express');
const swaggerUi = require('swagger-ui-express');
const requestRoutes = require('./routes/requestRoutes');
const statsRoutes = require('./routes/statsRoutes');
const swaggerSpecs = require('./config/swagger');
const Response = require('./utils/response');

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use('/request', requestRoutes);
app.use('/stats', statsRoutes);

app.get('/', (req, res) => {
    return Response.success(res, 'Rate-Limited API Service is operational');
});

app.use((req, res) => {
    return Response.error(res, 'Route not found', 404);
});

module.exports = app;
