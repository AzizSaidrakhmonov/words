import React from 'react'
import './Start.css'
import { useNavigate } from 'react-router'
import { useGameContext } from '../../context/GameContext'

const Start = () => {
  const {
    setCountDown,
    setMinutesForRecall,
    setMinutesForAnswer,
  } = useGameContext()
  const navigate = useNavigate()

  const handleNavigate = () => {
    navigate('/game')
  }
  return (
    <div className="settings">
      <div className="container">
        <form className="settings-time">
          <label htmlFor="">Boshlang'ich vaqtni kiriting</label>
          <input
            type="number"
            onChange={(e) => setCountDown(e.target.value)}
            placeholder="Standart vaqt 5 soniya"
          />

          <label htmlFor=""> Eslab qolish vaqtini kiriting</label>
          <input
            type="number"
            onChange={(e) => setMinutesForRecall(e.target.value)}
            placeholder="Standart vaqt 5 daqiqa"
          />

          <label htmlFor="">Javob berish vaqtini kiriting</label>
          <input
            type="number"
            onChange={(e) => setMinutesForAnswer(e.target.value)}
            placeholder="Standart vaqt 5 daqiqa "
            s
          />
        </form>
        <div className="settings-start">
          <button onClick={handleNavigate}>Start</button>
        </div>
      </div>
    </div>
  )
}

export default Start
