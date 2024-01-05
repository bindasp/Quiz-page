import {Button, Checkbox, List, Paper, Radio, Stack, ThemeIcon, Title} from "@mantine/core";
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

    const handleSubmit = ()=>{
        quizData?.questions.forEach((question)=>{
            const selected = selectedAnswers[question.question];
            const correct = question.correctAnswers;
            const incorrect = question.incorrectAnswers;

            const correctSelected = selected.filter((answer)=>correct.includes(answer));
            const incorrectSelected = selected.filter((answer) => incorrect.includes(answer));

            console.log(`Pytanie: ${question.question}`);
            console.log(`Poprawne odpowiedzi: ${correct}`);
            console.log(`Zaznaczone poprawne odpowiedzi: ${correctSelected}`);
            console.log(`Niepoprawne odpowiedzi: ${incorrect}`);
            console.log(`Zaznaczone niepoprawne odpowiedzi: ${incorrectSelected}`);

            navigate(`/quiz/$${id}/results`)

        });

    }


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
                                    >
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
                                    >
                                    </Checkbox>
                                </div>
                            ))}

                    </div>
                </Paper>
            ))}
            <Button style={{width:"60%", margin:"auto"}} onClick={handleSubmit}>Zatwierdź odpowiedzi</Button>
        </Stack>
    )
}

export default Quiz;