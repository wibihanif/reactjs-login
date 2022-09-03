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
  useToast,
} from "@chakra-ui/react";
import { useFormik, Formik, Form, Field } from "formik";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginEmployee } from "../features/employee/employeeSlice";
import { jsonServerApi } from "../api";

const EmployeeList = () => {
  const [showPassword, setShowPassword] = useState(false);
  const employeeSelector = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  const renderEmployees = () => {
    return employeeSelector.data.map((val) => {
      return (
        <Tr>
          <Td>{val.name}</Td>
          <Td>{val.email}</Td>
          <Td>{val.password}</Td>
          <Td>
            <Button
              isDisabled={employeeSelector.currentEmployee.id === val.id}
              onClick={() => dispatch(loginEmployee(val))}
            >
              Login
            </Button>
          </Td>
        </Tr>
      );
    });
  };

  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ email, password }) => {
      try {
        let employee = {
          email,
          password,
        };

        console.log(employee);
        const result = await jsonServerApi.get("/employees", employee);

        console.log(result.data);
        const employeeEmails = result.data.map((value) => {
          return value.email;
        });

        console.log(employeeEmails);
        // kondisi ketika email user tidak ada
        if (employeeEmails.includes(employee.email)) {
          let filteredEmployee = result.data.filter(
            (element) => employee.email === element.email
          );
          console.log(filteredEmployee[0]);
          // element utk ambil value setiap emailnya
          if (filteredEmployee[0].password === employee.password) {
            dispatch(loginEmployee(filteredEmployee[0]));
            toast({ title: "Success", status: "success" });
          } else {
            toast({ title: "Wrong password", status: "error" });
          }
        } else {
          toast({ title: "User with email does not exist", status: "error" });
        }

        // formik.setFieldValue("email", "");
        // formik.setFieldValue("password", "");
      } catch (err) {
        console.log(err);
        alert(err);
      }
    },
  });

  const handleFormChange = ({ target }) => {
    const { name, value } = target;
    console.log(name, value);
    formik.setFieldValue(name, value);
  };

  useEffect(() => {
    console.log(employeeSelector.data);
  }, [employeeSelector]);

  return (
    <Container maxW="container.lg" py="16">
      {/* 
        1. Fitur login. Email dan password harus sesuai. Gunakan global
           state untuk perbandingan data, tanpa network call tambahan.
        2. Kalau login berhasil, tampilkan data di navbar. Tampilkan toast
           (success)
        3. Kalau login gagal, tampilkan message dengan case ini:
          a. email tidak ditemukan, input email menjadi merah dengan message
             "User with email does not exist". Lalu tampilkan toast (error)
          b. password salah, input password menjadi merah dengan message
             "Wrong password". Lalu tampilkan toast (error).
        4. Buat button di navbar untuk LOGOUT
      */}
      <Box p="8" mb="8" borderRadius="6px" border="solid 1px lightgrey">
        <Text fontWeight="bold" fontSize="4xl" mb="8">
          Login Employee
        </Text>
        <Stack>
          {/* <Formik> */}
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
          <Button colorScheme="green" onClick={formik.handleSubmit}>
            Login
          </Button>
          {/* </Formik> */}
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
  );
};

export default EmployeeList;
