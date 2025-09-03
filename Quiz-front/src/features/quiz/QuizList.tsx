import { QuizListItem } from "./QuizListItem";
import { SimpleGrid } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getQuizzes } from "../../fetchFunctions/getFunctions";

const API_BASE = process.env.REACT_APP_API_BASE_URL || '/api';

interface categoryData {
    id: number,
    name: string,
    description: string
}

interface quizData {
    id?: string;
    title: string;
    description: string;
    category: categoryData[];
    questions: { 
        question: string, 
        question_number: number,
        answers: { 
            answer: string, 
            isCorrect: boolean,
            answer_number: number 
        }[] 
    }[];
}

export const QuizList = () => {
    const [data, setData] = useState<quizData[]>([])

    const location = useLocation();
    const params = location.search;

    useEffect(() => {

        fetchData().then();
    }, []);
    const fetchData = async () => {

        const endpoint = params != ''
            ? `${API_BASE}/quiz/random?amount=20&${params.slice(1)}`
            : `${API_BASE}/quiz/random?amount=20`;

        const quizData: quizData[] = await getQuizzes(endpoint);
        setData(quizData);

    }
    console.log(data)
    return (
        <div style={{ width: '100%' }}>
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
                {data.map((item) => <QuizListItem key={item.id} item={item} />)}
            </SimpleGrid>
        </div>
    );
}
