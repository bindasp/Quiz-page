import {QuizFormValues} from "../../types/QuizFormValues";
import {QuizListItem} from "./QuizListItem";
import {SimpleGrid} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {QuizCategories} from "../../types/QuizCategories";
import {useParams} from "react-router-dom";

interface quizData{
    id?:string;
    title: string;
    description:string;
    category: string[];
    questions: {question:string, answers:[{answer:string, isCorrect: boolean}]}[];
}

export const QuizList = () => {
const [data, setData] = useState<quizData[]>([])
const {category} = useParams()
    useEffect(() => {
        const fetchData = async () => {

            const urlSearchParams = new URLSearchParams(window.location.search);
            const categoryParam = urlSearchParams.get('category');
            const endpoint = categoryParam
                ? `http://localhost:3333/api/quiz/random?amount=9&category=${categoryParam}`
               : `http://localhost:3333/api/quiz/random?amount=9`;

            const response = await fetch(endpoint, {
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
    }, [window.location.search, setData]);
  return(
      <div style={{width: '100%'}}>
        <SimpleGrid cols={{base:1, sm:2, lg:3}}>
            {data.map((item)=> <QuizListItem   key={item.id} item={item}/>)}
        </SimpleGrid>
      </div>
  );
}