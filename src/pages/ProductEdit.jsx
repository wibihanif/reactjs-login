import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { jsonServerApi } from "../api"

const ProductEdit = () => {
  const [product, setProduct] = useState({})

  const params = useParams()

  const toast = useToast()

  const fetchProduct = async () => {
    try {
      const response = await jsonServerApi.get(`/products/${params.id}`)

      setProduct(response.data)

      formik.setFieldValue("product_name", response.data.product_name)
      formik.setFieldValue("price", response.data.price)
      formik.setFieldValue("stock", response.data.stock)
    } catch (err) {
      console.log(err)
    }
  }

  const formChangeHandler = ({ target }) => {
    const { name, value } = target

    formik.setFieldValue(name, value)
  }

  useEffect(() => {
    fetchProduct()
  }, [])

  const formik = useFormik({
    initialValues: {
      product_name: "",
      price: 0,
      stock: 0,
    },
    onSubmit: async ({ product_name, price, stock }) => {
      try {
        let newProduct = {
          product_name,
          price: Number(price),
          stock: Number(stock),
        }

        await jsonServerApi.patch(`/products/${product.id}`, newProduct)

        fetchProduct()
        toast({ title: "Product Added", status: "success" })
      } catch (err) {
        toast({ title: "Network error", status: "error" })
        console.log(err)
      }
    },
  })

  return (
    <Box>
      <Container maxW="container.lg">
        <FormControl>
          <FormLabel>Product Name</FormLabel>
          <Input
            onChange={formChangeHandler}
            defaultValue={product.product_name}
            name="product_name"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Price</FormLabel>
          <Input
            onChange={formChangeHandler}
            defaultValue={product.price}
            name="price"
            type="number"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Product Stock</FormLabel>
          <Input
            onChange={formChangeHandler}
            defaultValue={product.stock}
            name="stock"
            type="number"
          />
        </FormControl>
        <Button mt="4" onClick={formik.handleSubmit}>
          Edit Data
        </Button>
      </Container>
    </Box>
  )
}

export default ProductEdit

