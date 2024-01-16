import {rem, SimpleGrid, Tabs, Title} from "@mantine/core";
import React, {useEffect, useState} from "react";
import {MyQuizzesListItem} from "./MyQuizzesListItem";
import {IconMessageCircle, IconPhoto, IconSettings} from "@tabler/icons-react";
import {QuizListItem} from "./QuizListItem";

interface quizData{
    id?:string;
    title: string;
    description:string;
    category: string[];
    questions: {question:string, answers:[{answer:string, isCorrect: boolean}]}[];
}

export const Admin = () => {
    const iconStyle = { width: rem(12), height: rem(12) };

    const [data, setData] = useState<quizData[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:3333/api/quiz/random?amount=9`, {
                method: 'GET',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                credentials:'include'
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
    }, []);
    return (
        <Tabs defaultValue="Użytkownicy">
            <Tabs.List>
                <Tabs.Tab value="Użytkownicy" leftSection={<IconPhoto style={iconStyle} />}>
                    Użytkownicy
                </Tabs.Tab>
                <Tabs.Tab value="Quizy" leftSection={<IconMessageCircle style={iconStyle} />}>
                    Quizy
                </Tabs.Tab>

            </Tabs.List>

            <Tabs.Panel value="Użytkownicy">
                Użytkownicy
            </Tabs.Panel>

            <Tabs.Panel value="Quizy">
                <SimpleGrid cols={{base:1, sm:2, lg:3}}>
                    {data.map((item)=> <QuizListItem key={item.id} item={item}/>)}
                </SimpleGrid>
            </Tabs.Panel>

        </Tabs>
    );
}