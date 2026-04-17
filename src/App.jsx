import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Watch from './pages/Watch'
import Search from './pages/Search'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/browse" element={<Browse />} />
          <Route path="/watch/:id" element={<Watch />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
