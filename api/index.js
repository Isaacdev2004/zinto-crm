// Vercel serverless function for Zinto API
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mock data for demo
const mockData = {
  user: {
    id: 1,
    name: "Demo User",
    email: "demo@zinto.com",
    profile: "admin"
  },
  company: {
    id: 1,
    name: "Zinto Demo Company",
    plan: {
      id: 1,
      name: "Professional",
      users: 10,
      connections: 5,
      queues: 3,
      useWhatsapp: true,
      useFacebook: true,
      useInstagram: true,
      useCampaigns: true,
      useSchedules: true,
      useInternalChat: true,
      useExternalApi: true,
      useKanban: true,
      useOpenAi: true,
      useIntegrations: true
    }
  },
  settings: {
    appName: "Zinto",
    primaryColor: "#4F46E5",
    darkColor: "#3730A3"
  }
};

// API Routes
app.get('/api/auth/me', (req, res) => {
  res.json(mockData.user);
});

app.get('/api/companies/current/plan', (req, res) => {
  res.json({
    company: mockData.company,
    plan: mockData.company.plan,
    limits: {
      users: mockData.company.plan.users,
      connections: mockData.company.plan.connections,
      queues: mockData.company.plan.queues,
      currentUsers: 3,
      currentConnections: 2,
      features: mockData.company.plan
    }
  });
});

app.get('/api/settings/company', (req, res) => {
  res.json(mockData.settings);
});

app.get('/api/queues', (req, res) => {
  res.json([]);
});

app.get('/api/users', (req, res) => {
  res.json([]);
});

app.get('/api/dashboard', (req, res) => {
  res.json({
    tickets: 0,
    contacts: 0,
    messages: 0,
    connections: 0
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Zinto API is running' });
});

// Handle all other routes
app.get('*', (req, res) => {
  res.json({ message: 'Zinto API endpoint', path: req.path });
});

module.exports = app;
