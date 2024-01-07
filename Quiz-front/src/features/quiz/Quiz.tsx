import {Button, Checkbox,Text, List, Menu, Paper, Radio, Stack, ThemeIcon, Title} from "@mantine/core";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {QuizCategories} from "../../types/QuizCategories";
import "../styles/Quiz.css";
import Label = Menu.Label;

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
    const [points, setPoints] = useState<number>(0);
    const [cPoints, setCPoints] = useState<number[]>([]);
    useEffect(()=>{
        const fetchData = async()=>{
            const quiz = await fetch(`http://localhost:3333/api/quiz/${id}`,{
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
                const shuffledIncorrectAnswers = shuffleArray(question.incorrectAnswers);
                initialAnswers[question.question] = [];
            });
            setSelectedAnswers(initialAnswers);
        };
        function shuffleArray<T>(array: T[]): T[] {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

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
        const newCPoints:number[] = [];

        quizData?.questions.forEach((question, questionIndex) => {
            const correctAnswers: string[] = [];
            const incorrectAnswers: string[] = [];
            let currentPoints = 0;

            const selected = selectedAnswers[question.question];
            const correct = question.correctAnswers;
            const incorrect = question.incorrectAnswers;
            selected.forEach((answer)=> {
                if(correct.includes(answer)){
                    correctAnswers.push(answer);
                }
                if(incorrect.includes(answer)){
                    incorrectAnswers.push(answer);
                    currentPoints -= 0.25;

                }

            })
            currentPoints+= correctAnswers.length/correct.length;
            console.log(points);
            if(currentPoints<0) currentPoints=0;
            setPoints((prevPoints) => prevPoints + currentPoints);
        });

        setCorrectAnswers(correctAnswers);
        setIncorrectAnswers(incorrectAnswers);
        setShowAnswers(true);



    };

    const isCorrectAnswer = (question: string, answer: string) => {
        const selected = selectedAnswers[question];
        const correct = quizData?.questions.find((q) => q.question === question)?.correctAnswers || [];

        return showAnswers && selected.includes(answer) && correct.includes(answer);
    };

    const isIncorrectAnswer = (question: string, answer: string) => {
        const selected = selectedAnswers[question];
        const correct = quizData?.questions.find((q) => q.question === question)?.correctAnswers || [];
        return showAnswers && selected.includes(answer) && !correct.includes(answer);
    };



    return(
        <Stack>
            <Title m={"auto"}>
                {quizData?.title}
            </Title>
            <Text display={!showAnswers ? "none" : ""} ta={"center"}>Twój wynik to: {points}/{quizData?.questions.length}</Text>
            {quizData?.questions.map((item, questionIndex) => (
                <Paper
                    withBorder={true}
                    shadow="xs"
                    style={{ width: "60%", marginBottom: "20px", margin: "auto", padding: "16px" }}
                    key={item.question}
                >
                    <div key={item.question}>
                        <p>{item.question}</p>

                            {(item.correctAnswers.concat(item.incorrectAnswers)).map((answer, index) => (

                                <div>
                                    <Checkbox
                                        key={`${item.question}-${index}`}
                                        label={answer}
                                        id={`${item.question}-${index}`}
                                        value={answer}
                                        checked={selectedAnswers[item.question].includes(answer)}
                                        onChange={() =>  handleCheckboxChange(item.question, answer) }
                                        className={(isCorrectAnswer(item.question, answer)) ? "correct" : (isIncorrectAnswer(item.question, answer)) ? "incorrect" : ""}
                                        color = {(isCorrectAnswer(item.question, answer)) ? "lime" : (isIncorrectAnswer(item.question, answer)) ? "red" : ""}

                                    />
                                </div>
                            ))}

                    </div>

                    <div>
                        <Text ta={"center"} className={"correct-answers"}  display={showAnswers ? "" : "none"}>Poprawne odpowiedzi: {item.correctAnswers.join(', ')}</Text>
                    </div>

                </Paper>
            ))}

            <Button display={showAnswers ? "none" : ""} style={{width:"60%", margin:"auto"}} onClick={handleSubmit}>Zatwierdź odpowiedzi</Button>
        </Stack>
    )
}

export default Quiz;