import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage  from './components/LandingPage'
import PuzzleSelect from './components/PuzzleSelect'
import GameBoard    from './components/GameBoard'
import HowToPlay    from './components/HowToPlay'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"               element={<LandingPage />} />
        <Route path="/select"         element={<PuzzleSelect />} />
        <Route path="/game/:puzzleId" element={<GameBoard />} />
        <Route path="/how-to-play"    element={<HowToPlay />} />
      </Routes>
    </BrowserRouter>
  )
}
