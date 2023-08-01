const logger = require('./logger')
const fs = require('fs');
const path = require('path');

class Manager {
    constructor() {
    this.logger = logger
    this.config = require("./src/functions/config.js");
    this.User = require("./src/functions/database/schemes/user.js");
    //path is publicfolder in start of this project
    this.startpath = __dirname + '/publicfolder';


    process.on('unhandledRejection', error => this.logger.log({ level: 'error', message: error }));
    process.on('uncaughtException', error => this.logger.log({ level: 'error', message: error }));

	};
};

module.exports = Manager;