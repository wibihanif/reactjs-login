import { useState } from "react"

const Filter = () => {
  const [fruits, setFruits] = useState([
    "Jeruk",
    "Leci",
    "Apel",
    "Mangga",
    "Salak",
    "Pisang",
    "Buah Naga",
  ])

  return (
    <div>
      <h1>Filter Page</h1>
      <input type="text" />
      <button>Filter</button>
      <ul>
        <li>Jeruk</li>
        <li>Leci</li>
        <li>Apel</li>
      </ul>
    </div>
  )
}

export default Filter

