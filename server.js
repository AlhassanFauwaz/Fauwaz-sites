// Import required modules
const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer")
require("dotenv").config()

// Initialize express app
const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors()) // Enable CORS for all routes
app.use(express.json()) // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })) // Parse URL-encoded bodies

// Serve static files from the 'public' directory
// This is where your HTML, CSS, and client-side JS files should be
app.use(express.static("public"))

// Contact form endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and message",
      })
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE, // e.g., 'gmail'
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECIPIENT_EMAIL, // Your email where you want to receive messages
      subject: `Portfolio Contact: Message from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Return success response
    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
    })
  } catch (error) {
    console.error("Error sending email:", error)
    res.status(500).json({
      success: false,
      message: "Failed to send message. Please try again later.",
    })
  }
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
