import { Box, Heading } from '@chakra-ui/react';
import React from 'react'
import { useAuth } from '../../../contexts/AuthContext'

function Profile() {

    const {user} = useAuth();

  return (
    <div><Heading as='h4' size='md'>Profile</Heading>
    <hr/>
    
    {user && user.role}
    <br/>
    {user && user.email}
   
    </div>
  )
}

export default Profile