import {Button, Checkbox, Group, Paper, Radio, Stack, Text, Title} from "@mantine/core";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {QuizCategories} from "../../types/QuizCategories";
import "../styles/Quiz.css";


interface quizData{
    id?:string;
    title: string;
    description:string;
    category: QuizCategories;
    questions: {question:string, answers:{answer:string, isCorrect: boolean}[]}[];
}

const shuffleArray = (array: { answer: string; isCorrect: boolean }[]): { answer: string; isCorrect: boolean }[] => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
};
const Quiz = ()=> {
    const {id} = useParams();
    const [quizData, setQuizData] = useState<quizData | null>(null);
    const [showAnswers, setShowAnswers] = useState<boolean>(false);
    const [points, setPoints] = useState<number>(0);
    const [selected, setSelected] = useState<number[][]>([])
    const [correctAnswers, setCorrectAnswers] = useState<number[][]>([])
    useEffect(() => {
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
                const shuffledData = data.questions.map((question) => ({
                    ...question,
                    answers: shuffleArray(question.answers),
                }));

                setQuizData({...data, questions: shuffledData});
                initializeSelectedAnswers(data.questions);
                initializeCorrectAnswers(shuffledData);
            } else {
                console.error('Błąd podczas pobierania quizu');
            }
        };

        fetchData();

    }, [id]);


    const handleCheckboxChange = (questionIndex: number, answerIndex: number) => {
        setSelected((prevSelected) => {
            const newSelected = [...prevSelected];

            newSelected[questionIndex][answerIndex] = 1;

            console.log(selected);

            return newSelected;
        });
    };

    const handleRadioChange = (questionIndex: number, answerIndex: number) => {
        setSelected((prevSelected) => {
            const newSelected = [...prevSelected];
            for(let i=0; i<newSelected[questionIndex].length;  i++)
            {
                if(i == answerIndex)
                {
                    newSelected[questionIndex][answerIndex] = 1;
                }
                else{
                    newSelected[questionIndex][i]=0;
                }
            }


            console.log(selected);

            return newSelected;
        });
    };


    const initializeSelectedAnswers = ((data: quizData["questions"]) => {
        const initialSelected: number[][] = [];
        for (let i = 0; i < data.length; i++) {
            const questionAnswers: number[] = Array(data[i].answers.length).fill(0);
            initialSelected.push(questionAnswers)
        }
        setSelected(initialSelected);
    });

    const initializeCorrectAnswers = (data: quizData["questions"]) => {
        const newCorrect: number[][] = [];

        for (let i = 0; i < data.length; i++) {
            newCorrect[i] = []
            for (let j = 0; j < data[i].answers.length; j++) {
                if (data[i].answers[j].isCorrect) {
                    newCorrect[i][j] = 1;
                } else {
                    newCorrect[i][j] = 0;
                }
            }
        }
        setCorrectAnswers(newCorrect);
    };

    const calculatePoints = (userAnswers: number[][], correctAnswers: number[][]) => {
        let totalPoints = 0;

        if (userAnswers && correctAnswers) {
            for (let i = 0; i < userAnswers.length; i++) {
                let questionPoints =0;
                let correctCount = correctAnswers[i].reduce((acc, current) => acc + current, 0);
                let incorrectCount = correctAnswers[i].length - correctCount;
                let correctSelected =0;
                let incorrectSelected =0;
                for(let j=0; j<userAnswers[i].length; j++){
                    if(userAnswers[i][j]==correctAnswers[i][j] && correctAnswers[i][j] == 1)
                    {
                        correctSelected++;
                    }
                    if(userAnswers[i][j]!=correctAnswers[i][j] && userAnswers[i][j] == 1)
                    {
                        incorrectSelected++;
                    }
                }

                questionPoints += correctSelected/correctCount;
                questionPoints -= incorrectSelected/incorrectCount;
                console.log(correctCount);
                console.log(incorrectCount);
                if(questionPoints<0)
                    questionPoints=0;
                totalPoints+=questionPoints;
            }
        }

        return totalPoints;
    };


    const handleSubmit = () => {

        if (selected && correctAnswers) {
            const newPoints = calculatePoints(selected, correctAnswers);
            setPoints(newPoints);

            setShowAnswers(true);
        }

    }

        return (
            <div>
                <Stack>
                    <Title m={"auto"}>
                        {quizData?.title}
                    </Title>
                    <Text display={!showAnswers ? "none" : ""} ta={"center"}>Twój wynik
                        to: {points}/{quizData?.questions.length}</Text>
                    {quizData?.questions.map((item, questionIndex) => (

                        <Paper
                            withBorder={true}
                            shadow="xs"
                            style={{width: "60%", marginBottom: "20px", margin: "auto", padding: "16px"}}
                            key={item.question}
                        >
                            <p>{item.question}</p>
                            {correctAnswers[questionIndex].reduce((acc, current) => acc + current, 0)>1 ?
                            <div>
                                {item.answers.map((answer, index) => (
                                    <div>
                                            <Checkbox
                                            label={answer.answer}
                                            className={showAnswers ? (answer.isCorrect) ? "correct" : "incorrect" : ""}
                                            color={showAnswers ? (answer.isCorrect) ? "lime" : "red" : ""}
                                            onChange={() => handleCheckboxChange(questionIndex, index)}

                                        />
                                    </div>
                                ))}

                            </div> :
                                <div>
                                        <Radio.Group>
                                        <Stack>
                                            {item.answers.map((answer, index) => (
                                                <Radio value={answer.answer} label={answer.answer}
                                                onChange={()=>handleRadioChange(questionIndex, index)}
                                                       color={showAnswers ? (answer.isCorrect) ? "lime" : "red" : ""}
                                                />

                                                ))}
                                        </Stack>
                                        </Radio.Group>

                                </div>

                            }

                            <div>
                                <Text ta={"center"} className={"correct-answers"} display={showAnswers ? "" : "none"}>Poprawne
                                    odpowiedzi: {item.answers.filter(answer => answer.isCorrect).map(answer => answer.answer).join(", ")}</Text>
                            </div>

                        </Paper>
                    ))}

                    <Button display={showAnswers ? "none" : ""} style={{width: "60%", margin: "auto"}}
                            onClick={handleSubmit}>Zatwierdź odpowiedzi</Button>
                </Stack>
            </div>
        )
    }
export default Quiz;