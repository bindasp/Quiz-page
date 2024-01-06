import {Button, Checkbox, List, Menu, Paper, Radio, Stack, ThemeIcon, Title} from "@mantine/core";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {QuizCategories} from "../../types/QuizCategories";
import "../styles/Quiz.css";

interface quizData{
    id?:string;
    title: string;
    description:string;
    category: QuizCategories;
    questions: {question:string, correctAnswers:string[], incorrectAnswers:string[]}[];
}

const Quiz: React.FC=()=>{
    const{id} = useParams();
    const [quizData, setQuizData] = useState<quizData|null>(null);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string,string[]>>({});
    const navigate = useNavigate();
    const [showAnswers, setShowAnswers] = useState<boolean>(false);
    const [correctAnswers, setCorrectAnswers]=useState<string[]>([])
    const [incorrectAnswers, setIncorrectAnswers]=useState<string[]>([])
    useEffect(()=>{
        const fetchData = async()=>{
            const quiz = await fetch(`http://localhost:3333/quiz/${id}`,{
                method:'GET',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },

            });
            if(quiz.ok)
            {
                const data:quizData = await quiz.json();
                setQuizData(data);
                initializeSelectedAnswers(data.questions);
            }
            else{
                console.error('Błąd podczas pobierania quizu');
            }
        };

        const initializeSelectedAnswers = (questions: quizData["questions"]) => {
            const initialAnswers: Record<string, string[]> = {};

            questions.forEach((question) => {
                initialAnswers[question.question] = [];
            });

            setSelectedAnswers(initialAnswers);
        };
        fetchData();


    },[id]);

    const handleCheckboxChange = (question: string, answer:string)=>{
        setSelectedAnswers((prevSelectedAnswers)=> {
            const isSelected = prevSelectedAnswers[question].includes(answer);

            if (isSelected) {

                return {
                    ...prevSelectedAnswers,
                    [question]: prevSelectedAnswers[question].filter((selectedAnswer) => selectedAnswer !== answer),
                };
            } else {

                return {
                    ...prevSelectedAnswers,
                    [question]: [...prevSelectedAnswers[question], answer],
                };

            }
        });

        };

    const handleSubmit = () => {
        const correctAnswers: string[] = [];
        const incorrectAnswers: string[] = [];

        quizData?.questions.forEach((question, questionIndex) => {
            const selected = selectedAnswers[question.question];
            const correct = question.correctAnswers;

            const isCorrect = selected.every((answer) => correct.includes(answer));
            if (isCorrect) {
                correctAnswers.push(`${question.question}-${questionIndex}`);
            } else {
                incorrectAnswers.push(`${question.question}-${questionIndex}`);
            }
        });

        setCorrectAnswers(correctAnswers);
        setIncorrectAnswers(incorrectAnswers);
        console.log(selectedAnswers);
        setShowAnswers(true);
    };

    const isCorrectAnswer = (question:string, answer:string)=> {
        const selected = selectedAnswers[question];
        const correct = quizData?.questions.find(q =>
            q.question === question)?.correctAnswers || [];
        return showAnswers && selected.includes(answer) && correct.includes(answer);
    };

    const isIncorrectAnswer = (question:string, answer:string) => {
        const selected = selectedAnswers[question];
        const correct = quizData?.questions.find(q => q.question === question)?.correctAnswers || [];
        return showAnswers && selected.includes(answer) && !correct.includes(answer);
    };
    return(
        <Stack>
            <Title m={"auto"}>
                {quizData?.title}
            </Title>

            {quizData?.questions.map((item) => (
                <Paper
                    withBorder={true}
                    shadow="xs"
                    style={{ width: "60%", marginBottom: "20px", margin: "auto", padding: "16px" }}
                    key={item.question}
                >
                    <div key={item.question}>
                        <p>{item.question}</p>

                            {item.correctAnswers.map((answer, index) => (
                                <div>

                                    <Checkbox
                                        label={answer} id={`${item.question}-${index}`}
                                        value={answer}
                                        checked={selectedAnswers[item.question].includes(answer)}
                                        onChange={() => handleCheckboxChange(item.question, answer)}
                                        className={(showAnswers && isCorrectAnswer(item.question, answer)) ? "correct" : ""}                                    >
                                    </Checkbox>
                                </div>
                            ))}

                            {item.incorrectAnswers.map((answer, index) => (
                                <div>
                                    <Checkbox
                                        label={answer} id={`${item.question}-${index}`}
                                        value={answer}
                                        checked={selectedAnswers[item.question].includes(answer)}
                                        onChange={() => handleCheckboxChange(item.question, answer)}
                                        className={(showAnswers && isIncorrectAnswer(item.question, answer)) ? "incorrect" : ""}
                                    >
                                    </Checkbox>
                                </div>
                            ))}




                    </div>
                </Paper>
            ))}

            <Button display={showAnswers ? "none" : ""} style={{width:"60%", margin:"auto"}} onClick={handleSubmit}>Zatwierdź odpowiedzi</Button>

        </Stack>
    )
}

export default Quiz;