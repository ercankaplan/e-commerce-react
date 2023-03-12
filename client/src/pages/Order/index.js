import { Alert, Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Heading, Input, Link, Text, Textarea,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, 
    useDisclosure} from '@chakra-ui/react'
import { Formik, useFormik } from 'formik';
import validationSchema from './validations';
import React from 'react';
import { fetchOrder } from '../../api';
import styles from './styles.module.css'
import { useBasket } from '../../contexts/BasketContext';
import { useNavigate } from 'react-router-dom';



function Order() {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { items, emptyBasket } = useBasket();

    const navigate = useNavigate();

    const totaPrice = items.reduce((acc, obj) => acc + obj.price, 0);

    const formik = useFormik({
        initialValues: {
            creditCardNumber: "",
            address: "",
            itemIds: JSON.stringify(items.map((item) => item._id)),
        },
        validationSchema,
        onSubmit: async (values, bag) => {
            //console.log(values);
            try {

                //console.log(values);

                const orderResponse = await fetchOrder({ /* creditCardNumber: values.creditCardNumber, */ address: values.address, items: values.itemIds });

                emptyBasket();

                navigate('/myOrders');

                console.log(orderResponse);


            } catch (e) {

                bag.setErrors({ general: e.response.data.message });
            }
        }

    });

    return (
        <div>
            <Heading>Confirm Order</Heading>
            <hr />
            <Grid
                h='100vh'
                templateRows='repeat(1, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}

            >

                <GridItem colSpan={4}>
                    <Flex align="left" padding="10" justifyContent="left" width="full">
                        <Box >

                            <Box my={5} textAlign="left" >
                                {
                                    formik.errors.general && (<Alert status='error'>
                                        {formik.errors.general}
                                    </Alert>)

                                }
                            </Box>
                            <Box my={5} textAlign="left" >
                                <Formik>
                                    <form onSubmit={formik.handleSubmit}>
                                        <FormControl>
                                            <FormLabel>Credit card:5122492796134667</FormLabel>
                                            <Input
                                                name='creditCardNumber'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.creditCardNumber}
                                                isInvalid={formik.touched.creditCardNumber && formik.errors.creditCardNumber}
                                            />
                                            {formik.errors.creditCardNumber && formik.touched.creditCardNumber && <div className='error'><span>{formik.errors.creditCardNumber}</span></div>}
                                            {/*   <ErrorMessage/> */}
                                        </FormControl>
                                        <FormControl mt="4">
                                            <FormLabel>Address: Karapınar mah. 1150 cad. Ankara</FormLabel>
                                            <Textarea
                                                name='address'
                                                type="text"
                                                placeholder='Address'
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.address}
                                                isInvalid={formik.touched.address && formik.errors.address}
                                            />
                                            {formik.errors.address && formik.touched.address && <div className='error'><span>{formik.errors.address}</span></div>}
                                        </FormControl>
                                        <Box pt={5}>
                                            <Button colorScheme='orange' type="submit" size='sm'>Confirm Order</Button>
                                        </Box>
                                        <hr style={{ marginTop: 20 }} />

                                    </form>
                                </Formik>
                            </Box>
                        </Box>
                    </Flex>
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
                            <Box pt={5} textAlign="left" pl="5">
                                <Link onClick={onOpen} >
                                    <Text fontSize="10" color="tomato" >
                                        Pre-information form and
                                        distance sales contract
                                        I approve.
                                    </Text>
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
            <>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Pre-information form</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                Packaging, shipping and delivery costs are covered by the BUYER. The shipping fee is 23.99 TL and the shipping price is added to the total amount of the order. It is not included in the product price. The delivery will be hand-delivered at the BUYER's address specified above, via the contracted cargo company. Even if the BUYER is not present at the time of delivery, our company will be deemed to have fulfilled its obligation fully and completely. Therefore, the SELLER is not responsible for the damages and expenses caused by the BUYER's late delivery and/or non-delivery of the product. The SELLER shall ensure that the product subject to the contract is sound, complete,
                </ModalBody>
      
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button variant='ghost' onClick={onClose} >I aggree</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        </div>
    )
}


export default Order