import {QuizListItem} from "./QuizListItem";
import {SimpleGrid, Title} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {getUserQuizzes} from "../../fetchFunctions/getFunctions";

interface quizData{
    id?:string;
    title: string;
    description:string;
    category: string[];
    questions: {question:string, answers:[{answer:string, isCorrect: boolean}]}[];
}

export const MyQuizzes = () => {
    const [data, setData] = useState<quizData[]>([])

    useEffect(() => {

        fetchData().then();
    }, []);
    const fetchData = async () => {
        try{
            const quizData: quizData[] = await getUserQuizzes();
            setData(quizData);
        }
        catch(error){
            console.log("Błąd przy pobieraniu quizów")
        }
    }
    return(
        <div style={{width: '100%'}}>
            <Title c={"emerald-green.7"} m={"auto"} size={75}>Moje quizy</Title>
            <SimpleGrid cols={{base:1, sm:2, lg:3}}>
                {data.map((item)=> <QuizListItem key={item.id} item={item}/>)}
            </SimpleGrid>
        </div>
    );
}