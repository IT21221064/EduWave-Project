// Import nodemailer
const nodemailer = require('nodemailer');

// Function to send email
async function sendEnrollmentEmail(studentEmail, courseName) {
    // Create a transporter using Gmail SMTP
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'eduwave11@gmail.com', // Your Gmail email address
            pass: 'bdoe bbks wodr eqou' // Your Gmail password
        }
    });

    // Define email content
    let mailOptions = {
        from: 'eduwave11@gmail.com', // Sender email address
        to: studentEmail, // Recipient email address
        subject: 'Enrollment Confirmation', // Email subject
        text: `Dear Student, \n\nYou have successfully enrolled in the ${courseName} course. \n\nRegards, \nEdu Wave` // Plain text body
        // You can also include HTML content if you prefer
    };

    try {
        // Send the email
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.response);
        return 'Email sent successfully';
    } catch (error) {
        console.error('Error occurred while sending email: ', error);
        throw new Error('Failed to send email');
    }
}

module.exports = { sendEnrollmentEmail };
