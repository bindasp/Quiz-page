import React from "react";
import {Button, Menu, Paper, PasswordInput, Stack, Textarea, TextInput, Title} from "@mantine/core";

import "../styles/Forms.css";
import {useLoginForm} from "./hooks/useLoginForm";
import {loginErrorNotification} from "./notifications";
import {useNavigate} from "react-router-dom";



const RegisterForm: React.FC = () => {
    const form = useLoginForm();
    const navigate = useNavigate();

    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3333/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form.values),
                credentials: 'include'
            })

            if (response.status !== 201) throw new Error("Rejestracja się nie powiodła");

            else {
                navigate('/login');
            }
        }
        catch{
            loginErrorNotification();
        }
    };


    return (
        <Stack justify={"center"} align={"center"} gap="md">
            <Title>Zarejestruj się</Title>

            <form  onSubmit={handleSubmit}>

                <Paper  shadow="xs" style={{maxWidth:"1000px", marginBottom:"20px" ,margin:"auto",padding: "16px" }}>

                    <TextInput
                        label={`Login`}
                        placeholder="Podaj login"
                        {...form.getInputProps('login')}
                    />

                    <TextInput
                        label={`Email`}
                        placeholder="Podaj email"
                        {...form.getInputProps('email')}
                    />
                    <PasswordInput
                        label={"Hasło"}
                        placeholder={"Podaj hasło"}
                        {...form.getInputProps('password')}
                    />
                    <PasswordInput
                        label={"Potwierdź hasło"}
                        placeholder={"Potwierdź hasło"}
                        {...form.getInputProps('confirmPassword')}

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
