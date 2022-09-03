import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { jsonServerApi } from "../api";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { fillEmployeeList } from "../features/employee/employeeSlice";

const EmployeeRegister = () => {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const fetchEmployees = async () => {
    try {
      const response = await jsonServerApi.get("/employees");

      dispatch(fillEmployeeList(response.data));
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ name, email, password }) => {
      try {
        let newEmployee = {
          name,
          email,
          password,
        };

        await jsonServerApi.post("/employees", newEmployee);

        fetchEmployees();
        formik.setFieldValue("name", "");
        formik.setFieldValue("email", "");
        formik.setFieldValue("password", "");
      } catch (err) {
        console.log(err);
        alert(err);
      }
    },
    validationSchema: Yup.object({
      name: Yup.string().required().min(6),
      email: Yup.string().required().email(),
      password: Yup.string()
        .required()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
    }),
    validateOnChange: false,
  });

  const handleFormChange = ({ target }) => {
    const { name, value } = target;

    formik.setFieldValue(name, value);
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxW="container.md" py="16">
      <Box p="8" borderRadius="6px" border="solid 1px lightgrey">
        <Text fontWeight="bold" fontSize="4xl" mb="8">
          Register Employee
        </Text>
        <Stack>
          <FormControl isInvalid={formik.errors.name}>
            <FormLabel>Name</FormLabel>
            <Input
              value={formik.values.name}
              onChange={handleFormChange}
              name="name"
            />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formik.errors.email}>
            <FormLabel>Email</FormLabel>
            <Input
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
                <Button h="1.75rem" size="sm" onClick={togglePassword}>
                  {showPassword ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          <Button onClick={formik.handleSubmit} colorScheme="green">
            Register Employee
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default EmployeeRegister;
