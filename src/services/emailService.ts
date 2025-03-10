import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const confirmationEmail = async (to: string, name: string) => {
    try {
        console.log("Starting email service...");

        const sender = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.SMTP_USER, 
                pass: process.env.SMTP_PASS, 
            },
        });

        console.log("SMTP Connection Established...");

        const mailOptions = {
            from: `"Your Team" <${process.env.SMTP_USER}>`,
            to: to,
            subject: "Registration Successful - Welcome!",
            html: `<h3>Hello ${name},</h3>
                   <p>Thank you for registering. Your account has been successfully created.</p>
                   <p>Best Regards,</p>
                   <p>Your App Team</p>`,
        };

        console.log("Sending email to:", to);

        await sender.sendMail(mailOptions);
        console.log("Confirmation email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error);
    }
};
