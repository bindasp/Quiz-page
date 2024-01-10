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
    category: QuizCategories;
    questions: {question:string, correctAnswers:string[], incorrectAnswers:string[]}[];
}

const EditQuiz: React.FC = () => {
    const form = useQuizForm();
    const navigate = useNavigate();
    const [updatedQuestions, setUpdatedQuestions] = useState<any[]>([]);
    const{id} = useParams();
    const [quizData, setQuizData] = useState<quizData|null>(null);
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
                    questions: data.questions
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
        handleBeforeSubmit();
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



    const handleAddQuestion = () => {
        const newQuestion = {question: "", correctAnswers: [], incorrectAnswers: []};
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

    const handleToggleCorrectAnswer = (questionIndex: number, answerIndex: number) => {
        const updatedQuestionsCopy = [...form.values.questions];

        if (updatedQuestionsCopy[questionIndex] && updatedQuestionsCopy[questionIndex].incorrectAnswers) {
            const selectedAnswer: string = updatedQuestionsCopy[questionIndex].incorrectAnswers[answerIndex];
            const isCorrect: boolean = updatedQuestionsCopy[questionIndex].correctAnswers.includes(selectedAnswer);

            if (isCorrect) {
                updatedQuestionsCopy[questionIndex].correctAnswers = updatedQuestionsCopy[questionIndex].correctAnswers.filter(
                    (answer: string) => answer !== selectedAnswer
                );
            } else {
                updatedQuestionsCopy[questionIndex].correctAnswers = [
                    ...updatedQuestionsCopy[questionIndex].correctAnswers,
                    selectedAnswer,
                ];
            }

            form.setFieldValue("questions", updatedQuestionsCopy);
        }
    };

    const handleBeforeSubmit = () => {
        const updatedQuestionsCopy = [...form.values.questions];

        updatedQuestionsCopy.forEach(question => {
            if (question.incorrectAnswers) {

                question.incorrectAnswers = question.incorrectAnswers.filter(
                    (answer: string) => !question.correctAnswers.includes(answer)
                );
            }
        });

        form.setFieldValue("questions", updatedQuestionsCopy);
    };

    const handleDeleteAnswer = (questionIndex: number, answerIndex: number) => {
        const updatedQuestions = [...form.values.questions];
        const deletedAnswer = form.values.questions[questionIndex]?.incorrectAnswers[answerIndex];

        updatedQuestions[questionIndex].incorrectAnswers.splice(answerIndex, 1);

        updatedQuestions[questionIndex].correctAnswers = updatedQuestions[questionIndex].correctAnswers.filter(
            (answer) => answer !== deletedAnswer
        );

        form.setFieldValue("questions", updatedQuestions);

        console.log(form.values);
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
                    <Paper key={questionIndex} withBorder={true} shadow="xs"
                           style={{maxWidth: "1000px", marginBottom: "20px", margin: "auto", padding: "16px"}}>
                        <TextInput
                            label={"Pytanie " + (questionIndex + 1)}
                            withAsterisk
                            placeholder="Treść pytania"
                            {...form.getInputProps(`questions.${questionIndex}.question`)}
                        />
                        {question.incorrectAnswers && question.incorrectAnswers.map((answer, answerIndex) => (
                            <div className={"check"} key={answerIndex}>

                                <TextInput
                                    w={1000}
                                    key={answerIndex}
                                    c={"gray"}
                                    placeholder={"Dodaj odpowiedź"}
                                    leftSection={<IconCircle size="1rem" stroke={1.5}/>}
                                    {...form.getInputProps(`questions.${questionIndex}.incorrectAnswers.${answerIndex}`)}

                                />
                                <Checkbox m={'auto'} checked={question.correctAnswers.includes(answer)}
                                          onChange={() => handleToggleCorrectAnswer(questionIndex, answerIndex)}
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
                    <Button style={{width: "1000px", margin: "auto"}} onClick={handleAddQuestion}>Dodaj pytanie</Button>
                    <Button type="submit" style={{width: "1000px", margin: "auto"}}>Zapisz quiz</Button>

                </Stack>
            </form>
        </Stack>
    );
};

export default EditQuiz;
