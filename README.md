# Zinto - Multi-Agent WhatsApp CRM Platform

A comprehensive SaaS platform for managing WhatsApp, Facebook, and Instagram communications with AI-powered automation.

## 🚀 Features

- **Multi-Channel Support**: WhatsApp, Facebook, Instagram
- **AI Integration**: OpenAI and Google AI support
- **Real-time Chat**: Live messaging with customers
- **Campaign Management**: Automated marketing campaigns
- **Analytics Dashboard**: Comprehensive reporting
- **User Management**: Role-based access control
- **Stripe Integration**: Subscription management

## 🛠️ Tech Stack

- **Frontend**: React, Material-UI, i18n
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL, Redis
- **Queue**: Bull Queue
- **Real-time**: Socket.IO
- **Payments**: Stripe, Mercado Pago

## 📦 Deployment

### Vercel Deployment (Recommended)

1. **Fork this repository** to your GitHub account
2. **Go to [Vercel.com](https://vercel.com)** and sign in with GitHub
3. **Click "New Project"** and import your forked repository
4. **Configure the project**:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `frontend/build`
   - Install Command: `npm install`
5. **Deploy** and get your live URL!

### Environment Variables

Set these in your Vercel dashboard:

```
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

## 🎯 Quick Start

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Start development**: `npm run dev`
4. **Access the app**: http://localhost:3000

## 📱 Demo

Visit the deployed version to see Zinto in action with:
- Modern UI with Zinto branding
- Multi-language support (EN/ES)
- Pricing page with Stripe integration
- Error handling and loading states
- Responsive design

## 🔧 Configuration

The app is pre-configured with:
- **Branding**: Zinto colors (#4F46E5, #3730A3)
- **Languages**: English and Spanish
- **API**: Mock endpoints for demo
- **Styling**: Material-UI theme

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Support

For support and questions, please contact the development team.
