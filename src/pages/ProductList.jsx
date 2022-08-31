import {
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { jsonServerApi } from "../api"
import { useFormik } from "formik"

const ProductList = () => {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const response = await jsonServerApi.get("/products")

      setProducts(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const renderProducts = () => {
    return products.map((val) => {
      return (
        <Tr>
          <Td>{val.product_name}</Td>
          <Td>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(val.price)}
          </Td>
          <Td>{val.stock}</Td>
        </Tr>
      )
    })
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const formik = useFormik({
    initialValues: {
      product_name: "",
      price: 0,
      stock: 0,
    },
  })

  const formChangeHandler = ({ target }) => {
    const { name, value } = target

    formik.setFieldValue(name, value)
  }

  return (
    <Container maxW="container.lg">
      <Text fontWeight="bold" fontSize="4xl" mb="16">
        Product List
      </Text>

      <Grid templateColumns="repeat(3, 1fr)" columnGap="4">
        <GridItem>
          <FormControl>
            <FormLabel>Product Name</FormLabel>
            <Input name="product_name" onChange={formChangeHandler} />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Product Price</FormLabel>
            <Input name="price" onChange={formChangeHandler} type="number" />
          </FormControl>
        </GridItem>
        <GridItem>
          <FormControl>
            <FormLabel>Product Stock</FormLabel>
            <Input name="stock" onChange={formChangeHandler} type="number" />
          </FormControl>
        </GridItem>
      </Grid>

      <Table>
        <Thead>
          <Tr>
            <Th>Product Name</Th>
            <Th>Price</Th>
            <Th>Stock</Th>
          </Tr>
        </Thead>
        <Tbody>{renderProducts()}</Tbody>
      </Table>
    </Container>
  )
}

export default ProductList

