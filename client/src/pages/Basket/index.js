import { DeleteIcon } from '@chakra-ui/icons';
import {
    Alert, Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer, Heading, Image, Button, Grid, GridItem, Box, Text, Flex
} from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom';
import { useBasket } from '../../contexts/BasketContext'
import styles from './styles.module.css'
function Basket() {

    const { items, removeFromBasket } = useBasket();

    const totaPrice = items.reduce((acc, obj) => acc + obj.price, 0);


    return (
        <div>
            <Heading>Basket</Heading>
            <hr />
            <Grid
                h='100vh'
                templateRows='repeat(1, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}

            >

                <GridItem colSpan={4}>
                    {
                        items.length === 0 && (< Alert status="warning" >Basket is empty </Alert>)
                    }
                    {
                        items.length > 0 && (
                            <TableContainer>
                                <Table variant='simple'>
                                    <TableCaption>List of basket items</TableCaption>
                                    <Thead>
                                        <Tr>
                                            <Th>Del</Th>
                                            <Th>Img</Th>
                                            <Th>Title</Th>
                                            <Th isNumeric>Price</Th>
                                            <Th></Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {items.map((item, index) => (

                                            <Tr key={item._id}>
                                                <Td><Button onClick={() => removeFromBasket(item._id)} > <DeleteIcon w={4} h={4} color="red.500" /></Button></Td>
                                                <Td> <Image htmlWidth="200" src={item.photos[0]} alt={item._id} loading="lazy" /></Td>
                                                <Td>{item.title.substring(0, 50)}...</Td>
                                                <Td isNumeric>{item.price}</Td>
                                                <Td isNumeric> <Link to={`/product/${item._id}`}><Button>Detail</Button>  </Link></Td>
                                            </Tr>

                                        ))}



                                    </Tbody>

                                </Table>
                            </TableContainer>
                        )
                    }
                </GridItem>
                <GridItem rowSpan={2} colSpan={1} className={styles.basket}>
                    <Flex align="center" justifyContent="center" width="full"  >
                        <Box pt={5} textAlign="center"  >
                            <Box pt={5}>
                                <Text color="tomato" fontSize="16" fontWeight="bold"  >
                                    SELECTED ITEMS ({items.length})
                                </Text>
                            </Box>
                            <Box pt={5}>
                                <Text fontSize="22" fontWeight="bold"  >
                                    {totaPrice}
                                </Text>
                            </Box>
                            <Box pt={5}>
                                <Link to="/Order">
                                    <Button colorScheme='orange' size='sm'>Complete Order</Button>
                                </Link>
                            </Box>
                            <hr style={{ marginTop: 20 }} />
                            <Box pt={5} textAlign="left">
                                <Text fontSize="12" fontWeight="bold" color="gray.400">
                                    Shipping
                                </Text>
                            </Box>
                            <Box pt={5} textAlign="left">
                                <Text fontSize="12" fontWeight="bold" color="gray.400" >
                                    Products
                                </Text>
                            </Box>
                        </Box>
                    </Flex>
                </GridItem>
            </Grid>


        </div >
    )
}

export default Basket