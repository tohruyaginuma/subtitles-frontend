# 🎤 Subtitles - Live Transcription App — Frontend

This is the **frontend** of the Live Transcription Application called **Subtitles**.  
It captures audio (English only) directly from the browser, streams it to the backend via **WebSockets**, and displays **live transcriptions** in real time.

## 🔗 Links

- **App:** [https://subtitles-frontend-production.up.railway.app/](https://subtitles-frontend-production.up.railway.app/)
- **Frontend Code:** This repository
- **Backend Code:** [https://github.com/tohruyaginuma/subtitles-backend](https://github.com/tohruyaginuma/subtitles-backend)

## 💡 Motivation

The Subtitles app was created to help English learners, especially those learning it as a second language, check and understand spoken English quickly and easily.  
It’s designed for use in conferences, classrooms, and other real-time situations.

While there are many great transcription apps with advanced AI features, I wanted something much simpler — just live transcription and a history of past transcriptions, without unnecessary complexity.

## 🚀 Features

- Real-time transcription updates via WebSockets
- Integration with backend authentication (JWT or session-based)
- Authentication tokens managed in the BFF (Route Handler) for improved security
- Ability to save and view transcription history
- Responsive UI built with shadcn and Tailwind CSS

## 🛠 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **State Management:** Zustand
- **Styling:** Shadcn, Tailwind CSS
- **API Integration:** Fetch API with route handlers

## 📦 Installation

```bash
git clone <frontend-repo-url>
cd frontend
npm install
```

## ▶️ Running Locally

```bash
npm run dev
```

By default, it runs on `http://localhost:3000`.

## ⚙️ Environment Variables

Create a `.env` file with:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_WS_URL=ws://localhost:8000/ws/transcribe/
```

## 📄 API Contract

All API requests and responses follow this structure:

```json
{
  "data": { ... },
  "error": null
}
```

Errors will have the form:

```json
{
  "data": null,
  "error": {
    "code": "",
    "message": "",
    "details":  { ... },
  }
}
```
