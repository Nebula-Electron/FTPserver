const FtpSrv = require('ftp-srv');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const User = require('../database/schemes/user.js');

const argon2 = require('argon2');

/**
 * Load FTP Server
 *
 * @param {Object} client - The client object
 * @returns {Promise} - A promise that resolves once the FTP server is started
 */
module.exports = async (client) => {
    client.logger.info('FTP server loaded');

    /**
     * FTP Server Configuration
     *
     * @param {string} url - The URL of the FTP server
     * @param {boolean} anonymous - Flag indicating whether anonymous login is allowed
     * @param {string} pasv_url - The PASV URL of the FTP server
     * @param {number} pasv_min - The minimum PASV port number
     * @param {number} pasv_max - The maximum PASV port number
     * @param {string} greeting - The greeting message of the FTP server
     */
    const ftpServer = new FtpSrv({
        url: client.config.url + client.config.ftpport,
        anonymous: client.config.anonymous,
        pasv_url: client.config.pasv_url,
        pasv_min: client.config.pasv_min,
        pasv_max: client.config.pasv_max,
	    greeting: client.config.greeting,
    });
    
    /**
     * FTP Server Login Event
     *
     * @param {Object} options - Login options
     * @param {Object} options.connection - FTP connection object
     * @param {string} options.username - Username provided for login
     * @param {string} options.password - Password provided for login
     * @param {Function} options.resolve - Function to resolve login
     * @param {Function} options.reject - Function to reject login
     */
    ftpServer.on('login', async ({ connection, username, password }, resolve, reject) => {
        console.log("Login attempt from " + username + " with password " + password);
        const finduser = await User.findOne({ username: username });
        if (!finduser) {
            return reject({ message: 'Incorrect username or password' });
        } else {
            console.log("User found");
            const startpath = client.startpath;
            // Compare the provided password with the stored hashed password
            const result = await argon2.verify(finduser.password, password);
            if (result) {
                if (fs.existsSync(startpath + '/' + username)) {
                    require('../database/addSub.js')(client, username);
                    return resolve({ root: startpath + '/' + username });
                } else {
                    fs.mkdirSync(startpath + '/' + username);
                    return resolve({ root: startpath + '/' + username });
                }
            } else {
                return reject({ message: 'Incorrect username or password' });
            }
        }
    });

    ftpServer.listen().then(() => { 
        client.logger.info(`FTP server started`);
    });
}