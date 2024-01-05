// QuizResult.tsx

import React from "react";
import { Paper, Stack, Title } from "@mantine/core";
import { useLocation, useParams } from "react-router-dom";

interface QuizResultProps {
    // ... (propsy dla QuizResult)
}

const QuizResults: React.FC<QuizResultProps> = (props) => {
    const { id } = useParams();
    const location = useLocation();
    const selectedAnswers = (location.state as any)?.selectedAnswers;

    // ... (kod obsługi wyników quizu na podstawie selectedAnswers)

    return (
        <Stack>
            <Title m={"auto"}>Wyniki quizu {id}</Title>
            {/* ... (kod wyświetlający wyniki quizu) */}
        </Stack>
    );
};

export default QuizResults;