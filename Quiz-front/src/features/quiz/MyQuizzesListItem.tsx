import {QuizFormValues} from "../../types/QuizFormValues";
import React, {FC, memo, useEffect, useState} from "react";
import {Card, Image, Text, Tooltip} from "@mantine/core";
import "../styles/Forms.css";
import {useNavigate} from "react-router-dom";
import Quiz from "./Quiz";

interface QuizListItemProps{
    item: QuizFormValues;

}

export const MyQuizzesListItem: FC<QuizListItemProps> = memo(({item})=>{
    const [randomImageUrl, setRandomImageUrl] = useState<string | null>(null);

    const navigate = useNavigate();
    const handleOnClick = async() => {
        if(item.id !== undefined)
            navigate(`/quiz/${item.id}/edit`)

    }


    return(
        <Tooltip
            position="bottom"
            label={item.description}
            bg={'blue'}
            withArrow
            openDelay={400}
        >
            <Card className={'quiz'}  shadow={"sm"} onClick={handleOnClick}
            >
                <Card.Section>
                    <Image
                        src={"https://placehold.co/400x200"}
                        // src={randomImageUrl}
                        h={300}
                        alt={"alt"}
                    />
                </Card.Section>

                <Text key={item.id} fw={500} size={"lg"} mt={"md"}>
                    {item.title}
                </Text>

            </Card>
        </Tooltip>
    );
})