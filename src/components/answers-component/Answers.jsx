import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useGameContext } from '../../context/GameContext'
import { Rewind, ArrowLeft, ArrowRight } from 'react-feather'
import '../game-component/Game.css'

const Answers = () => {
  const {
    words,
    currentPage2,
    setCurrentPage2,
    wordsPerPage,
    currentAnswers,
    setAnswers,
    answers,
    minutesForAnswer,
    setMinutesForAnswer,
  } = useGameContext()

  const navigate = useNavigate()
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      if (seconds > 0) {
        setSeconds((seconds) => seconds - 1)
      } else if (seconds === 0) {
        if (minutesForAnswer === 0) {
          // navigate('/results')
        } else {
          setMinutesForAnswer((minutesForAnswer) => minutesForAnswer - 1)
          setSeconds(59)
        }
      }
    }, 1000)
  }, [minutesForAnswer, seconds, setMinutesForAnswer, setSeconds, navigate])

  const nextPage = () => {
    setCurrentPage2((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > words?.length / wordsPerPage) {
        nextPage = 1
      }
      return nextPage
    })
  }

  const prevPage = () => {
    setCurrentPage2((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = words?.length / wordsPerPage
      }
      return prevPage
    })
  }

  const firstPage = () => {
    setCurrentPage2(1)
  }

  const handleInputs = (e, index) => {
    setAnswers((answers) =>
      answers.map((oldValue, currentIndex) =>
        currentIndex === index ? e.target.value : oldValue,
      ),
    )
  }

  return (
    <section className="answers">
      <div className="container">
        <div className="answers-section__header">
          {minutesForAnswer === 0 && seconds === 0 ? null : (
            <h3 className="answers-section__header-time">
              {minutesForAnswer}m {seconds < 10 ? `0${seconds}` : seconds}s
            </h3>
          )}
          <p className="answers-section__header-title">Answer</p>
          <Link
            to="/results"
            style={{ textDecoration: 'none' }}
            className="answers-section__header-finish"
          >
            Finish
          </Link>
        </div>
        <div className="answers-section__items">
          {currentAnswers?.map((answer, index) => {
            return (
              <form className="form">
                <input
                  type="text"
                  placeholder={index + (currentPage2 - 1) * 10 + 1}
                  value={answers[index + (currentPage2 - 1) * 10]}
                  onChange={(e) =>
                    handleInputs(e, index + (currentPage2 - 1) * 10)
                  }
                />
              </form>
            )
          })}
        </div>
        <div className="answers-section__indicator">
          <span>{currentPage2}</span>/
          <span>{words?.length / wordsPerPage}</span>
        </div>
        <div className="answers-section__control-buttons">
          <button onClick={firstPage} className="first-button">
            <Rewind size={32}/>
          </button>
          <button size={32} onClick={prevPage} className="prev-button">
            <ArrowLeft />
          </button>
          <button size={32} onClick={nextPage} className="next-button">
            <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Answers
