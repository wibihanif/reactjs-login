import {
  Box,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { jsonServerApi } from "../api"

const ProductEdit = () => {
  const [product, setProduct] = useState({})

  const params = useParams()

  const fetchProduct = async () => {
    try {
      const response = await jsonServerApi.get(`/products/${params.id}`)

      setProduct(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  return (
    <Box>
      <Container maxW="container.lg">
        <FormControl>
          <FormLabel>Product Name</FormLabel>
          <Input defaultValue={product.product_name} name="product_name" />
        </FormControl>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input defaultValue={product.price} name="price" type="number" />
        </FormControl>
        <FormControl>
          <FormLabel>Product Name</FormLabel>
          <Input defaultValue={product.stock} name="stock" type="number" />
        </FormControl>
      </Container>
    </Box>
  )
}

export default ProductEdit

