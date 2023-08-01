const mongoose = require('mongoose');
const logger = require('../../../../logger');

/**
 * Creates a user schema.
 * @param {String} username - The username of the user.
 * @param {String} password - The password of the user.
 */
logger.info("User schema loaded")
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

/**
 * Creates a User model using the user schema.
 * @param {String} modelName - The name for the model.
 * @param {Object} schema - The user schema object.
 * @returns {Object} - The User model.
 */
const User = mongoose.model('User', userSchema);

module.exports = User;