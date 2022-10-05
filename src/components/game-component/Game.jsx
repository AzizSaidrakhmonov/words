import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useGameContext } from '../../context/GameContext'
import { Rewind, ArrowLeft, ArrowRight } from 'react-feather'
import './Game.css'

const Game = () => {
  const {
    words,
    currentPage,
    setCurrentPage,
    wordsPerPage,
    currentWords,
    countDown,
    setCountDown,
    minutesForRecall,
    setMinutesForRecall,
  } = useGameContext()

  const navigate = useNavigate()

  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      if (countDown < 0) {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1)
        } else if (seconds === 0) {
          if (minutesForRecall === 0) {
            navigate('/answers')
          } else {
            setMinutesForRecall((minutesForRecall) => minutesForRecall - 1)
            setSeconds(59)
          }
        }
      }
    }, 1000)
  }, [
    countDown,
    seconds,
    minutesForRecall,
    setSeconds,
    setMinutesForRecall,
    navigate,
  ])

  useEffect(() => {
    if (countDown >= 0) {
      setTimeout(() => setCountDown(countDown - 1), 1000)
    }
  })

  const nextPage = () => {
    setCurrentPage((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > words?.length / wordsPerPage) {
        nextPage = 1
      }
      return nextPage
    })
  }
  
  const prevPage = () => {
    setCurrentPage((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = words?.length / wordsPerPage
      }
      return prevPage
    })
  }

  const firstPage = () => {
    setCurrentPage(1)
  }

  return (
    <div className="game">
      <div className="container">
        <div
          className="screen-countdown"
          style={{ display: countDown > 0 ? 'block' : 'none' }}
        >
          <h3>Memorization starts in: </h3>
          <span>{countDown} s</span>
        </div>

        <div
          className="game-section"
          style={{ display: countDown > 0 ? 'none' : 'flex' }}
        >
          <div className="game-section__header">
            {minutesForRecall === 0 && seconds === 0 ? null : (
              <h3 className="game-section__header-time">
                {minutesForRecall}m {seconds < 10 ? `0${seconds}` : seconds}s
              </h3>
            )}
            <p className='game-section__header-title'>Recall</p>
            <Link
              to="/answers"
              style={{ textDecoration: 'none' }}
              className="game-section__header-finish"
            >
              Finish
            </Link>
          </div>

          <div className="game-section__items">
            {currentWords?.map((word, index) => {
              return (
                <article key={index + (currentPage - 1) * 10 + 1} className="game-section__item">
                  <div className="number">
                    {index + (currentPage - 1) * 10 + 1}.
                  </div>
                  <div className="word"> {word}</div>
                </article>
              )
            })}
          </div>
          <div className="game-section__indicator">
            <span>{currentPage}</span>/
            <span>{words?.length / wordsPerPage}</span>
          </div>
          <div className="game-section__control-buttons">
            <button onClick={firstPage} className="first-button">
              <Rewind size={32}/>
            </button>
            <button onClick={prevPage} className="prev-button">
              <ArrowLeft size={32}/>
            </button>
            <button onClick={nextPage} className="next-button">
              <ArrowRight size={32} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Game
