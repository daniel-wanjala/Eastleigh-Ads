Markdown
# Eastleigh E-commerce Ads

A fast, mobile-optimized landing page and Web service for **Eastleigh E-commerce Ads** — a specialized Meta advertising agency helping local retailers, wholesalers, and e-commerce stores scale sales through high-converting Facebook/Instagram ad campaigns and direct-to-WhatsApp funnels.

---

## 🚀 Features

- **Mobile-Centric Architecture:** Tailored for ultra-fast load times on modern smartphones.
- **Express Backend:** Built with Node.js and Express to serve static marketing assets cleanly and support custom routing.
- **Vercel Serverless Ready:** Pre-configured with `@vercel/node` for instant continuous deployment.
- **High-Contrast Design:** Minimalist dark mode theme (`#0A0E0D`) featuring high-visibility lime typography and clean branding elements.

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (v22)
- **Framework:** Express.js
- **Frontend:** Vanilla HTML5, CSS3, JavaScript
- **Hosting & Deployment:** Vercel
- **Version Control:** GitHub

---

## 📁 Project Structure

```text
├── public/              # Static assets (HTML, CSS, JS, Images, Logos)
├── index.html           # Main landing page entry point
├── server.js            # Express server configuration
├── vercel.json          # Vercel deployment & routing configuration
├── package.json         # Project scripts and Express dependency
└── README.md            # Project documentation
💻 Local Development
Prerequisites
Node.js (v18 or higher)

npm

Installation & Run
Clone the repository:

Bash
git clone [https://github.com/daniel-wanjala/Eastleigh-Ads.git](https://github.com/daniel-wanjala/Eastleigh-Ads.git)
cd Eastleigh-Ads
Install dependencies:

Bash
npm install
Start the local server:

Bash
npm start
View in browser:
Open http://localhost:3000 to preview the site locally.

☁️ Deployment
This project is configured for continuous deployment on Vercel.

Every push to the main branch automatically triggers a new deployment build using the serverless configuration specified in vercel.json:

JSON
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
📬 Service Packages
Starter Tier (WhatsApp Direct): 15,000 KES Lifetime Meta Budget | 14-Day Duration

Growth Tier (Landing Page): 50,000 KES Lifetime Meta Budget | 30-Day Duration + Custom Mobile Landing Page

Scale Tier (Commerce Suite): 100,000 KES Lifetime Meta Budget | 30-Day Duration + Full Meta Shop & Strategy Support

👤 Author
Daniel Wanjala Ndubi

Founder & Marketing Strategist — Eastleigh E-commerce Ads

Website: eastleighe-ads.vercel.app