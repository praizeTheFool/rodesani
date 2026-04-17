import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTopAnime, useSeasonalAnime } from '../hooks/useJikan'
import AnimeGrid from '../components/AnimeGrid'
import SectionTitle from '../components/SectionTitle'
import './Home.css'

export default function Home() {
  const { data: trending, loading: tLoading } = useTopAnime(1)
  const { data: seasonal, loading: sLoading } = useSeasonalAnime()
  const [heroIndex] = useState(Math.floor(Math.random() * 5))

  const hero = trending[heroIndex]

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        {hero && (
          <>
            <div className="hero-bg">
              <img src={hero.images?.jpg?.large_image_url} alt="" />
              <div className="hero-gradient" />
            </div>
            <div className="hero-content">
              <div className="hero-badges">
                <span className="hero-badge rank">🔥 Trending</span>
                {hero.score && <span className="hero-badge score">★ {hero.score}</span>}
                {hero.year && <span className="hero-badge year">{hero.year}</span>}
              </div>
              <h1 className="hero-title">
                {hero.title_english || hero.title}
              </h1>
              <p className="hero-synopsis">
                {hero.synopsis?.slice(0, 180)}{hero.synopsis?.length > 180 ? '...' : ''}
              </p>
              <div className="hero-genres">
                {hero.genres?.slice(0, 3).map(g => (
                  <span key={g.mal_id} className="hero-genre">{g.name}</span>
                ))}
              </div>
              <div className="hero-actions">
                <Link to={`/watch/${hero.mal_id}`} className="btn-primary">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Watch Now
                </Link>
                <Link to="/browse" className="btn-secondary">Browse All</Link>
              </div>
            </div>
          </>
        )}
        {!hero && tLoading && (
          <div className="hero-skeleton">
            <div className="skeleton" style={{width:'100%', height:'100%'}} />
          </div>
        )}
      </section>

      {/* Seasonal */}
      <section className="home-section">
        <div className="container">
          <SectionTitle title="This Season" subtitle="Currently airing anime" accent />
          <AnimeGrid anime={seasonal} loading={sLoading} cols={6} />
        </div>
      </section>

      {/* Top Anime */}
      <section className="home-section">
        <div className="container">
          <div className="section-header-row">
            <SectionTitle title="Top Rated" subtitle="All-time highest rated" accent />
            <Link to="/browse" className="see-all">See all →</Link>
          </div>
          <AnimeGrid anime={trending.slice(0, 12)} loading={tLoading} cols={6} />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <span className="footer-logo"><span style={{color:'var(--accent)'}}>R</span>odesani</span>
            <p>Streaming powered by <a href="https://miruro.tv" target="_blank" rel="noreferrer">Miruro</a> · Anime data by <a href="https://jikan.moe" target="_blank" rel="noreferrer">Jikan</a></p>
            <p className="footer-note">For entertainment purposes only.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
