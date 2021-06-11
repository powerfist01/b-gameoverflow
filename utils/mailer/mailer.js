const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

class Mailer {
    constructor() {

    }
    async sendTokenVerificationMail(user, token) {
        try {
            // create reusable transporter object using the default SMTP transport
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                port: 587,
                secure: false,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
                },
            });
            
            let payload = { 'name': user.username, 'link': process.env.DEVELOPMENT_URL + '/users/confirmation/?token=' + token.token}
            const source = fs.readFileSync(path.join(__dirname, 'email_templates/verifyEmail.ejs'), "utf8");
            const compiledTemplate = ejs.compile(source);
            const mailOptions = () => {
                let temp = {
                    from: process.env.FROM_EMAIL,
                    to: user.email,
                    subject: 'GameOverflow - Verify your Email ID',
                    html: compiledTemplate(payload),
                };
                return temp;
            };
            // Send email
            let info = await transporter.sendMail(mailOptions());
            console.log(info);
        } catch (err) {
            console.log("Error occured here");
        }
    };
}

module.exports = Mailer;