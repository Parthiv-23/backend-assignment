const swaggerDocument = require('../swagger/swagger.json');

// Export the pre-defined Swagger JSON document
// This avoids the complexity of swagger-jsdoc and ensures the UI matches the static definition
module.exports = swaggerDocument;
