# 🎌 Rodesani Anime Streaming Site

A clean, fast anime streaming site built with React + Vite.
Anime data from **Jikan API** (MyAnimeList), streaming via **Miruro.tv**.

## Features
- 🔥 Trending & seasonal anime homepage with hero banner
- 🔍 Search anime by title
- 🎭 Browse by genre (Action, Romance, Fantasy, etc.)
- 📺 Watch page with Miruro.tv embedded player (Sub/Dub toggle)
- 📱 Fully responsive

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Build for production
npm run build
```

## Project Structure

```
src/
  components/
    Navbar.jsx       — Top nav with search
    AnimeCard.jsx    — Anime card with hover play button
    AnimeGrid.jsx    — Responsive grid with skeleton loading
    SectionTitle.jsx — Section headers
  pages/
    Home.jsx         — Hero + trending + seasonal
    Browse.jsx       — Genre filtering + pagination
    Watch.jsx        — Miruro player + anime info
    Search.jsx       — Search results
  hooks/
    useJikan.js      — All Jikan API calls
```

## Player
The watch page embeds Miruro.tv using:
```
https://www.miruro.tv/watch?id=<mal_id>&lang=sub
```

Miruro is open source (BY-NC License): https://github.com/Miruro-no-kuon/Miruro

## APIs Used
- **Jikan API** (free, no key needed): https://jikan.moe
- **Miruro.tv** (open source player): https://miruro.tv

## Deploy
Works great on **Vercel** or **Netlify**:
```bash
npm run build
# Deploy the /dist folder
```
