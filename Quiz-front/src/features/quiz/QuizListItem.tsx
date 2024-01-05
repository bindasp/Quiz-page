import {QuizFormValues} from "../../types/QuizFormValues";
import React, {FC, memo, useState} from "react";
import {Card, Image, Text} from "@mantine/core";
import "../styles/Forms.css";
import {useNavigate} from "react-router-dom";
import Quiz from "./Quiz";

interface QuizListItemProps{
    item: QuizFormValues;

}

export const QuizListItem: FC<QuizListItemProps> = memo(({item})=>{

    const navigate = useNavigate();
    const handleOnClick = async() => {
        if(item.id !== undefined)
            navigate(`/quiz/${item.id}`)

    }


    return(

        <Card className={'quiz'}  c={"white"} bg={"blue"} shadow={"sm"} onClick={handleOnClick}
        >
            <Card.Section>
                <Image
                    src={"https://placehold.co/400x200"}
                    h={300}
                    alt={"alt"}
                />
            </Card.Section>

            <Text key={item.id} fw={500} size={"lg"} mt={"md"}>
                {item.title}
            </Text>

        </Card>
    );
})