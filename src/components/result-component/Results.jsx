import React, { useState } from 'react'
import { useGameContext } from '../../context/GameContext'
import { Rewind, ArrowLeft, ArrowRight, Eye } from 'react-feather'
import '../game-component/Game.css'

const Results = () => {
  const {
    words,
    currentPage3,
    setCurrentPage3,
    wordsPerPage,
    currentAnswers,
    answers,
  } = useGameContext()

  const [visibleInputs, setVisibleInputs] = useState(
    Array(answers?.length).fill(false),
  )

  const correctAnswers = words?.filter(
    (el, index) => el === answers[index + (currentPage3 - 1) * 10],
  )

  console.log(correctAnswers.length)

  const nextPage = (e) => {
    e.preventDefault()
    setCurrentPage3((oldPage) => {
      let nextPage = oldPage + 1
      if (nextPage > words?.length / wordsPerPage) {
        nextPage = 1
      }
      return nextPage
    })
  }

  const prevPage = () => {
    setCurrentPage3((oldPage) => {
      let prevPage = oldPage - 1
      if (prevPage < 1) {
        prevPage = words?.length / wordsPerPage
      }
      return prevPage
    })
  }

  const firstPage = () => {
    setCurrentPage3(1)
  }

  return (
    <div className="results">
      <div className="container">
        <div className="results-section__correct-answers">
          <p>
            Umumiy: {words.length} ta
            <br />
            To'g'ri topilganlar: {correctAnswers.length}ta <br />
          </p>
        </div>
        <div className="results-section__items">
          {currentAnswers?.map((answer, index) => {
            return (
              <form className="form">
                <div style={{ position: 'relative' }}>
                  <input
                    readOnly
                    type="text"
                    placeholder={index + (currentPage3 - 1) * 10 + 1}
                    style={{
                      backgroundColor:
                        words[index + (currentPage3 - 1) * 10] !==
                        answers[index + (currentPage3 - 1) * 10]
                          ? 'rgb(255, 0, 0, .5)'
                          : 'rgba(26, 161, 19, .5)',
                    }}
                    value={
                      visibleInputs[index + (currentPage3 - 1) * 10]
                        ? words[index + (currentPage3 - 1) * 10]
                        : answers[index + (currentPage3 - 1) * 10]
                    }
                  />
                  <Eye
                    className="form-preview"
                    style={{
                      backgroundColor:
                        visibleInputs[index + (currentPage3 - 1) * 10] &&
                        'black',
                      color:
                        visibleInputs[index + (currentPage3 - 1) * 10] &&
                        'white',
                      padding:
                        visibleInputs[index + (currentPage3 - 1) * 10] &&
                        '.1rem',
                    }}
                    onClick={() => {
                      setVisibleInputs((inputs) =>
                        inputs?.map((input, inputIndex) =>
                          index + (currentPage3 - 1) * 10 === inputIndex
                            ? !visibleInputs[index + (currentPage3 - 1) * 10]
                            : input,
                        ),
                      )
                    }}
                  />
                </div>
              </form>
            )
          })}
        </div>
        <div className="results-section__indicator">
          <span>{currentPage3}</span>/
          <span>{words?.length / wordsPerPage}</span>
        </div>
        <div className="results-section__control-buttons">
          <button onClick={firstPage} className="first-button">
            <Rewind size={32} />
          </button>
          <button onClick={prevPage} className="prev-button">
            <ArrowLeft size={32} />
          </button>
          <button onClick={nextPage} className="next-button">
            <ArrowRight size={32} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Results
