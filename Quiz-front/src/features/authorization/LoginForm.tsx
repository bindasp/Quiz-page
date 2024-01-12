import React from "react";
import {Button, Loader, Paper, PasswordInput, Stack, TextInput, Title} from "@mantine/core";

import "../styles/Forms.css";
import {useLoaderData, useNavigate} from "react-router-dom";
import {loginErrorNotification} from "./notifications";
import {login} from "./login";
import {hasLength, useForm} from "@mantine/form";

type LoginFormType = {
    login:string;
    password:string;
}

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const form = useForm<LoginFormType>({
        initialValues:{
            login:'',
            password:''
        },
        validate:{
            password: hasLength({min:4, max: 16}, ("Hasło musi mieć długość od 8 do 16 znaków")),
            login: hasLength({min:3, max:16}, ("Login musi mieć długość od 3 do 16 znaków"))
        }
    });

    const handleSubmit = async(data:LoginFormType) => {
        try {
            await login(data.login, data.password);
            navigate('/quizzes');
        }

        catch(error){
           loginErrorNotification();
        }
    };


    return (
        <Stack justify={"center"} align={"center"} gap="md">
            <Title>Zaloguj się</Title>

            <form  onSubmit={form.onSubmit(values => handleSubmit(values))}>
                    <Paper  shadow="xs" style={{maxWidth:"1000px", marginBottom:"20px" ,margin:"auto",padding: "16px" }}>
                        <TextInput
                            required
                            type={"login"}
                            label={`Login`}
                            placeholder="Podaj login"
                            {...form.getInputProps('login')}
                        />
                        <PasswordInput
                            required
                            type={"password"}
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
