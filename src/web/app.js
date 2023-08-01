const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

/**
 * Initialize the Express app and configure middleware
 *
 * @param {Object} client - The client object
 * @returns {Object} - The Express app
 */
module.exports = function(client) {
    client.logger.info('APP loaded');
    const app = express();
    const folder = path.join(__dirname, '../../publicfolder');
    
    // Parse JSON request bodies
    app.use(bodyParser.json());
    
    // Serve static files from the public folder
    app.use(express.static(folder));
    
    return app;
};