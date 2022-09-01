import Profile from "./components/Profile/"
import { Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Counter from "./pages/Counter"
import TextPage from "./pages/Text"
import List from "./pages/List"
import Filter from "./pages/Filter"
import { Text, UnorderedList, ListItem, Box, HStack } from "@chakra-ui/react"
import Register from "./pages/Register"
import ReduxCounter from "./pages/ReduxCounter"
import { useDispatch, useSelector } from "react-redux"
import Student from "./pages/Student"
import UserList from "./pages/UserList"
import ProductList from "./pages/ProductList"
import ProductEdit from "./pages/ProductEdit"
import EmployeeRegister from "./pages/EmployeeRegister"
import EmployeeList from "./pages/EmployeeList"
import { jsonServerApi } from "./api"
import { fillEmployeeList } from "./features/employee/employeeSlice"
import { useEffect } from "react"

function App() {
  const employeeSelector = useSelector((state) => state.employee)

  const dispatch = useDispatch()

  const fetchEmployees = async () => {
    try {
      const response = await jsonServerApi.get("/employees")

      dispatch(fillEmployeeList(response.data))
    } catch (err) {
      console.log(err)
      alert("Server error")
    }
  }

  useEffect(() => {
    fetchEmployees()
  }, [])

  return (
    <Box>
      <Box minHeight="56px" backgroundColor="teal" padding="4">
        <HStack color="white">
          <Link to="/employees/register">Register</Link>
          <Link to="/employees/list">List</Link>
        </HStack>
        <Text fontSize="5xl" fontWeight="bold" color="white">
          Total Employee: {employeeSelector.data.length}
        </Text>
      </Box>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/text" element={<TextPage />} />
        <Route path="/list" element={<List />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/register" element={<Register />} />
        <Route path="/redux/counter" element={<ReduxCounter />} />
        <Route path="/redux/student" element={<Student />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/products" element={<ProductList />} />

        {/* Route params */}
        <Route path="/products/:id" element={<ProductEdit />} />

        <Route path="/employees/register" element={<EmployeeRegister />} />
        <Route path="/employees/list" element={<EmployeeList />} />
      </Routes>
    </Box>
  )
}

export default App

