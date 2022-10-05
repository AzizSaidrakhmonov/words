import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Game from './components/game-component/Game'
import Answers from './components/answers-component/Answers'
import Results from './components/result-component/Results'
import Home from './pages/home-page/Home'
import Start from './components/start-component/Start'

const App = () => {
  
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="/" element={<Start />} />
            <Route path="/game" element={<Game />} />
            <Route path="/answers" element={<Answers />} />
            <Route path="/results" element={<Results />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
