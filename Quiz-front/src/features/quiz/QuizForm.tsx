import React, {useEffect, useState} from "react";
import {Button, Checkbox, MultiSelect, Paper, rem, Stack, Textarea, TextInput} from "@mantine/core";

import {useQuizForm} from "./hooks/useQuizForm";
import {IconCircle, IconX} from "@tabler/icons-react";
import {useNavigate} from "react-router-dom";
import "../styles/Forms.css"

interface categoryData{
    id:number,
    categoryName: string
}

const QuizForm: React.FC = () => {
    const form = useQuizForm();
    const navigate = useNavigate();
    const [updatedQuestions, setUpdatedQuestions] = useState<any[]>([]);
    const [category, setCategory] = useState<string[]>([])
    const [categories, setCategories] = useState<string[]>([])
    useEffect(() => {
        console.log(categories)
        getCategories();

    },[]);

    const handleSubmit = async () => {

        const response = await fetch(`http://localhost:3333/api/quiz`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form.values),
            credentials: 'include'
        });

        console.log(form.values);
        navigate('/');

    };

    const getCategories = async ()=>{
        const response = await fetch(`http://localhost:3333/api/category`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },

        })
        if(response.ok){
            const cat:categoryData[] = await response.json();
            const newCategories:string[] = [];
            cat.map(value => {
                newCategories.push(value.categoryName);
            })
            setCategories(newCategories);

        }
    }

    const handleAddQuestion = () => {
        const Questions = form.values.questions;

        const newQuestion = {
            question: "",
            answers: [{answer: "", isCorrect: false}]
        };

        Questions.push(newQuestion);

        form.setFieldValue("questions", Questions);
    };

    const handleAddAnswer = (questionIndex: number) => {
        const newAnswer ={answer: "", isCorrect: false};
        const updatedQuestions = [...form.values.questions];
         updatedQuestions[questionIndex].answers.push(newAnswer);
        form.setFieldValue("questions", updatedQuestions);
    };

    const handleCheckboxClick = (questionIndex: number, answerIndex: number) => {
        if(!form.values.questions[questionIndex].answers[answerIndex].isCorrect)
            form.values.questions[questionIndex].answers[answerIndex].isCorrect = true;
        else if(form.values.questions[questionIndex].answers[answerIndex].isCorrect)
            form.values.questions[questionIndex].answers[answerIndex].isCorrect = false;

    };


    const handleDeleteAnswer = (questionIndex: number, answerIndex: number) => {
        const updatedQuestions = [...form.values.questions];
        updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
        form.setFieldValue("questions", updatedQuestions);

    };


    const handleDeleteQuestion = (questionIndex:number)=>{
        const updatedQuestions = [...form.values.questions];
        updatedQuestions.splice(questionIndex, 1);
        form.setFieldValue("questions", updatedQuestions);
    }

    const handleSelectCategory = (category:string[])=>{

        setCategory(category);

        form.setFieldValue("category", category);
    }

    return (
        <Stack  gap="md">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <div style={{display: "flex", margin: "auto", maxWidth: "1000px",marginBottom: "15px"}}>
                    <TextInput
                        style={{width: "480px", marginRight:"50px"}}
                        withAsterisk
                        label={"Tytuł"}
                        placeholder={"Podaj tytuł quizu"}
                        {...form.getInputProps('title')}
                    />

                    <MultiSelect
                        label={"Kategoria"}
                        placeholder={"Wybierz kategorię"}
                        checkIconPosition={"right"}
                        maxValues={3}
                        style={{width: "480px", alignContent:"flex-end"}}
                        data={categories.map((value) => (
                            {
                                label: value,
                                value: value,
                            }
                        ))}
                        value={category}
                        defaultValue={['Brak']}
                        //{...form.getInputProps("category")}
                        onChange={(value)=> value && handleSelectCategory(value)}
                        clearable
                    />

                </div>
                <Textarea
                    label={"Opis"}
                    placeholder={"Dodaj opis"}
                    style={{minHeight: "80px", maxWidth: "1000px", margin: "auto"}}
                    {...form.getInputProps('description')}
                />

                {form.values.questions && form.values.questions.map((question, questionIndex) => (
                    <Paper mt={10} key={questionIndex} withBorder={true} shadow="xs"
                           style={{maxWidth: "1000px", margin: "auto", padding: "16px"}}>
                        <TextInput
                            label={"Pytanie " + (questionIndex + 1)}
                            withAsterisk
                            placeholder="Treść pytania"
                            {...form.getInputProps(`questions.${questionIndex}.question`)}
                            mb={10}

                        />
                        {question.answers && question.answers.map((answer, answerIndex) => (
                            <div className={"check"} key={answerIndex} style={{marginTop:"5px"}}>

                                <TextInput
                                    w={1000}
                                    key={answerIndex}
                                    c={"gray"}
                                    placeholder={"Dodaj odpowiedź"}
                                    {...form.getInputProps(`questions.${questionIndex}.answers.${answerIndex}.answer`)}
                                    mr={5}
                                />
                                <Checkbox m={'auto'}
                                          onChange={() => handleCheckboxClick(questionIndex, answerIndex)}

                                >
                                </Checkbox>
                                <IconX  className={"delete-icon"} style={{margin:"auto"}} onClick={()=>handleDeleteAnswer(questionIndex, answerIndex)}></IconX>
                            </div>
                        ))}
                        <div style={{display:"flex"}}>
                        <Button mr={"20px"}
                            onClick={() => handleAddAnswer(questionIndex)}
                            style={{width: "20%", marginTop: "10px"}}
                        >
                            Dodaj odpowiedź
                        </Button>
                            <Button
                                onClick={() => handleDeleteQuestion(questionIndex)}
                                style={{width: "20%", marginTop: "10px"}}
                            >Usuń pytanie</Button>
                        </div>
                    </Paper>
                ))}

                <div style={{display:"flex", maxWidth:"1000px", margin:"auto"}}>
                    <Button style={{marginTop:"15px", width:"20%", marginRight:"auto"}} onClick={handleAddQuestion}>Dodaj pytanie</Button>
                    <Button type="submit" style={{marginTop:"15px", width:"20%", marginLeft:"auto"}}>Zapisz quiz</Button>

                </div>
            </form>
        </Stack>
    );
};

export default QuizForm;
