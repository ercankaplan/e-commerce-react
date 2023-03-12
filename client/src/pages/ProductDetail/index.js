import React from 'react';
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import { fetchProduct } from '../../api';
import { Box, Text, Button, Image } from '@chakra-ui/react';
import moment from 'moment';
import ImageGallery from 'react-image-gallery';
import { useBasket } from '../../contexts/BasketContext';


function ProductDetail() {

  const { product_id } = useParams();

  //console.log("product_id",product_id);

   const { isLoading, isError, data } = useQuery(['product', product_id], () => fetchProduct(product_id)); 
   
    const {addToBasket,items, removeFromBasket} = useBasket();
  
   if (isLoading) return 'Loading...'

   if (isError) return 'An error has occurred: ' + isError.message;
   
 const itemInBasket = items.find((item)=> item._id === product_id);

  const photos = data.photos.map((url)=>({original:url}));
  
  const tmp  = [];

  photos.map((url)=> tmp.push(url));
  photos.map((url)=> tmp.push(url));
  photos.map((url)=> tmp.push(url));
  
  //console.log(process.env.REACT_APP_BASE_ENDPOINT);
  //console.log(tmp); 

  return (
    <div>
      <h1>Product Detail </h1>
    
      <Button colorScheme={!itemInBasket ? "green":"orange"} onClick={()=>!itemInBasket ? addToBasket(data):removeFromBasket(data._id)} >
        {itemInBasket ? "Remove from Basket" : "Add to Basket"}
        </Button>
      <Text as="h2" fontSize="2xl" >{data.title}</Text>
      <Text fontSize="xs">{moment(data.createAt).format("DD/MM/YYYY")}</Text> 
      <Text >{data.description}</Text>
       <Box margin="10" >
     
        <ImageGallery items={tmp} showThumbnails="false" showPlayButton="false" showFullscreenButton="false"  />
     
    </Box> 

      <hr />
    </div>
  )
}

export default ProductDetail