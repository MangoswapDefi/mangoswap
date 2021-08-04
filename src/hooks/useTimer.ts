import { useInterval } from 'hooks'
import { useState, useEffect } from 'react'

const DELAY = 3000
export const useCurrentTime = () => {
  const [currentMillis, setCurrentMillis] = useState(new Date().getTime())

  useEffect(() => {
    const tick = () => {
      setCurrentMillis((prevMillis) => prevMillis + 1000)
    }

    const timerID = setInterval(() => tick(), DELAY)

    return () => clearInterval(timerID)
  }, [])

  return currentMillis
}

export const useTimer = (delay = DELAY) => {
  const [count, setCount] = useState(0)
  useInterval(() => {
    setCount((currentCount) => currentCount + 1)
  }, delay)
  return count
}

export default useCurrentTime
