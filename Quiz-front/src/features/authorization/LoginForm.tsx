import React from "react";
import {Button, Paper, PasswordInput, Stack, TextInput, Title} from "@mantine/core";

import "../styles/Forms.css";
import {useLoginForm} from "./hooks/useLoginForm";
import {useNavigate} from "react-router-dom";
import {loginErrorNotification} from "./notifications";


const LoginForm: React.FC = () => {
    const form = useLoginForm();
    const navigate = useNavigate();
    const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const response = await fetch('http://localhost:3333/api/auth/signin', {
                method: 'POST',
                headers: {
                    ContentType: 'application/json',
                    Authorization: 'Basic ' + window.btoa(form.values.login + ":" + form.values.password),
                },
                credentials: 'include'
            })


            console.log(form)

            if (response.status !== 201) throw new Error("Logowanie się nie powiodło");
            else{
                navigate('/')
            }

        }
        catch{
            loginErrorNotification();
        }
    };


    return (
        <Stack justify={"center"} align={"center"} gap="md">
            <Title>Zaloguj się</Title>

            <form  onSubmit={handleSubmit}>


                    <Paper  shadow="xs" style={{maxWidth:"1000px", marginBottom:"20px" ,margin:"auto",padding: "16px" }}>
                        <TextInput
                            label={`Login`}
                            placeholder="Podaj login"
                            {...form.getInputProps('login')}
                        />
                        <PasswordInput
                            label={"Hasło"}
                            placeholder={"Podaj hasło"}
                            {...form.getInputProps('password')}
                        />

                    </Paper>

                    <Button   type={"submit"} style ={{width:"1000px", margin:"auto"}} >Zaloguj się</Button>

            </form>
        </Stack>
    );
};

export default LoginForm;
