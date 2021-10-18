const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const emailConfig = require('../../config/email_config')

const emailAttachments = [
    {
        filename: 'image-1.png',
        path: './public/images/email/image-1.png',
        cid: 'image-1'
    },
    {
        filename: 'image-2.png',
        path: './public/images/email/image-2.png',
        cid: 'image-2'
    },
    {
        filename: 'image-3.png',
        path: './public/images/email/image-3.png',
        cid: 'image-3'
    },
    {
        filename: 'image-4.png',
        path: './public/images/email/image-4.png',
        cid: 'image-4'
    },
    {
        filename: 'image-5.png',
        path: './public/images/email/image-5.png',
        cid: 'image-5'
    },
    {
        filename: 'image-6.png',
        path: './public/images/email/image-6.png',
        cid: 'image-6'
    },
    {
        filename: 'image-7.png',
        path: './public/images/email/image-7.png',
        cid: 'image-7'
    },
]


const emailService = {

    sendConfirmationEmail: async (name, emailReceiver, tokenValue) => {
        const transporter = nodemailer.createTransport(emailConfig)
        transporter.use('compile', hbs({
            viewEngine: {
                extname: '.handlebars',
                layoutsDir: './views/',
                defaultLayout: 'confirmation_email',
            },
            viewPath: './views'
        }))
        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: emailReceiver,
            subject: `Confirm your e-mail ✔`,
            template: 'confirmation_email',
            attachments: emailAttachments,
            context: {
                name: name,
                url: `${process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : process.env.CLIENT_URL}/confirm/${tokenValue}`
            }
        });
    },
    sendEmailModificationEmail: async (name, emailReceiver, tokenValue) => {
        const transporter = nodemailer.createTransport(emailConfig)
        transporter.use('compile', hbs({
            viewEngine: {
                extname: '.handlebars',
                layoutsDir: './views/',
                defaultLayout: 'email_modification',
            },
            viewPath: './views'
        }))
        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: emailReceiver,
            subject: `Confirm your e-mail modification ✔`,
            template: 'email_modification',
            attachments: emailAttachments,
            context: {
                name: name,
                url: `${process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : process.env.CLIENT_URL}/${emailReceiver}/confirm/${tokenValue}`
            }
        });

    }
}

module.exports = emailService