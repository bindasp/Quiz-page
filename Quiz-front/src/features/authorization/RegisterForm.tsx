import React from "react";
import {Button, Paper, Stack, Textarea, TextInput} from "@mantine/core";
import { Question} from "../../types/QuizFormValues";
import {useQuizForm} from "../quiz/hooks/useQuizForm";
import {useQuestionForm} from "../quiz/hooks/useQuestionForm";


const QuizForm: React.FC = () => {
    const form = useQuizForm();
    const questions = useQuestionForm();

    const handleSubmit = () => {
        console.log(form.values);
    };

    const handleAddQuestion = () => {
        form.setFieldValue('questions', [...form.values.questions, questions.values]);
        questions.reset();
    };

    return (
        <Stack  gap="md">
            <form  onSubmit={form.onSubmit(handleSubmit)}>

                <TextInput
                    style={{marginBottom:"15px", maxWidth:"1000px", margin:"auto"}}
                    withAsterisk
                    label={"Tytuł"}
                    placeholder={"Podaj tytuł quizu"}
                    {...form.getInputProps('title')}
                />

                {form.values.questions.map((question: Question, index: number) => (
                    <Paper  key={index} shadow="xs" style={{maxWidth:"1000px", marginBottom:"20px" ,margin:"auto",padding: "16px" }}>
                        <Textarea
                            withAsterisk
                            label={`Pytanie ${index + 1}`}
                            placeholder="Treść pytania"
                            {...form.getInputProps(`questions.${index}.text`)}
                        />

                        {question.answers.map((answer: { text: string }, answerIndex: number) => (
                            <Textarea
                                key={answerIndex}
                                withAsterisk
                                label={`Odpowiedź ${String.fromCharCode(97 + answerIndex)}`}
                                placeholder={`Odpowiedź ${String.fromCharCode(97 + answerIndex)}`}
                                {...form.getInputProps(`questions.${index}.answers.${answerIndex}.text`)}
                            />
                        ))}
                    </Paper>
                ))}

                <Stack gap="md">
                    <Button style ={{width:"1000px", margin:"auto"}} onClick={handleAddQuestion}>Dodaj pytanie</Button>
                    <Button style ={{width:"1000px", margin:"auto"}} onClick={handleSubmit}>Zapisz quiz</Button>
                </Stack>
            </form>
        </Stack>
    );
};

export default QuizForm;
