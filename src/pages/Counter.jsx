import { useEffect, useState } from "react"

// const arr = [1, 2, 3, 4, 5]
// const [a, b, c] = arr

const Counter = () => {
  const [counter, setCounter] = useState(0)
  const [showCounter, setShowCounter] = useState(true)

  const incrementCounter = () => {
    setCounter(counter + 1)
  }

  const decrementCounter = () => {
    if (counter <= 0) {
      return
    }

    setCounter(counter - 1)
  }

  const resetCounter = () => {
    setCounter(0)
  }

  const toggleCounter = () => {
    setShowCounter(!showCounter)
  }

  // Bikin useEffect
  // Kalau counter masih 0, ga ada alert
  // Kalau counter kelipatan 3, alert "Fizz"
  // Kalau counter kelipatan 5, alert "Buzz"
  // Kalau counter bukan kelipatan 3 ataupun 5, alert counter
  useEffect(() => {
    if (!counter) {
      return
    }

    if (counter % 3 === 0) {
      alert("Fizz")
    } else if (counter % 5 === 0) {
      alert("Buzz")
    } else {
      alert(counter)
    }
  }, [counter])

  return (
    <div>
      <h1>Counter Page</h1>

      {showCounter ? <h2>{counter}</h2> : null}

      <button onClick={toggleCounter}>Toggle Counter Visibility</button>

      <button onClick={decrementCounter}>Kurang</button>
      <button onClick={resetCounter}>Reset</button>
      <button onClick={incrementCounter}>Tambah</button>
    </div>
  )
}

export default Counter

