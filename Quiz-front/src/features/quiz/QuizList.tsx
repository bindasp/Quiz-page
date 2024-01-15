import {QuizFormValues} from "../../types/QuizFormValues";
import {QuizListItem} from "./QuizListItem";
import {SimpleGrid} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {QuizCategories} from "../../types/QuizCategories";

interface quizData{
    id?:string;
    title: string;
    description:string;
    category: string[];
    questions: {question:string, answers:[{answer:string, isCorrect: boolean}]}[];
}

export const QuizList = () => {
const [data, setData] = useState<quizData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3333/api/quiz/random?amount=9`, {
                method: 'GET',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            if(response.ok)
            {
                const quizData: quizData[] = await response.json();
                setData(quizData);

            }else{
                console.error("Bład przy pobieraniu quizów")
            }
        }
        fetchData();
    }, );
  return(
      <div style={{width: '100%'}}>
        <SimpleGrid cols={{base:1, sm:2, lg:3}}>
            {data.map((item)=> <QuizListItem   key={item.id} item={item}/>)}
        </SimpleGrid>
      </div>
  );
}