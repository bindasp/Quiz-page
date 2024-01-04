import React from "react";
import {Button, Menu, Paper, PasswordInput, Stack, Textarea, TextInput, Title} from "@mantine/core";

import "../styles/Forms.css";
import {useLoginForm} from "./hooks/useLoginForm";



const RegisterForm: React.FC = () => {
    const form = useLoginForm();

    const handleSubmit = () => {
        console.log(form.values);
    };


    return (
        <Stack justify={"center"} align={"center"} gap="md">
            <Title>Zarejestruj się</Title>

            <form  onSubmit={form.onSubmit(handleSubmit)}>

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
