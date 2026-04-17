import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="logo">
          <span className="logo-r">R</span>odesani
        </Link>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/browse" className={location.pathname === '/browse' ? 'active' : ''}>Browse</Link>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search anime..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </button>
        </form>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span/><span/><span/>
        </button>
      </div>
    </nav>
  )
}
