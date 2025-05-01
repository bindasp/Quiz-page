import { QuizFormValues } from "../../types/QuizFormValues";
import React, { FC, memo, useState, useEffect } from "react";
import { Card, Image, Text, Tooltip, Button, Group, Badge } from "@mantine/core";
import { IconMessage, IconStar } from '@tabler/icons-react';
import "../styles/Forms.css";
import "../styles/Quiz.css";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteQuizByAdmin } from "../../fetchFunctions/deleteFunctions";
import { CommentModal } from "./CommentModal";
import { getQuizRatings } from "../../fetchFunctions/getFunctions";

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
    questions: { question: string, answers: [{ answer: string, isCorrect: boolean }] }[];
}

interface QuizListItemProps {
    item: quizData;

}

export const QuizListItem: FC<QuizListItemProps> = memo(({ item }) => {
    const location = useLocation();
    const params = location.pathname;
    const [commentModalOpened, setCommentModalOpened] = useState(false);
    const [quizRating, setQuizRating] = useState<{ average_rating: number | null, ratings_count: number } | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                const ratings = await getQuizRatings();
                const rating = ratings.find(r => r.test_id.toString() === item.id);
                if (rating) {
                    setQuizRating({
                        average_rating: rating.average_rating,
                        ratings_count: rating.ratings_count
                    });
                }
            } catch (error) {
                console.error('Error fetching ratings:', error);
            }
        };

        fetchRatings();
    }, [item.id]);
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

                    {quizRating && (
                        <Group mt="xs">
                            <Badge 
                                color={quizRating.average_rating ? "yellow" : "gray"} 
                                leftSection={<IconStar size={14} />}
                                size="lg"
                            >
                                {quizRating.average_rating ? `${quizRating.average_rating.toFixed(1)}/5` : "Brak ocen"}
                            </Badge>
                            <Text size="sm" color="dimmed">
                                ({quizRating.ratings_count} {quizRating.ratings_count === 1 ? "ocena" : 
                                 quizRating.ratings_count > 1 && quizRating.ratings_count < 5 ? "oceny" : "ocen"})
                            </Text>
                        </Group>
                    )}

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
