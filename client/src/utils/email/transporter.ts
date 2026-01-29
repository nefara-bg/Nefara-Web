import nodemailer from "nodemailer";

export const createPrivateEmailTransport = async () => {
    if (!process.env.SMTP_HOST || (typeof process.env.SMTP_HOST === 'string' && process.env.SMTP_HOST.trim() === '')) {
        throw new Error("SMTP_HOST environment variable is required");
    }

    if (!process.env.SMTP_PORT || (typeof process.env.SMTP_PORT === 'string' && process.env.SMTP_PORT.trim() === '')) {
        throw new Error("SMTP_PORT environment variable is required");
    }

    if (!process.env.SMTP_USER || (typeof process.env.SMTP_USER === 'string' && process.env.SMTP_USER.trim() === '')) {
        throw new Error("SMTP_USER environment variable is required");
    }

    if (!process.env.SMTP_PASS || (typeof process.env.SMTP_PASS === 'string' && process.env.SMTP_PASS.trim() === '')) {
        throw new Error("SMTP_PASS environment variable is required");
    }

    const port = Number(process.env.SMTP_PORT);

    if (isNaN(port)) {
        throw new Error("SMTP_PORT must be a valid number");
    }

    const secure = port === 465;

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

    return transporter;
};
