import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import styles from './styles.module.css';


function Error404() {
    return (
        <div>
            <Flex align="center" justifyContent="center" width="full"  >
                <Box  align="center">
                    <Box pt={5}  >
                        <Image htmlWidth="200" src="https://bitly.com/static/graphics/meditation.png" alt="404" loading="lazy" />
                    </Box>
                    <Box pt={5}>
                        <Text fontSize="54" fontWeight="bold" color="gray.400">
                            Something's wrong here.
                        </Text>
                    </Box>
                    <Box pt={5} width="50%" >
                        <Text className={styles.headline} >
                            This is a 404 error, which means you've clicked on a bad link or entered an invalid URL. Maybe what you are looking for can be found at ECCO-commerce. P.S. Ecco links are case sensitive.
                        </Text>
                    </Box>
                </Box>
            </Flex>

        </div>
    )
}

export default Error404