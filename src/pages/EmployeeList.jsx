import {
  Container,
  Table,
  Td,
  Thead,
  Tr,
  Tbody,
  Th,
  Button,
  Box,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useState } from "react"
import { useSelector } from "react-redux"

const EmployeeList = () => {
  const [showPassword, setShowPassword] = useState(false)
  const employeeSelector = useSelector((state) => state.employee)

  const renderEmployees = () => {
    return employeeSelector.data.map((val) => {
      return (
        <Tr>
          <Td>{val.name}</Td>
          <Td>{val.email}</Td>
          <Td>{val.password}</Td>
          <Td>
            <Button>Login</Button>
          </Td>
        </Tr>
      )
    })
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
  })

  const handleFormChange = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <Container maxW="container.lg" py="16">
      <Box p="8" mb="8" borderRadius="6px" border="solid 1px lightgrey">
        <Text fontWeight="bold" fontSize="4xl" mb="8">
          Login Employee
        </Text>
        <Stack>
          <FormControl isInvalid={formik.errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
              autoComplete="off"
              value={formik.values.email}
              onChange={handleFormChange}
              name="email"
              type="email"
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formik.errors.password}>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                value={formik.values.password}
                onChange={handleFormChange}
                name="password"
                type={showPassword ? "text" : "password"}
              />
              <InputRightElement width="4.5rem">
                <Button
                  h="1.75rem"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          <Button colorScheme="green">Login</Button>
        </Stack>
      </Box>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Password</Th>
          </Tr>
        </Thead>
        <Tbody>{renderEmployees()}</Tbody>
      </Table>
    </Container>
  )
}

export default EmployeeList

