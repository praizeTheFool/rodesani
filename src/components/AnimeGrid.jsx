import AnimeCard from './AnimeCard'
import './AnimeGrid.css'

export default function AnimeGrid({ anime, loading, cols = 6 }) {
  if (loading) {
    return (
      <div className="anime-grid" style={{ '--cols': cols }}>
        {Array(cols * 2).fill(0).map((_, i) => (
          <div key={i} className="card-skeleton">
            <div className="skeleton" style={{ aspectRatio: '3/4', width: '100%' }} />
            <div className="skeleton" style={{ height: '14px', marginTop: '10px', width: '80%' }} />
            <div className="skeleton" style={{ height: '12px', marginTop: '6px', width: '50%' }} />
          </div>
        ))}
      </div>
    )
  }

  if (!anime?.length) {
    return <div className="empty-state">No anime found.</div>
  }

  return (
    <div className="anime-grid" style={{ '--cols': cols }}>
      {anime.map((a, i) => (
        <AnimeCard key={a.mal_id} anime={a} index={i} />
      ))}
    </div>
  )
}
