<div align="center">
  <h1>⚡ CampusBet</h1>
  <p><b>The Skill-Based Campus Gaming & Esports Economy</b></p>

  [![Live Demo](https://img.shields.io/badge/Live_on-Vercel-black?style=for-the-badge&logo=vercel)](https://campusbet.vercel.app)
  [![Stack](https://img.shields.io/badge/Stack-React_|_Supabase-blue?style=for-the-badge&logo=react)](https://campusbet.vercel.app)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

  <h3><a href="https://campusbet.vercel.app">🎮 campusbet.vercel.app</a></h3>
</div>

---

## ⚡ What is CampusBet?

College campuses are full of informal gaming competitions — Smash Bros in the dorms, FIFA in the lounge, Valorant online. But there are no stakes. Tournaments fizzle out, bragging rights mean nothing, and there's no central place to prove you're the best on campus.

**CampusBet changes that.**

A college-exclusive, skill-based competitive platform where students challenge peers, put **Campus Credits** on the line, and climb the leaderboard. Zero real money — pure skill.

---

## 🚀 Key Features

| Feature | Description |
|---|---|
| 🏫 **College-Gated** | Sign up with your college email. Only your campus peers can join your ecosystem. |
| 💰 **Campus Credit Economy** | Win matches to earn credits. Lose and forfeit your bid. |
| 🎮 **1v1 Lobbies** | Create lobbies for Valorant, FIFA, Chess, BGMI, Smash Bros & more. Set any buy-in. |
| 🏆 **Tournaments** | Bracket-style tournaments with large prize pools of virtual credits. |
| 📊 **Live Leaderboard** | Real-time rankings showing wins, matches played, and earnings. |
| 👛 **Wallet & History** | Full transaction history powered by live Supabase data. |

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, Framer Motion
- **State Management:** Zustand
- **Backend & Database:** Supabase (PostgreSQL + Row Level Security)
- **Authentication:** Supabase Auth (Email/Password, college-gated)
- **Deployment:** Vercel

---

## 💻 Local Development

### 1. Clone & Install
```bash
git clone https://github.com/sps-exe/CampusBet.git
cd CampusBet/client
npm install
```

### 2. Configure Environment
Create a `.env.local` file inside `client/` — copy from the example:
```bash
cp .env.example .env.local
```
Then fill in your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run
```bash
npm run dev
```

---

## 🗺️ Roadmap

- [ ] **Real-time Lobby Chat** — Supabase Realtime WebSockets
- [ ] **Spectator Betting** — Let bystanders back their favourite player
- [ ] **Score Verification API** — Auto-fetch results from Riot Games / Chess.com

---

<div align="center">
  <i>Built for the hackathon. Put your credits where your controller is. ⚡</i>
</div>
