import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAnimeById, useTopAnime } from '../hooks/useJikan'
import AnimeCard from '../components/AnimeCard'
import './Watch.css'

export default function Watch() {
  const { id } = useParams()
  const { data: anime, loading } = useAnimeById(id)
  const { data: related } = useTopAnime(1)
  const [subDub, setSubDub] = useState('sub')
  const [playerReady, setPlayerReady] = useState(false)

  // Miruro embed URL format: https://www.miruro.tv/watch?id=<mal_id>
  const miruroUrl = `https://www.miruro.tv/watch?id=${id}&lang=${subDub}`

  if (loading) {
    return (
      <div className="watch-loading">
        <div className="spinner" />
      </div>
    )
  }

  if (!anime) {
    return (
      <div className="watch-error">
        <h2>Anime not found</h2>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    )
  }

  const title = anime.title_english || anime.title
  const genres = anime.genres || []
  const studios = anime.studios || []
  const recommendations = related.filter(a => a.mal_id !== anime.mal_id).slice(0, 12)

  return (
    <div className="watch-page">
      <div className="watch-container">

        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/browse">Browse</Link>
          <span>/</span>
          <span>{title}</span>
        </div>

        {/* Player */}
        <div className="player-section">
          <div className="player-header">
            <h1 className="watch-title">{title}</h1>
            <div className="sub-dub-toggle">
              <button
                className={subDub === 'sub' ? 'active' : ''}
                onClick={() => { setSubDub('sub'); setPlayerReady(false) }}
              >SUB</button>
              <button
                className={subDub === 'dub' ? 'active' : ''}
                onClick={() => { setSubDub('dub'); setPlayerReady(false) }}
              >DUB</button>
            </div>
          </div>

          <div className="player-wrap">
            {!playerReady && (
              <div className="player-poster" onClick={() => setPlayerReady(true)}>
                <img
                  src={anime.images?.jpg?.large_image_url}
                  alt={title}
                />
                <div className="player-poster-overlay">
                  <div className="big-play-btn">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="48" height="48">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p>Click to load player</p>
                </div>
              </div>
            )}
            {playerReady && (
              <iframe
                src={miruroUrl}
                className="miruro-player"
                allowFullScreen
                allow="autoplay; fullscreen; picture-in-picture"
                title={title}
                referrerPolicy="origin"
              />
            )}
          </div>

          <div className="player-source-note">
            Streaming via <a href="https://miruro.tv" target="_blank" rel="noreferrer">Miruro.tv</a> · Open Source
          </div>
        </div>

        {/* Info + Sidebar */}
        <div className="watch-body">
          <div className="watch-info">
            {/* Meta */}
            <div className="info-meta-row">
              {anime.score && (
                <div className="meta-chip gold">★ {anime.score} <span>/ 10</span></div>
              )}
              {anime.episodes && (
                <div className="meta-chip">{anime.episodes} Episodes</div>
              )}
              {anime.year && (
                <div className="meta-chip">{anime.year}</div>
              )}
              {anime.status && (
                <div className={`meta-chip status ${anime.status === 'Currently Airing' ? 'airing' : ''}`}>
                  {anime.status}
                </div>
              )}
            </div>

            {/* Genres */}
            <div className="info-genres">
              {genres.map(g => (
                <span key={g.mal_id} className="info-genre">{g.name}</span>
              ))}
            </div>

            {/* Synopsis */}
            <div className="info-block">
              <h3>Synopsis</h3>
              <p>{anime.synopsis || 'No synopsis available.'}</p>
            </div>

            {/* Details grid */}
            <div className="info-details">
              {studios.length > 0 && (
                <div className="detail-item">
                  <span className="detail-label">Studio</span>
                  <span>{studios.map(s => s.name).join(', ')}</span>
                </div>
              )}
              {anime.type && (
                <div className="detail-item">
                  <span className="detail-label">Type</span>
                  <span>{anime.type}</span>
                </div>
              )}
              {anime.rating && (
                <div className="detail-item">
                  <span className="detail-label">Rating</span>
                  <span>{anime.rating}</span>
                </div>
              )}
              {anime.season && anime.year && (
                <div className="detail-item">
                  <span className="detail-label">Season</span>
                  <span>{anime.season.charAt(0).toUpperCase() + anime.season.slice(1)} {anime.year}</span>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar poster */}
          <div className="watch-sidebar">
            <img
              src={anime.images?.jpg?.large_image_url}
              alt={title}
              className="sidebar-poster"
            />
            {anime.trailer?.url && (
              <a href={anime.trailer.url} target="_blank" rel="noreferrer" className="trailer-btn">
                ▶ Watch Trailer
              </a>
            )}
          </div>
        </div>

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="recommendations">
            <h2 className="rec-title">
              <span className="accent-bar-sm" />
              You Might Also Like
            </h2>
            <div className="rec-grid">
              {recommendations.map((a, i) => (
                <AnimeCard key={a.mal_id} anime={a} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
