require('dotenv').config();
const app = require('./src/app');
const connectDatabase = require('./src/config/database');
const { SERVER } = require('./src/config/constants');

const startServer = async () => {
    try {
        await connectDatabase();

        app.listen(SERVER.PORT, () => {
            console.log(`Server running at http://localhost:${SERVER.PORT}`);
            console.log(`Swagger docs available at http://localhost:${SERVER.PORT}/api-docs`);
        });
    } catch (error) {
        console.error('Initialization Error:', error.message);
        process.exit(1);
    }
};

startServer();
