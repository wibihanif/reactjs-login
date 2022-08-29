import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"
import RegisterModal from "../components/RegisterModal"

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("")

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const registerBtnHandler = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  return (
    <>
      <Box>
        <Text fontSize="3xl" fontWeight="bold">
          Register Page
        </Text>
        <Box
          padding="4"
          border="1px solid black"
          maxWidth="480px"
          borderRadius="8px"
        >
          <Stack spacing={4}>
            <Text fontSize="2xl" fontWeight="black">
              Register
            </Text>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? "text" : "password"}
                  pr="60px"
                />
                <InputRightElement width="56px" mr="4px">
                  <Button onClick={togglePassword} height="28px" size="sm">
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <RadioGroup onChange={(value) => setGender(value)} value={gender}>
              <FormLabel>Gender</FormLabel>
              <HStack>
                <Radio value="Male">Male</Radio>
                <Radio value="Female">Female</Radio>
              </HStack>
            </RadioGroup>
            <Button
              onClick={registerBtnHandler}
              alignSelf="center"
              colorScheme="green"
            >
              Register
            </Button>
          </Stack>
        </Box>
      </Box>
      <RegisterModal
        isOpen={modalIsOpen}
        closeModal={closeModal}
        username={username}
        email={email}
        gender={gender}
        password={password}
      />
    </>
  )
}

export default Register

