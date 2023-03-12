import { Flex, Spinner } from '@chakra-ui/react';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { fetchLogout, fetchMe } from '../api';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
 const [user,setUser] = useState(null);
 const [loggedIn,setLoggedIn] = useState(false);
 const [loading,setLoading] = useState(true);

 useEffect(()=> {
   
    (async () => {

        try {
            const me = await fetchMe();
            //console.log(me);
            setUser(me);
            setLoggedIn(true);
            setLoading(false);
        } catch (e) {
            setLoading(false);
        }
        finally{
            setLoading(false);
        }
    })()

 },[])

const login = (data) => {

    setLoggedIn(true);
    setUser(data.user);

    localStorage.setItem("access-token",data.accessToken);
    localStorage.setItem("refresh-token",data.refreshToken);
}


if(loading)
{
  console.log("loading");
    return (
        <Flex justify="center" alignItems="center" height="100vh" >
            <Spinner thickness="4px" speed="0.90" emptyColor="gray.200" size="xl" color="orange" />
        </Flex>
    )

}

const logout = async(callback)=> {

   
    setLoggedIn(false);
    setUser(null);

    await fetchLogout();

    localStorage.removeItem('access-token');
    localStorage.removeItem('refresh-token');

    callback()

}


const values = {
    loggedIn,
    user,
    login,
    logout
   }

return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>

}

const useAuth = () => useContext(AuthContext);

export {AuthProvider,useAuth};