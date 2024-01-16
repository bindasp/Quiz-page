import {QuizFormValues} from "../../types/QuizFormValues";
import React, {FC, memo, useEffect} from "react";
import {Card, Image, Text, Tooltip} from "@mantine/core";
import "../styles/Forms.css";
import {useLocation, useNavigate} from "react-router-dom";

interface QuizListItemProps{
    item: QuizFormValues;

}

export const QuizListItem: FC<QuizListItemProps> = memo(({item})=>{
    const location = useLocation();
    const params = location.pathname;

    useEffect(() => {

    }, []);

    const navigate = useNavigate();
    const handleOnClick = async() => {
        if(params==='/quizzes')
        {
            if(item.id !== undefined)
                navigate(`/quiz/${item.id}/edit`, {state:{quizItem: item}})
        }
        else if(params===`/admin`)
        {
            if(item.id !== undefined)
                await handleDelete(item.id);
        }
        else {
            if(item.id !== undefined)
                navigate(`/quiz/${item.id}`, {state:{quizItem: item}})
        }

    }

    const handleDelete = async(id:string)=>{
        const quiz = await fetch(`http://localhost:3333/api/admin/quiz/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials:'include'

        });
        console.log(id);
    };

    return(
        <Tooltip
            position="bottom"
            label={item.description}
            withArrow
            openDelay={400}
        >
        <Card className={'quiz'}   shadow={"sm"} onClick={handleOnClick}
        >
            <Card.Section>
                <Image
                    src={"https://placehold.co/400x200/404040/DDD"}
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