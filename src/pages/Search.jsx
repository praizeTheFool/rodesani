import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAnimeSearch } from '../hooks/useJikan'
import AnimeGrid from '../components/AnimeGrid'
import SectionTitle from '../components/SectionTitle'
import './Search.css'

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [input, setInput] = useState(initialQuery)
  const [query, setQuery] = useState(initialQuery)
  const [page, setPage] = useState(1)
  const { data, pagination, loading } = useAnimeSearch(query, page)

  useEffect(() => {
    const q = searchParams.get('q') || ''
    setInput(q)
    setQuery(q)
    setPage(1)
  }, [searchParams])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim()) {
      setSearchParams({ q: input.trim() })
      setPage(1)
    }
  }

  return (
    <div className="search-page">
      <div className="container">
        <SectionTitle title="Search" accent />

        {/* Search bar */}
        <form className="search-bar-big" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search for any anime..."
            value={input}
            onChange={e => setInput(e.target.value)}
            autoFocus
          />
          <button type="submit">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </form>

        {/* Results */}
        {query ? (
          <>
            <div className="search-results-header">
              {!loading && (
                <span className="results-count">
                  {data.length > 0
                    ? `Results for "${query}" — Page ${page}`
                    : `No results for "${query}"`}
                </span>
              )}
            </div>
            <AnimeGrid anime={data} loading={loading} cols={6} />

            {/* Pagination */}
            {data.length > 0 && (
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
                  disabled={loading || !pagination?.has_next_page}
                  onClick={() => { setPage(p => p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="search-empty">
            <div className="search-empty-icon">🔍</div>
            <h3>Find your next anime</h3>
            <p>Search by title, genre, or studio</p>
          </div>
        )}
      </div>
    </div>
  )
}
