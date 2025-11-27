import nodemailer from "nodemailer";

export const createPrivateEmailTransport = async () => {
    const port = Number(process.env.SMTP_PORT);
    const secure = port === 465
    
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: port,
        secure: secure,
        requireTLS: !secure,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        
        connectionTimeout: 5000,
        socketTimeout: 5000,
        greetingTimeout: 5000,
    });

    return transporter
}