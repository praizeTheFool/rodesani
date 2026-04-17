import { useState } from 'react'
import { useTopAnime, useAnimeByGenre, useGenres } from '../hooks/useJikan'
import AnimeGrid from '../components/AnimeGrid'
import SectionTitle from '../components/SectionTitle'
import './Browse.css'

const SORT_OPTIONS = [
  { label: 'Top Rated', value: 'top' },
  { label: 'Action', value: '1' },
  { label: 'Adventure', value: '2' },
  { label: 'Comedy', value: '4' },
  { label: 'Drama', value: '8' },
  { label: 'Fantasy', value: '10' },
  { label: 'Horror', value: '14' },
  { label: 'Romance', value: '22' },
  { label: 'Sci-Fi', value: '24' },
  { label: 'Slice of Life', value: '36' },
  { label: 'Sports', value: '30' },
  { label: 'Supernatural', value: '37' },
  { label: 'Thriller', value: '41' },
  { label: 'Mecha', value: '18' },
  { label: 'Mystery', value: '7' },
  { label: 'Psychological', value: '40' },
]

function useAnimeData(activeGenre, page) {
  const topResult = useTopAnime(page)
  const genreResult = useAnimeByGenre(activeGenre !== 'top' ? activeGenre : null, page)
  return activeGenre === 'top' ? topResult : genreResult
}

export default function Browse() {
  const [activeGenre, setActiveGenre] = useState('top')
  const [page, setPage] = useState(1)
  const { data, loading } = useAnimeData(activeGenre, page)

  const activeLabel = SORT_OPTIONS.find(o => o.value === activeGenre)?.label || 'Top Rated'

  const handleGenre = (val) => {
    if (val === activeGenre) return
    setActiveGenre(val)
    setPage(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="browse-page">
      <div className="container">
        <SectionTitle title="Browse Anime" subtitle="Filter by genre or explore top rated" accent />

        {/* Genre Pills */}
        <div className="genre-pills">
          {SORT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`genre-pill ${activeGenre === opt.value ? 'active' : ''}`}
              onClick={() => handleGenre(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Results header */}
        <div className="browse-results-header">
          <span className="results-label">{activeLabel}</span>
          <span className="page-indicator">Page {page}</span>
        </div>

        <AnimeGrid anime={data} loading={loading} cols={6} />

        {/* Pagination */}
        <div className="pagination">
          <button
            className="page-btn"
            disabled={page === 1}
            onClick={() => { setPage(p => p - 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          >
            ← Previous
          </button>
          <span className="page-num">{page}</span>
          <button
            className="page-btn"
            disabled={loading || data.length < 24}
            onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  )
}
