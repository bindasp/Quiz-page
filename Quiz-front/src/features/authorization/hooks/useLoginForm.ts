import { isEmail, isInRange, useForm } from "@mantine/form";
import { UserFormValues } from "../../../types/UserFormValues";

export const useLoginForm = () => {
    const form = useForm<UserFormValues>({
        initialValues: {
            login: "",
            email: "",
            password: "",
            confirmPassword:""
        },

        validate: {
            login: (value) => {
                if (value.length < 3) {
                    return "Login musi mieć przynajmniej 3 znaki";
                }
            },
            email: isEmail("Podany email jest niepoprawny"),
            password: (value) => {
                if (value.length < 8) {
                    return "Hasło musi zawierać conajmniej 8 znaków";
                }

            },
            confirmPassword: (value,values)=>  value!==values.password ? 'Hasła się nie zgadzają':null,
        },
    });
    return form;
};
