import Profile from "./components/Profile/"
import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Counter from "./pages/Counter"
import Text from "./pages/Text"
import List from "./pages/List"
import Filter from "./pages/Filter"

const data = [
  {
    fullName: "Naruto",
    position: "Hokage",
    age: 17,
  },
  {
    fullName: "Doraemon",
    position: "Kucing",
    age: 100,
  },
  {
    fullName: "Bill",
    position: "CEO",
    age: 40,
  },
]

function App() {
  const renderProfiles = () => {
    let result = data.map((val) => {
      return (
        <Profile
          fullName={val.fullName}
          position={val.position}
          age={val.age}
        />
      )
    })

    return result
  }

  return (
    <div>
      <h1>Hello World!</h1>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/counter">Counter</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/text" element={<Text />} />
        <Route path="/list" element={<List />} />
        <Route path="/filter" element={<Filter />} />
      </Routes>
    </div>
  )
}

export default App

