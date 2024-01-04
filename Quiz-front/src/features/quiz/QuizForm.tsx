import React from "react";
import {Button, Menu, MenuDropdown, Paper, Select, Stack, Textarea, TextInput} from "@mantine/core";

import { useQuizForm } from "./hooks/useQuizForm";
import {IconCircle, IconHome2} from "@tabler/icons-react";
import {QuizCategories} from "../../types/QuizCategories";


const QuizForm: React.FC = () => {
    const form = useQuizForm();

    const handleSubmit = () => {

        console.log(form.values);
    };

    const handleAddQuestion = () => {
        const newQuestion = { question: "", correctAnswers: [], incorrectAnswers: [] };
        form.setFieldValue("questions", [...(form.values.questions || []), newQuestion]);
    };

    const handleAddAnswer = (questionIndex: number) => {
        const newAnswer = "";
        const updatedQuestions = [...form.values.questions];
        updatedQuestions[questionIndex].incorrectAnswers = [
            ...(form.values.questions[questionIndex]?.incorrectAnswers || []),
            newAnswer,
        ];
        form.setFieldValue("questions", updatedQuestions);
    };

    const selectCategory=(category:QuizCategories)=>{
        console.log()
    }

    return (
        <Stack  gap="md">
            <form  onSubmit={form.onSubmit(handleSubmit)}>
                <div style={{display:"flex",margin:"auto" , maxWidth:"1000px"}}>
                <TextInput
                    style={{marginBottom:"15px", width:"500px", }}
                    withAsterisk
                    label={"Tytuł"}
                    placeholder={"Podaj tytuł quizu"}
                    {...form.getInputProps('title')}
                />

                <Select
                    label={"Kategoria"}
                    placeholder={"Brak kategorię"}
                    data={Object.entries(QuizCategories).map(([key,value])=>(
                        {
                            label:value.toString(),
                            value:key,
                        }
                        ))}
                    {...form.getInputProps("category")}

                />

                </div>
                <Textarea

                    label={"Opis"}
                    placeholder={"Dodaj opis"}
                    style={{ minHeight: "80px",  maxWidth:"1000px", margin:"auto"}}
                    {...form.getInputProps('description')}
                />

                {form.values.questions &&  form.values.questions.map((question, questionIndex)=>(
                    <Paper key={questionIndex} withBorder={true}  shadow="xs" style={{maxWidth:"1000px", marginBottom:"20px" ,margin:"auto",padding: "16px" }}>
                        <TextInput
                            label={"Pytanie " + (questionIndex+1)}
                            withAsterisk
                            placeholder="Treść pytania"
                            {...form.getInputProps(`questions.${questionIndex}.question`)}
                        />
                        {question.incorrectAnswers && question.incorrectAnswers.map((answer, answerIndex)=>(
                        <TextInput
                            key={answerIndex}
                            c={"gray"}
                            placeholder={"Dodaj odpowiedź"}
                            leftSection={<IconCircle size="1rem" stroke={1.5}/>}
                            {...form.getInputProps(`questions.${questionIndex}.incorrectAnswers.${answerIndex}`)}

                        />
                        ))}
                        <Button
                            onClick={()=> handleAddAnswer(questionIndex)}
                            style={{ width: "20%", marginTop: "10px" }}
                        >
                            Dodaj odpowiedź
                        </Button>

                    </Paper>
                    ))}

                <Stack gap="md">
                    <Button style ={{width:"1000px", margin:"auto"}} onClick={handleAddQuestion}>Dodaj pytanie</Button>
                    <Button style ={{ width:"1000px", margin:"auto"}} onClick={handleSubmit}>Zapisz quiz</Button>
                </Stack>
            </form>
        </Stack>
    );
};

export default QuizForm;
