import React from "react";
import {Button, Paper, PasswordInput, Stack, TextInput, Title} from "@mantine/core";

import "../styles/Forms.css";
import {registerErrorNotification} from "./notifications";
import {useNavigate} from "react-router-dom";
import {register} from "./register";
import {hasLength, isEmail, matchesField, useForm} from "@mantine/form";

type RegisterFormType = {
    login:string;
    email:string;
    password:string;
    confirmpassword:string
}

const RegisterForm: React.FC = () => {
    const form = useForm<RegisterFormType>({
        initialValues:{
            login:'',
            email:'',
            password:'',
            confirmpassword:'',

        },
        validate:{
            email: isEmail('Podano błędny email'),
            confirmpassword: matchesField(
                'password', 'Podane hasła są różne'
            ),
            password: hasLength({min:4, max: 16}, ("Hasło musi mieć długość od 4 do 16 znaków")),
            login: hasLength({min:3, max:16}, ("Login musi mieć długość od 3 do 16 znaków"))
        }
    });
    const navigate = useNavigate();

    const handleSubmit = async(data:RegisterFormType) => {
        try {
            await register(data);
            navigate('/login');
        }
        catch(error){
            registerErrorNotification();
        }
    };


    return (
        <Stack justify={"center"} align={"center"} gap="md">
            <Title>Zarejestruj się</Title>

            <form  onSubmit={form.onSubmit(values => handleSubmit(values))}>

                <Paper  shadow="xs" style={{maxWidth:"1000px", marginBottom:"20px" ,margin:"auto",padding: "16px" }}>

                    <TextInput
                        label={`Login`}
                        placeholder="Podaj login"
                        {...form.getInputProps('login')}
                    />

                    <TextInput
                        label={`Email`}
                        type={"email"}
                        placeholder="Podaj email"
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        label={"Hasło"}
                        type={"password"}
                        placeholder={"Podaj hasło"}
                        {...form.getInputProps('password')}
                    />
                    <PasswordInput
                        label={"Potwierdź hasło"}
                        type={"password"}
                        placeholder={"Potwierdź hasło"}
                        {...form.getInputProps('confirmpassword')}

                    />

                </Paper>


                <Stack gap="md">
                    <Button type={"submit"} style ={{width:"1000px", margin:"auto"}} >Utwórz konto</Button>

                </Stack>
            </form>
        </Stack>
    );
};

export default RegisterForm;
