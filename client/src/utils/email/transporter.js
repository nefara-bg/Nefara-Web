import nodemailer from "nodemailer";

export const createPrivateEmailTransport = async () => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        // secure: process.env.SMTP_SECURE === "true", // true = 465
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    });

    return transporter
}