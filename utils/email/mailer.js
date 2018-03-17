/**
 * Created by zhangwei on 5/5/17.
 */
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // use SSL
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
    }
});

module.exports = transporter;
