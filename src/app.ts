import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import nodemailer from "nodemailer";
dotenv.config();
const PORT = process.env.PORT || 8000;
const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});
app.get("/", (req, res) => {
  res.send("<h1>backend succesfully runing</h1>");
});
app.post("/form", async (req, res) => {
  const { crime, criminalname, age, identification } = req.body;
  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: "frost.ankur019@gmail.com",
    subject: "Galti ki Saza Mout",
    html: `<h2>Galti ki saza mout</h2>
    <p>Crime: ${crime}</p>
    <p>Criminal Name: ${criminalname}</p>
    <p>Age: ${age}</p>
    <p>Identification: ${identification}</p>
    <p> Aparichit Aa Raha hai Teri Gand Phaad ne. Tu to Gaya ${criminalname}</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});
app.listen(PORT, () => {
  console.log(`successfully runing the port`);
});
