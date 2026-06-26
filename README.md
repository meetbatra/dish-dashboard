# 🍽️ Dish Dashboard

A modern, real-time web application for managing restaurant dishes. Built with **Next.js 16**, **Convex**, and styled with **Tailwind CSS v4** & **shadcn/ui**.

## ✨ Features

- **Real-Time Data Sync**: Powered by Convex, changes to dish statuses are instantly synchronized across all connected clients. No manual refreshing required!
- **Optimistic UI Updates**: Toggle a dish's published status and see the UI update instantly (zero-latency) using Convex's `.withOptimisticUpdate` API.
- **Digital Gallery Aesthetic**: A clean, premium UI design featuring `Playfair Display` for elegant headers and `Inter` for highly readable UI elements.
- **Dynamic Visual Feedback**: Unpublished dishes gracefully transition into an 85% grayscale, slightly faded state to visually indicate their inactive status.
- **Responsive Grid**: Fluidly adapts from mobile to ultra-wide desktop screens.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Database & Realtime Backend**: [Convex](https://convex.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Fonts**: Google Fonts (Playfair Display, Inter) via `next/font`

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun

### 1. Clone the repository
```bash
git clone https://github.com/meetbatra/dish-dashboard.git
cd dish-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup Convex Environment
Convex handles the backend and database. To initialize it for your local environment:
```bash
npx convex dev
```
*This command will prompt you to log in to Convex (if you haven't already) and create a new project. It will automatically configure your `.env.local` file with the necessary `CONVEX_DEPLOYMENT` and `NEXT_PUBLIC_CONVEX_URL` variables. Leave this command running in a separate terminal tab.*

### 4. Seed the Database
To populate the database with the initial sample dishes from the assignment:
```bash
npx convex run dishes:clearAndSeed
```

### 5. Start the Next.js Development Server
In a new terminal window, run:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the dashboard.

## 🌐 Deploying to Production (Vercel)

This project is configured for seamless deployment on Vercel with Convex.

1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. **Critical Step**: Follow the [Convex Vercel Deployment Guide](https://docs.convex.dev/production/hosting/vercel). 
   - Add your `CONVEX_DEPLOY_KEY` to Vercel's Environment Variables (you can generate this via `npx convex deploy`).
   - Override the Vercel Build Command to: `npx convex deploy --cmd 'npm run build'`
4. Deploy!

## 📸 Real-time Demo
Because the app relies on Convex subscriptions (`useQuery`), if you open the deployed application in two separate browser windows (or devices) and toggle a dish in one, you will see it immediately update in the other.
