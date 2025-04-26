import React, { useEffect, useState } from "react";
import { Button, Checkbox, MultiSelect, Paper, Stack, Textarea, TextInput } from "@mantine/core";

import { useQuizForm } from "./hooks/useQuizForm";
import { IconX } from "@tabler/icons-react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../styles/Forms.css"
import { getCategories, getQuizById } from "../../fetchFunctions/getFunctions";
import { deleteQuiz } from "../../fetchFunctions/deleteFunctions";

interface QuizApi {
    id?: string;
    title: string;
    description: string;
    category: categoryData[];
    questions: {
        question: string;
        answers: { answer: string, isCorrect: boolean }[];
    }[];
}
interface categoryData {
    id: number,
    name: string,
    description: string
}


const EditQuiz: React.FC = () => {
    const form = useQuizForm();
    const navigate = useNavigate();
    const [updatedQuestions, setUpdatedQuestions] = useState<any[]>([]);
    const { id } = useParams();
    const [selected, setSelected] = useState<number[][]>([])
    const [category, setCategory] = useState<string[]>([])
    const [categories, setCategories] = useState<string[]>([])
    const location = useLocation();
    const quizItem = location.state?.quizItem;
    useEffect(() => {

        fetchCategories().then();
        fetchData().then();
    }, []);
    const fetchData = async () => {
        try {
            const data: QuizApi = await getQuizById(id);
            console.log(data.category)
            form.setValues({
                title: quizItem.title,
                description: quizItem.description,
                category: data.category.map(cat => cat.name),
                questions: data.questions
            })

        }

        catch (error) {
            console.error("Błąd przy pobieraniu quizów");
        }
    }
    const fetchCategories = async () => {
        try {
            const cat: categoryData[] = await getCategories();
            const newCategories: string[] = [];
            cat.map(value => {
                newCategories.push(value.name);
            })
            setCategories(newCategories);
        }
        catch (error) {
            console.log("Błąd przy pobieraniu kategorii");
        }
    }
    const handleSubmit = async () => {
        const response = await fetch(`http://localhost:5000/quiz/${id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form.values),
            credentials: 'include'
        });
        navigate('/');

    };

    const handleDelete = async () => {

        deleteQuiz(id).then();
        navigate('/');
    }

    const handleAddQuestion = () => {
        const Questions = form.values.questions;

        const newQuestion = {
            question: "",
            answers: [{ answer: "", isCorrect: false }]
        };

        Questions.push(newQuestion);

        form.setFieldValue("questions", Questions);
    };

    const handleAddAnswer = (questionIndex: number) => {
        const newAnswer = { answer: "", isCorrect: false };
        const updatedQuestions = [...form.values.questions];
        updatedQuestions[questionIndex].answers.push(newAnswer);
        form.setFieldValue("questions", updatedQuestions);
    };

    const handleCheckboxClick = (questionIndex: number, answerIndex: number) => {
        if (!form.values.questions[questionIndex].answers[answerIndex].isCorrect)
            form.values.questions[questionIndex].answers[answerIndex].isCorrect = true;
        else if (form.values.questions[questionIndex].answers[answerIndex].isCorrect)
            form.values.questions[questionIndex].answers[answerIndex].isCorrect = false;

    };

    const handleDeleteAnswer = (questionIndex: number, answerIndex: number) => {
        const updatedQuestions = [...form.values.questions];
        updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
        form.setFieldValue("questions", updatedQuestions);

    };
    const handleDeleteQuestion = (questionIndex: number) => {
        const updatedQuestions = [...form.values.questions];
        updatedQuestions.splice(questionIndex, 1);
        form.setFieldValue("questions", updatedQuestions);
    }


    return (
        <Stack gap="md">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <div style={{ display: "flex", margin: "auto", maxWidth: "1000px", marginBottom: "15px" }}>
                    <TextInput
                        style={{ width: "480px", marginRight: "50px" }}
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
                        style={{ width: "480px", alignContent: "flex-end" }}
                        data={categories.map((value) => (
                            {
                                label: value,
                                value: value,
                            }
                        ))}

                        clearable

                        {...form.getInputProps('category')}
                    />

                </div>
                <Textarea
                    label={"Opis"}
                    placeholder={"Dodaj opis"}
                    style={{ minHeight: "80px", maxWidth: "1000px", margin: "auto" }}
                    {...form.getInputProps('description')}
                />

                {form.values.questions && form.values.questions.map((question, questionIndex) => (
                    <Paper mt={10} key={questionIndex} withBorder={true} shadow="xs"
                        style={{ maxWidth: "1000px", margin: "auto", padding: "16px" }}>
                        <TextInput
                            label={"Pytanie " + (questionIndex + 1)}
                            withAsterisk
                            placeholder="Treść pytania"
                            {...form.getInputProps(`questions.${questionIndex}.question`)}
                            mb={10}
                        />
                        {question.answers && question.answers.map((answer, answerIndex) => (
                            <div className={"check"} key={answerIndex} style={{ marginTop: "5px" }}>

                                <TextInput
                                    className={"answer"}
                                    w={1000}
                                    key={answerIndex}
                                    c={"gray"}
                                    placeholder={"Dodaj odpowiedź"}

                                    {...form.getInputProps(`questions.${questionIndex}.answers.${answerIndex}.answer`)}
                                    mr={5}
                                />
                                <Checkbox m={'auto'} defaultChecked={question.answers[answerIndex].isCorrect}
                                    onChange={() => handleCheckboxClick(questionIndex, answerIndex)}
                                >
                                </Checkbox>
                                <IconX className={"delete-icon"} style={{ margin: "auto" }} onClick={() => handleDeleteAnswer(questionIndex, answerIndex)}></IconX>

                            </div>
                        ))}

                        <div style={{ display: "flex" }}>
                            <Button mr={"20px"}
                                onClick={() => handleAddAnswer(questionIndex)}
                                style={{ width: "20%", marginTop: "10px" }}
                            >
                                Dodaj odpowiedź
                            </Button>
                            <Button
                                onClick={() => handleDeleteQuestion(questionIndex)}
                                style={{ width: "20%", marginTop: "10px" }}
                            >Usuń pytanie</Button>


                        </div>
                    </Paper>
                ))}

                <div style={{ display: "flex", maxWidth: "1000px", margin: "auto", marginTop: "15px" }}>
                    <Button style={{ width: "20%" }} onClick={handleAddQuestion}>Dodaj pytanie</Button>
                    <Button type="submit" style={{ width: "20%", margin: "auto" }}>Zapisz quiz</Button>
                    <Button style={{ width: "20%" }} onClick={handleDelete}>Usuń Quiz</Button>

                </div>
            </form>
        </Stack>
    );
};

export default EditQuiz;
