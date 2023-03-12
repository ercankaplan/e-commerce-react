import React from 'react';
import styles from './styles.module.css'
import { Box, Image, Badge, Button } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useBasket } from '../../contexts/BasketContext';

function Card({item}) {

    const property = {
        imageUrl: item.photos[0],
        imageAlt: 'Rear view of modern electronics',
        title: item.title,
        formattedPrice: `${item.price} TL`,
        reviewCount: 34,
        rating: 4,
        stok: 100,
        Optime: moment(item.createAt).format('DD/MM/YYYY')
    }
     
    const {items, addToBasket,removeFromBasket} = useBasket();

    const itemInTheBasket = items.find((bItem)=> item._id===bItem._id);
    //console.log(property);

    return (
        <div className={styles.card}>
            <Link to={`/product/${item._id}`}>
                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                    <Image src={property.imageUrl} alt={property.imageAlt} loading="lazy"  />

                    <Box p='6'>
                        <Box display='flex' alignItems='baseline'>
                            <Badge borderRadius='full' px='2' colorScheme='teal'>
                                New
                            </Badge>
                            <Box
                                color='gray.500'
                                fontWeight='semibold'
                                letterSpacing='wide'
                                fontSize='xs'
                                textTransform='uppercase'
                                ml='2'
                            >
                                AN515-58-79YK &bull; {property.stok} adet
                            </Box>
                        </Box>

                        <Box
                            mt='1'
                            fontWeight='semibold'
                            as='h4'
                            lineHeight='tight'
                            noOfLines={1}
                        >
                            {property.title}
                        </Box>

                        <Box>

                            <Box as='span' color='gray.600' fontSize='lg' fontWeight='bold'>
                                {property.formattedPrice}
                            </Box>
                            <Box as='span' color='gray.600' fontSize='xs'>
                                {property.Optime}
                            </Box>
                        </Box>

                        <Box display='flex' mt='2' alignItems='center'>
                            {Array(5)
                                .fill('')
                                .map((_, i) => (

                                    <StarIcon
                                        name="star"
                                        key={i}
                                        color={i < property.rating ? "teal.500" : "gray.300"}
                                    />
                                ))}
                            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                {property.reviewCount} reviews
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Link>
            <Button colorScheme={!itemInTheBasket ? "green":"orange"} onClick={()=> !itemInTheBasket ? addToBasket(item) : removeFromBasket(item._id) } >
              {
                    !itemInTheBasket ? "Add to Basket" : "Remove from Basket"
              }  
            </Button>
        </div>
    )
}

export default Card