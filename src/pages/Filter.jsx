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
  const [inputFilter, setInputFilter] = useState("") // untuk yang kita ketik
  const [currentFilter, setCurrentFilter] = useState("") // untuk simpen filter

  const renderFruits = () => {
    return fruits.map((val) => {
      if (val.includes(currentFilter)) {
        return <li>{val}</li>
      }
    })
  }

  const filterBtnHandler = () => {
    setCurrentFilter(inputFilter)
  }

  return (
    <div>
      <h1>Filter Page</h1>
      <input
        type="text"
        onChange={(event) => setInputFilter(event.target.value)}
      />
      <button onClick={filterBtnHandler}>Filter</button>
      <ul>{renderFruits()}</ul>
    </div>
  )
}

export default Filter

