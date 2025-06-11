# Portfolio Website Backend

This is the backend server for Fauwaz Alhassan's portfolio website. It handles contact form submissions and sends emails.

## Features

- Contact form submission handling
- Email sending using Nodemailer
- CORS support for cross-origin requests
- Environment variable configuration

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Create a `.env` file based on the `.env.example` file:
   \`\`\`
   cp .env.example .env
   \`\`\`
4. Edit the `.env` file with your email configuration

### Email Configuration

For Gmail:
1. Use your Gmail address as `EMAIL_USER`
2. For `EMAIL_PASS`, you need to create an "App Password":
   - Go to your Google Account > Security
   - Enable 2-Step Verification if not already enabled
   - Go to App passwords
   - Select "Mail" and "Other (Custom name)"
   - Generate and use the 16-character password

### Running the Server

Development mode:
\`\`\`
npm run dev
\`\`\`

Production mode:
\`\`\`
npm start
\`\`\`

## Deployment

This server can be deployed to various platforms:

### Heroku

1. Create a Heroku account and install the Heroku CLI
2. Login to Heroku CLI:
   \`\`\`
   heroku login
   \`\`\`
3. Create a new Heroku app:
   \`\`\`
   heroku create your-app-name
   \`\`\`
4. Set environment variables:
   \`\`\`
   heroku config:set EMAIL_SERVICE=gmail
   heroku config:set EMAIL_USER=your-email@gmail.com
   heroku config:set EMAIL_PASS=your-app-password
   heroku config:set RECIPIENT_EMAIL=your-email@gmail.com
   \`\`\`
5. Deploy:
   \`\`\`
   git push heroku main
   \`\`\`

### Vercel

1. Install Vercel CLI:
   \`\`\`
   npm i -g vercel
   \`\`\`
2. Login to Vercel:
   \`\`\`
   vercel login
   \`\`\`
3. Deploy:
   \`\`\`
   vercel
   \`\`\`
4. Set environment variables in the Vercel dashboard

## Integration with Frontend

1. Include the `contact.js` file in your HTML:
   ```html
   <script src="js/contact.js"></script>
   \`\`\`

2. Make sure your contact form has the ID `contact-form` and includes fields with names `name`, `email`, and `message`.

3. Update the fetch URL in `contact.js` if your backend is hosted on a different domain:
   \`\`\`javascript
   const response = await fetch('https://your-backend-url.com/api/contact', {
     // ...
   });
   \`\`\`

## License

MIT
