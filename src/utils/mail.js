import nodemailer from 'nodemailer'
import mailgen from 'mailgen'

const sendMail = async (options) => {
    const mailGenerator = new mailgen({
    theme: 'default',
    product: {
        name: 'Task Manager',
        link: 'https://localhots:3000'
    }
    });

    const emailText = mailGenerator.generatePlaintext(options.mailGenContent);
    const emailHtml = mailGenerator.generate(options.mailGenerator);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS,
        },
    });
    const mail = {
        from: process.env.MAIL_SENDER,
        to: options.mail,
        subject: options.subject,
        text: emailText, 
        html: emailHtml, 
    }

    try{
        await transporter.sendMail(mail);
    }catch(error) {
        console.error("Email failed ",error)
    }

}   
const welcomeRegisterMessage = (username) => {
    return {
        name: username,
        intro: "Hey, Welcome to Task Manager",
        action: {
            instructions: 'Hey, Welcome to Task Manager',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Welcome to Task Manager',
            }
        }
    }
}
const emailVarificationMailGenContent = (username , varificationURL) => {
    return {
        name: username,
        intro: "varify email",
        action: {
            instructions: 'To get started with out app, please click here:',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Varify your email',
                link: varificationURL
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
}


const forgotPasswordMailGenContent = (username , passwordResetURL) => {
    return {
        name: username,
        intro: "reset your password",
        action: {
            instructions: 'To change the password click button',
            button: {
                color: '#22BC66', // Optional action button color
                text: 'Reset password email',
                link: passwordResetURL
            }
        },
        outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'
    }
}
