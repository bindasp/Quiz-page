import React from "react";
import {Button, Menu, Paper, PasswordInput, Stack, Textarea, TextInput, Title} from "@mantine/core";
import {useQuizForm} from "../quiz/hooks/useQuizForm";
import {useQuestionForm} from "../quiz/hooks/useQuestionForm";
import {Question} from "../../types/QuizFormValues";
import "../styles/Forms.css";



const QuizForm: React.FC = () => {
    const form = useQuizForm();
    const questions = useQuestionForm();

    const handleSubmit = () => {
        console.log(form.values);
    };


    return (
        <Stack justify={"center"} align={"center"} gap="md">
            <Title>Zaloguj się</Title>

            <form  onSubmit={form.onSubmit(handleSubmit)}>


                    <Paper  shadow="xs" style={{maxWidth:"1000px", marginBottom:"20px" ,margin:"auto",padding: "16px" }}>
                        <Textarea
                            label={`Email`}
                            placeholder="Podaj email"
                        />
                        <PasswordInput
                            label={"Hasło"}
                            placeholder={"Podaj hasło"}
                        />

                    </Paper>


                <Stack gap="md">
                    <Button style ={{width:"1000px", margin:"auto"}} onClick={handleSubmit}>Zaloguj się</Button>

                </Stack>
            </form>
        </Stack>
    );
};

export default QuizForm;
