import React, { useState, useEffect, useContext } from 'react'
import data from '../data/Data'

const GameContext = React.createContext(false)

export const GameContextProvider = ({ children }) => {
  const [words, setWords] = useState(data)
  const [answers, setAnswers] = useState(() => Array(200).fill(''))
  const [currentPage, setCurrentPage] = useState(1)
  const [currentPage2, setCurrentPage2] = useState(1)
  const [currentPage3, setCurrentPage3] = useState(1)
  const [wordsPerPage] = useState(10)

  const [countDown, setCountDown] = useState(5)
  const [minutesForRecall, setMinutesForRecall] = useState(5)
  const [minutesForAnswer, setMinutesForAnswer] = useState(5)

  const indexOfLastWord = currentPage * wordsPerPage
  const indexOfFirstWord = indexOfLastWord - wordsPerPage
  const currentWords = words.slice(indexOfFirstWord, indexOfLastWord)

  const currentAnswers = answers?.slice(indexOfFirstWord, indexOfLastWord)

  const shuffledWords = words
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)
    .slice(0, 200)

  useEffect(() => {
    setWords(shuffledWords)
  }, [])

  const value = {
    words,
    setWords,

    currentPage,
    setCurrentPage,
    currentPage2,
    setCurrentPage2,
    currentPage3,
    setCurrentPage3,

    wordsPerPage,
    currentWords,
    indexOfFirstWord,
    indexOfLastWord,

    answers,
    setAnswers,
    currentAnswers,
    
    countDown,
    setCountDown,
    minutesForRecall,
    setMinutesForRecall,
    minutesForAnswer,
    setMinutesForAnswer,
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>
}

export const useGameContext = () => useContext(GameContext)
