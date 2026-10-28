# GAON SAATHI - An Advanced AI-Powered Smart Village Platform

**Tagline:** *Apne Gaon Ki Apni Digital Pehchaan.*

GAON SAATHI is a complete, production-oriented web application designed specifically for rural communities in Uttar Pradesh, India. It connects villagers, farmers, students, local shopkeepers, workers, and community service providers with digital services in Hindi-first, accessible interface.

## Features

- **Kisan Saathi** - Crop guidance, weather, mandi prices, government schemes
- **Gaon Bazaar** - Local marketplace for products and services
- **Gaon Help Desk** - Community complaint management system
- **Shiksha Saathi** - Educational resources, quizzes, tutor directory
- **Gaon Connect** - Job listings, announcements, service provider directory
- **AI Voice Assistant** - Hindi voice interaction for all services
- **Admin Dashboard** - Comprehensive platform management

## Tech Stack

**Frontend:** React.js + TypeScript + Vite, Tailwind CSS, Framer Motion, Lucide React, TanStack React Query, React Hook Form + Zod  
**Backend:** Node.js + Express.js + TypeScript, MongoDB + Mongoose  
**Authentication:** JWT with role-based authorization  
**Storage:** Cloudinary for images  
**Maps:** Leaflet + OpenStreetMap  
**Voice:** Web Speech API

## Local Development

### Prerequisites
- Node.js 18+ 
- MongoDB Atlas account or local MongoDB
- Cloudinary account

### Setup

1. Clone the repository
`ash
git clone <repository-url>
cd gaon-saathi
`

2. Setup Backend
`ash
cd server
cp .env.example .env
# Fill in your environment variables
npm install
npm run dev
`

3. Setup Frontend
`ash
cd client
npm install
npm run dev
`

4. Seed Database (optional)
`ash
cd server
npm run seed
`

## Deployment

### Backend (Render)
1. Create a new Web Service
2. Connect repository, set root directory to server
3. Build Command: 
pm install && npm run build
4. Start Command: 
pm start
5. Add environment variables from .env.example

### Frontend (Render/Netlify/Vercel)
1. Create a new Static Site
2. Set root directory to client
3. Build Command: 
pm run build
4. Publish Directory: dist
5. Add environment variable: VITE_API_URL=<your-backend-url>

## License
MIT
