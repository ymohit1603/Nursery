import nodemailer from 'nodemailer';

interface mailTypes{
    email: string,
    message:string
}

export const sendMail = ({email,message }:mailTypes) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        }
    });
    
    const mailOptions = {
        from: 'your_email@gmail.com',
        to: email,
        subject: 'Product Query',
        text: message,
    };
    
    transporter.sendMail(mailOptions, (error: Error | null, info: nodemailer.SentMessageInfo) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
}