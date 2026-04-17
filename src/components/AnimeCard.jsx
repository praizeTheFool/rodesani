import { Link } from 'react-router-dom'
import './AnimeCard.css'

export default function AnimeCard({ anime, index = 0 }) {
  const id = anime.mal_id
  const title = anime.title_english || anime.title
  const image = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url
  const score = anime.score
  const episodes = anime.episodes
  const status = anime.status
  const genres = anime.genres?.slice(0, 2).map(g => g.name) || []

  return (
    <Link
      to={`/watch/${id}`}
      className="anime-card"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="card-image-wrap">
        <img src={image} alt={title} loading="lazy" />
        <div className="card-overlay">
          <span className="play-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Watch Now
          </span>
        </div>
        {score && <span className="card-score">★ {score}</span>}
        {episodes && <span className="card-eps">{episodes} eps</span>}
      </div>
      <div className="card-info">
        <h3 className="card-title">{title}</h3>
        <div className="card-meta">
          {genres.map(g => (
            <span key={g} className="card-genre">{g}</span>
          ))}
        </div>
      </div>
    </Link>
  )
}
