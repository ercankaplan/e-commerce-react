import { Box, Button, Flex, FormControl, FormLabel, Heading, Input ,Alert} from '@chakra-ui/react'
import React from 'react'
import { Formik, useFormik } from 'formik'
import validationSchema from './validations';
import { fetchRegister } from '../../../api';
import {useAuth} from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Signup() {

  const {login} = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    validationSchema,
    onSubmit: async (values, bag) => {
      //console.log(values);
      try {
        const registerResponse =await fetchRegister({email:values.email,password:values.password});
       
        //console.log(registerResponse);

        login(registerResponse);

        navigate('/profile');
       

      } catch (e) {
 
        bag.setErrors({general:e.response.data.message});
      }
    }

  });

  return (
    <div>

      <Flex align="center" justifyContent="center" width="full">
        <Box pt={10}>
          <Box textAlign="center" >
            <Heading>Sign up</Heading>
          </Box>
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
                <FormLabel>E-mail</FormLabel>
                <Input
                  name='email'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  isInvalid={formik.touched.email && formik.errors.email}
                />
                 {formik.errors.email && formik.touched.email && <div className='error'><span>{formik.errors.email}</span></div>}
               {/*   <ErrorMessage/> */}
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Password</FormLabel>
                <Input
                  name='password'
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  isInvalid={formik.touched.password && formik.errors.password}
                />
                  {formik.errors.password && formik.touched.password && <div className='error'><span>{formik.errors.password}</span></div>}
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Password Confirm</FormLabel>
                <Input
                  name='passwordConfirm'
                  type="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.passwordConfirm}
                  isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
                />
                 {formik.errors.passwordConfirm && formik.touched.passwordConfirm && <div className='error'><span>{formik.errors.passwordConfirm}</span></div>}
              </FormControl>
              <Button mt="4" type="submit" width="full">
                Sign up
              </Button>
            </form>
            </Formik>
          </Box>
        </Box>
      </Flex>

    </div>
  )
}

export default Signup