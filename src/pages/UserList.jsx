import {
  Box,
  Button,
  Container,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import axiosInstance from "../api"

// API / SUMBER DATA
// https://jsonplaceholder.typicode.com/users

const UserList = () => {
  // state yang akan menyimpan data user dari API
  const [users, setUsers] = useState([])

  const toast = useToast()

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/users")

      setUsers(response.data)
    } catch (err) {
      toast({
        title: "Network error",
        status: "error",
      })
    }
  }

  const renderUsers = () => {
    return users.map((val) => {
      return (
        <Tr>
          <Td>{val.id}</Td>
          <Td>{val.username}</Td>
          <Td>{val.email}</Td>
        </Tr>
      )
    })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Container maxW="container.lg">
      <Button onClick={fetchUsers}>Fetch Data</Button>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Username</Th>
            <Th>Email</Th>
          </Tr>
        </Thead>
        <Tbody>{renderUsers()}</Tbody>
      </Table>
    </Container>
  )
}

export default UserList

