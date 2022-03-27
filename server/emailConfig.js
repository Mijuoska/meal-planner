const nodemailer = require('nodemailer')
const config = require('./utils/config')


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
       user: config.EMAIL_USERNAME,
       pass: config.EMAIL_PASSWORD
    },
    secure: true
})


module.exports = transporter