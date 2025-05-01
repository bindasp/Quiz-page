import { SimpleGrid, Title, Button, Modal, Badge, Text, Group, Paper } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getUserAttempts, getAttemptById } from "../../fetchFunctions/getFunctions";

interface AttemptData {
    user_id: number;
    test_id: number;
    start_time: string;
    completion_time: string;
    test_name: string;
    test_description: string;
}

interface AttemptAnswer {
    answer_content: string;
    answer_number: number;
    is_correct: boolean;
    question_content: string;
    question_number: number;
}

interface AttemptDetailData {
    answers: AttemptAnswer[];
    completed: boolean;
    completion_time: string | null;
    start_time: string;
    test_id: number;
    test_name: string;
    user_id: number;
    score: number;
}

export const MyAttempts = () => {
    const [attempts, setAttempts] = useState<AttemptData[]>([]);
    const [selectedAttempt, setSelectedAttempt] = useState<AttemptDetailData | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAttempts().then();
    }, []);

    const fetchAttempts = async () => {
        try {
            const attemptData: AttemptData[] = await getUserAttempts();
            setAttempts(attemptData);
        }
        catch (error) {
            console.log("Błąd przy pobieraniu podejść do quizów");
        }
    }

    const handleAttemptClick = async (testId: number) => {
        try {
            setLoading(true);
            const attemptDetail = await getAttemptById(testId);
            setSelectedAttempt(attemptDetail);
            setModalOpen(true);
        } catch (error) {
            console.log("Błąd przy pobieraniu szczegółów podejścia", error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div style={{ width: '100%' }}>
            <Title c={"emerald-green.7"} m={"auto"} size={75}>Moje podejścia do quizów</Title>
            {attempts.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <p>Nie masz jeszcze żadnych podejść do quizów.</p>
                </div>
            ) : (
                <SimpleGrid cols={{ base: 1, sm: 1, lg: 1 }} style={{ padding: '20px' }}>
                    {attempts.map((attempt, index) => (
                        <div 
                            key={index} 
                            style={{ 
                                padding: '20px', 
                                borderRadius: '8px', 
                                backgroundColor: 'rgba(66, 196, 110, 0.1)',
                                marginBottom: '10px',
                                cursor: 'pointer'
                            }}
                            onClick={() => handleAttemptClick(attempt.test_id)}
                        >
                            <h2>{attempt.test_name}</h2>
                            <p>{attempt.test_description}</p>
                            <p>Data rozpoczęcia: {new Date(attempt.start_time).toLocaleString()}</p>
                            <p>Data zakończenia: {attempt.completion_time ? new Date(attempt.completion_time).toLocaleString() : 'Nie ukończono'}</p>
                            <Button size="sm" color="emerald-green">Zobacz szczegóły</Button>
                        </div>
                    ))}
                </SimpleGrid>
            )}

            <Modal
                opened={modalOpen}
                onClose={() => setModalOpen(false)}
                title={<Title order={3}>{selectedAttempt?.test_name} - Szczegóły podejścia</Title>}
                size="lg"
            >
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <Text>Ładowanie szczegółów...</Text>
                    </div>
                ) : selectedAttempt ? (
                    <div>
                        <Group justify="space-between" mb="md">
                            <div>
                                <Text fw={500}>Data rozpoczęcia:</Text>
                                <Text>{new Date(selectedAttempt.start_time).toLocaleString()}</Text>
                            </div>
                            <div>
                                <Text fw={500}>Data zakończenia:</Text>
                                <Text>
                                    {selectedAttempt.completion_time 
                                        ? new Date(selectedAttempt.completion_time).toLocaleString() 
                                        : 'Nie ukończono'}
                                </Text>
                            </div>
                            <div>
                                <Text fw={500}>Wynik:</Text>
                                <Badge size="lg" color={Number(selectedAttempt.score) === Array.from(new Set(selectedAttempt.answers.map(a => a.question_number))).length ? "green" : "yellow"}>
                                    {Number.isInteger(Number(selectedAttempt.score)) ? Math.floor(Number(selectedAttempt.score)) : Number(selectedAttempt.score).toFixed(1)}/{Array.from(new Set(selectedAttempt.answers.map(a => a.question_number))).length}
                                </Badge>
                            </div>
                        </Group>

                        <Title order={4} mt="xl" mb="md">Odpowiedzi:</Title>

                        {Array.from(new Set(selectedAttempt.answers.map(a => a.question_number)))
                            .sort((a, b) => a - b)
                            .map(questionNumber => {
                                const questionAnswers = selectedAttempt.answers.filter(a => a.question_number === questionNumber);
                                const questionContent = questionAnswers[0].question_content;

                                return (
                                    <Paper key={questionNumber} p="md" mb="md" withBorder>
                                        <Text fw={700} mb="xs">Pytanie {questionNumber}: {questionContent}</Text>

                                        {questionAnswers.map(answer => (
                                            <div 
                                                key={answer.answer_number}
                                                style={{ 
                                                    padding: '8px', 
                                                    marginBottom: '5px',
                                                    backgroundColor: answer.is_correct ? 'rgba(66, 196, 110, 0.1)' : 'rgba(255, 99, 71, 0.1)',
                                                    borderRadius: '4px',
                                                    display: 'flex',
                                                    justifyContent: 'space-between'
                                                }}
                                            >
                                                <Text>{answer.answer_content}</Text>
                                                <Badge color={answer.is_correct ? "green" : "red"}>
                                                    {answer.is_correct ? "Poprawna" : "Niepoprawna"}
                                                </Badge>
                                            </div>
                                        ))}
                                    </Paper>
                                );
                            })}
                    </div>
                ) : (
                    <Text>Nie udało się załadować szczegółów podejścia.</Text>
                )}
            </Modal>
        </div>
    );
}
