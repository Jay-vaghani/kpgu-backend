const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const crypto = require("crypto");

module.exports.sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.MY_EMAIL,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: "admission@kpgu.ac.in",
    subject: `Admission Enquiry`,
    html: `
    <div>
        <h1>Google Sheet Link</h1>
        <a href="https://docs.google.com/spreadsheets/d/1Me2ChOCTi8C_f40WGIi6OHzQj4WxeAu8mD-oepbrNco/edit#gid=1225443675">Open</a>
    </div>
    `,
  });
};
