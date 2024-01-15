import React, {useEffect, useState} from "react";
import {Button, Checkbox, Paper, Select, Stack, Textarea, TextInput} from "@mantine/core";

import {useQuizForm} from "./hooks/useQuizForm";
import {IconCircle, IconX} from "@tabler/icons-react";
import {QuizCategories} from "../../types/QuizCategories";
import {useNavigate, useParams} from "react-router-dom";
import "../styles/Forms.css"

interface quizData{
    id?:string;
    title: string;
    description:string;
    category: string[];
    questions: {question:string, answers:[{answer:string, isCorrect: boolean}]}[];
}

const EditQuiz: React.FC = () => {
    const form = useQuizForm();
    const navigate = useNavigate();
    const [updatedQuestions, setUpdatedQuestions] = useState<any[]>([]);
    const{id} = useParams();
    const [quizData, setQuizData] = useState<quizData|null>(null);
    const [selected, setSelected] = useState<number[][]>([])
    useEffect(()=> {
        const fetchData = async () => {
            const quiz = await fetch(`http://localhost:3333/api/quiz/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

            });
            if (quiz.ok) {
                const data: quizData = await quiz.json();
                form.setValues({
                    title:data.title,
                    description:data.description,
                    category:data.category,
                    questions:data.questions

                })
                setQuizData(data);

            } else {
                console.error('Błąd podczas pobierania quizu');
            }
        };


        console.log(id);
        fetchData();
    },[]);
    const handleSubmit = async () => {
        const response = await fetch(`http://localhost:3333/api/quiz/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form.values),
            credentials: 'include'
        });

        console.log(response);
        navigate('/');

    };

    const handleDelete = async() =>{
        const response = await fetch(`http://localhost:3333/api/quiz/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        console.log(response);
        navigate('/');
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
    const handleCheckboxChange = (questionIndex: number, answerIndex: number) => {
        setSelected((prevSelected) => {
            const newSelected = [...prevSelected];

            newSelected[questionIndex][answerIndex] = newSelected[questionIndex][answerIndex] === 1 ? 0 : 1;

            return newSelected;
        });
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

    return (
        <Stack gap="md">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <div style={{display: "flex", margin: "auto", maxWidth: "1000px"}}>
                    <TextInput
                        style={{marginBottom: "15px", width: "500px",}}
                        withAsterisk
                        label={"Tytuł"}
                        placeholder={"Podaj tytuł quizu"}
                        {...form.getInputProps('title')}
                    />
                    <Select
                        label={"Kategoria"}
                        placeholder={"Brak kategorii"}
                        data={Object.entries(QuizCategories).map(([key, value]) => (
                            {
                                label: value.toString(),
                                value: key,
                            }
                        ))}
                        {...form.getInputProps("category")}

                    />

                </div>
                <Textarea
                    label={"Opis"}
                    placeholder={"Dodaj opis"}
                    style={{minHeight: "80px", maxWidth: "1000px", margin: "auto"}}
                    {...form.getInputProps('description')}
                />

                {form.values.questions && form.values.questions.map((question, questionIndex) => (
                    <Paper mt={20} key={questionIndex} withBorder={true} shadow="xs"
                           style={{maxWidth: "1000px", marginBottom: "20px", margin: "auto", padding: "16px"}}>
                        <TextInput
                            label={"Pytanie " + (questionIndex + 1)}
                            withAsterisk
                            placeholder="Treść pytania"
                            {...form.getInputProps(`questions.${questionIndex}.question`)}
                        />
                        {question.answers && question.answers.map((answer, answerIndex) => (
                            <div className={"check"} key={answerIndex}>

                                <TextInput
                                  //  variant={"unstyled"}
                                    className={"answer"}
                                    w={1000}
                                    key={answerIndex}
                                    c={"gray"}
                                    placeholder={"Dodaj odpowiedź"}
                                    leftSection={<IconCircle size="1rem" stroke={1.5}/>}
                                    {...form.getInputProps(`questions.${questionIndex}.answers.${answerIndex}.answer`)}

                                />
                                <Checkbox m={'auto'} defaultChecked={question.answers[answerIndex].isCorrect}

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

                <Stack gap="md">
                    <Button  style={{width: "1000px", margin:"auto", marginTop:"20px"}} onClick={handleAddQuestion}>Dodaj pytanie</Button>
                    <Button type="submit" style={{width: "1000px", margin: "auto"}}>Zapisz quiz</Button>
                    <Button style={{width: "1000px", margin: "auto"}} onClick={handleDelete}>Usuń Quiz</Button>

                </Stack>
            </form>
        </Stack>
    );
};

export default EditQuiz;
