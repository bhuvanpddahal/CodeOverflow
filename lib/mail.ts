import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email: string, token: string) => {
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        }
    });

    const mailOptions = {
        from: "codeoverflow@gmail.com",
        to: email,
        subject: "Verify your email",
        text: "This token expires in 10 minutes.",
        html: `<p>This is your token: <h1>${token}</h1></p>`
    };

    await transporter.sendMail(mailOptions);
};