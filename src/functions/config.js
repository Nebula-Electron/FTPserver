require("dotenv").config();

module.exports = {
    webport: process.env.webport || "80",
    url: process.env.url,
    ftpport: process.env.ftpport,
    anonymous: process.env.anonymous,
    pasv_url: process.env.pasv_url,
    pasv_min: process.env.pasv_min,
    pasv_max: process.env.pasv_max,
	greeting: process.env.greeting,
    mongodbstring: process.env.mongodbstring,
    nginxpmbaseurl: process.env.nginxpmbaseurl || "not set",


}
