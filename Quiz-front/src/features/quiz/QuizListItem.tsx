import {QuizFormValues} from "../../types/QuizFormValues";
import React, {FC, memo} from "react";
import {Card, Image, Text} from "@mantine/core";
import "../styles/Forms.css";
interface QuizListItemProps{
    item: QuizFormValues;
}

export const QuizListItem: FC<QuizListItemProps> = memo(({item})=>{
    return(
        <Card className={"quiz"} c={"white"} bg={"blue"} shadow={"sm"}>
            <Card.Section>
                <Image
                    src={"https://placehold.co/400x200"}
                    h={300}
                    alt={"alt"}
                />
            </Card.Section>

            <Text fw={500} size={"lg"} mt={"md"}>
                {item.title}
            </Text>

        </Card>
    );
})