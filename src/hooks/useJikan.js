import { useState, useEffect } from 'react'

const BASE = 'https://api.jikan.moe/v4'
const cache = {}

async function jikanFetch(url) {
  if (cache[url]) return cache[url]
  // Jikan has rate limiting — small delay helps
  await new Promise(r => setTimeout(r, 400))
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Jikan error: ${res.status}`)
  const data = await res.json()
  cache[url] = data
  return data
}

export function useTopAnime(page = 1) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    jikanFetch(`${BASE}/top/anime?page=${page}&limit=24`)
      .then(d => { setData(d.data || []); setLoading(false) })
      .catch(e => { setError(e.message); setLoading(false) })
  }, [page])

  return { data, loading, error }
}

export function useSeasonalAnime() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    jikanFetch(`${BASE}/seasons/now?limit=18`)
      .then(d => { setData(d.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  return { data, loading }
}

export function useAnimeById(id) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    jikanFetch(`${BASE}/anime/${id}/full`)
      .then(d => { setData(d.data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  return { data, loading }
}

export function useAnimeSearch(query, page = 1) {
  const [data, setData] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!query) return
    setLoading(true)
    jikanFetch(`${BASE}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=24&sfw=true`)
      .then(d => {
        setData(d.data || [])
        setPagination(d.pagination)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [query, page])

  return { data, pagination, loading }
}

export function useAnimeByGenre(genreId, page = 1) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!genreId) return
    setLoading(true)
    jikanFetch(`${BASE}/anime?genres=${genreId}&page=${page}&limit=24&order_by=score&sort=desc`)
      .then(d => { setData(d.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [genreId, page])

  return { data, loading }
}

export function useGenres() {
  const [data, setData] = useState([])

  useEffect(() => {
    jikanFetch(`${BASE}/genres/anime`)
      .then(d => setData(d.data || []))
      .catch(() => {})
  }, [])

  return { data }
}
