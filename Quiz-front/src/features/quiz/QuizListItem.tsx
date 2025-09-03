import { QuizFormValues } from "../../types/QuizFormValues";
import React, { FC, memo, useState } from "react";
import { Card, Image, Text, Tooltip, Button, Group } from "@mantine/core";
import { IconMessage } from '@tabler/icons-react';
import "../styles/Forms.css";
import "../styles/Quiz.css";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteQuizByAdmin } from "../../fetchFunctions/deleteFunctions";
import { CommentModal } from "./CommentModal";

interface categoryData {
    id: number,
    name: string,
    description: string
}

interface quizData {
    id?: string;
    title: string;
    description: string;
    category: categoryData[];
    questions: { 
        question: string, 
        question_number: number,
        answers: { 
            answer: string, 
            isCorrect: boolean,
            answer_number: number 
        }[] 
    }[];
}

interface QuizListItemProps {
    item: quizData;

}

export const QuizListItem: FC<QuizListItemProps> = memo(({ item }) => {
    const location = useLocation();
    const params = location.pathname;
    const [commentModalOpened, setCommentModalOpened] = useState(false);

    const navigate = useNavigate();
    const handleOnClick = async () => {
        if (params === '/quizzes') {
            if (item.id !== undefined)
                navigate(`/quiz/${item.id}/edit`, { state: { quizItem: item } })
        }
        else if (params === `/admin`) {
            if (item.id !== undefined)
                await handleDelete(item.id);
        }
        else {
            if (item.id !== undefined)
                navigate(`/quiz/${item.id}`, { state: { quizItem: item } })
        }
    }

    const handleDelete = async (id: string) => {
        deleteQuizByAdmin(id).then();
    };

    const openCommentModal = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click event
        setCommentModalOpened(true);
    };

    return (
        <>
            <Tooltip
                position="bottom"
                label={item.description}
                withArrow
                openDelay={400}
            >
                <Card className={'quiz'} shadow={"sm"} onClick={handleOnClick}>
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

                    <Group justify="flex-end" mt="md">
                        <Button 
                            variant="subtle" 
                            size="xs" 
                            leftSection={<IconMessage size={16} />}
                            onClick={openCommentModal}
                            className="comment-button"
                        >
                            Komentarze
                        </Button>
                    </Group>
                </Card>
            </Tooltip>

            <CommentModal 
                quizId={item.id} 
                opened={commentModalOpened} 
                onClose={() => setCommentModalOpened(false)} 
            />
        </>
    );
})
