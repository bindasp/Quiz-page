import React from "react";
import {Button, Paper, PasswordInput, Stack, TextInput, Title} from "@mantine/core";

import "../styles/Forms.css";
import {useLoginForm} from "./hooks/useLoginForm";
import {login} from "./login";
import {useNavigate} from "react-router-dom";
import {loginErrorNotification} from "./notifications";
import {UserFormValues} from "../../types/UserFormValues";


const QuizForm: React.FC = () => {
    const form = useLoginForm();
    const navigate = useNavigate();
    const handleSubmit = async(form: UserFormValues) => {
       try{
           await login(form.email, form.password);
           navigate('/');
       }
       catch(error){
           loginErrorNotification();
       }
    };


    return (
        <Stack justify={"center"} align={"center"} gap="md">
            <Title>Zaloguj się</Title>

            <form  onSubmit={form.onSubmit(handleSubmit)}>


                    <Paper  shadow="xs" style={{maxWidth:"1000px", marginBottom:"20px" ,margin:"auto",padding: "16px" }}>
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

                    </Paper>


                <Stack gap="md">
                    <Button type={"submit"} style ={{width:"1000px", margin:"auto"}} >Zaloguj się</Button>

                </Stack>
            </form>
        </Stack>
    );
};

export default QuizForm;
