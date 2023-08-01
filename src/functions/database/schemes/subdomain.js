const mongoose = require('mongoose');
const logger = require('../../../../logger');

logger.info('Subdomain schema loaded');

/**
 * Subdomain Schema
 *
 * @param {Number} id - ID of the subdomain
 * @param {String} username - Username associated with the subdomain
 * @param {String} name - Name of the subdomain
 * @param {String} subdomain - Subdomain string
 * @param {String} created_at - Date and time of creation
 * @param {String} updated_at - Date and time of last update
 */
const subdomainSchema = new mongoose.Schema({
    id: Number,
    username: String,
    name: String,
    subdomain: String,
    created_at: String,
    updated_at: String
});

/**
 * Subdomain Model
 *
 * @param {String} name - Name of the model
 * @param {Object} subdomainSchema - Schema definition for the subdomain model
 * @returns {Object} - Mongoose model for the subdomain
 */
const Subdomain = mongoose.model('Subdomain', subdomainSchema);

module.exports = Subdomain;