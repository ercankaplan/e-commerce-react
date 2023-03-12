import * as yup from 'yup';

const validations = yup.object().shape({

    email: yup
        .string()
        .email("Geçerli bir mail adresi giriniz")
        .required("Zorunlu alan"),

    password: yup
        .string()
        .min(5, "Parolanız en az 5 karakter olmalıdır")
        .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
        .matches(/\d/, "Password should contain at least one number")
        .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character")
        .required("Zorunlu alan"),

    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password')], "Parolalar uyuşmuyor")
        .required("Zorunlu alan")
    

})

export default validations