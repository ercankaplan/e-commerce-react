import * as yup from 'yup';
import valid from 'card-validator'; //import statement

const validations = yup.object().shape({

    creditCardNumber: yup
    .string()
    .test('test-number', // this is used internally by yup
    'Credit Card number is invalid', //validation message
     value => valid.number(value).isValid) // return true false based on validation
    .required("Required field"),

    address: yup
        .string()
        .min(20, "Address not found")
        .required("Required field"),

  
    

})

export default validations