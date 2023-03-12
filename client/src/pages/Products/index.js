
import React from 'react';
import Card from '../../components/Card';
import { Box, Button, Flex, Grid } from '@chakra-ui/react';
/* import { useQuery } from 'react-query'; */
import { useInfiniteQuery } from 'react-query';
import {fetchProductList} from '../../api'

function Products() {

    //cached data key =>>>>>>>>>>>>>>>>>>>>>>>>>>products
/*     const { isLoading, error, data } = useQuery('products', () =>fetch('http://localhost:4000/product?page=1').then(res =>res.json())) */

const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery('products', fetchProductList ,{
    getNextPageParam: (lastGroups, allGroups) =>  //lastGroups.nextCursor,
    {
        
        const morePagesExists = lastGroups?.length===12;

        if(!morePagesExists)
        return;

        return allGroups.length+1;
    },
  });

  if (status === 'loading') return 'Loading...'

  if (status === 'error') return 'An error has occurred: ' + error.message

    //console.log("data:",data);
    return (
        <>
         <Grid templateColumns='repeat(3, 1fr)' gap={10}>
            
                {data.pages.map((group, i) => (
                    <React.Fragment key={i}>
                      {group.map((item) => (
                        <Box width="100%" key={item._id}>
                          <Card  item={item} />
                        </Box>
                      ))}
                    </React.Fragment>
                  ))}
            
            </Grid>
       
        <Flex mt="10" justifyContent="center" >  
          <Button 
          isLoading = {isFetchingNextPage}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {isFetchingNextPage
              ? 'Loading more...'
              : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
          </Button>
        </Flex>
        <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      </>
    )
}

export default Products

/* 
function Products1() {

    
    const { isLoading, error, data } = useQuery('products', fetchProductList );

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

    //console.log("data:",data);
    return (
        <div>

            <Grid templateColumns='repeat(3, 1fr)' gap={10}>
            {
                data.map((item,i)=> <Card key={i} item={item} />)
            }
            </Grid>
           



        </div>
    )
} */