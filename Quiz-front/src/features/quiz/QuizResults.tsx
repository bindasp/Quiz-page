import React from "react";
import { Paper, Stack, Title } from "@mantine/core";
import { useLocation, useParams } from "react-router-dom";

interface QuizResultProps {

}

const QuizResults: React.FC<QuizResultProps> = (props) => {
    const { id } = useParams();


    return (
        <Stack>
            <Title m={"auto"}>Wyniki quizu {id}</Title>

        </Stack>
    );
};

export default QuizResults;