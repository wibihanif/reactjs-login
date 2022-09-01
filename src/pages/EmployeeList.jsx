import { Container, Table, Td, Thead, Tr, Tbody } from "@chakra-ui/react"
import { useSelector } from "react-redux"

const EmployeeList = () => {
  const employeeSelector = useSelector((state) => state.employee)

  const renderEmployees = () => {
    return employeeSelector.data.map((val) => {
      return (
        <Tr>
          <Td>{val.name}</Td>
          <Td>{val.email}</Td>
          <Td>{val.password}</Td>
        </Tr>
      )
    })
  }

  return (
    <Container maxW="container.lg" py="16">
      <Table>
        <Thead>
          <Tr>
            <Td>Name</Td>
            <Td>Email</Td>
            <Td>Password</Td>
          </Tr>
        </Thead>
        <Tbody>{renderEmployees()}</Tbody>
      </Table>
    </Container>
  )
}

export default EmployeeList

