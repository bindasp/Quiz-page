import { List, rem, SimpleGrid, Stack, Table, TableTr, Tabs } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IconList, IconMessageCircle, IconUsers } from "@tabler/icons-react";
import { QuizListItem } from "./QuizListItem";
import { UserItem } from "./UserItem";
import { getAllQuizzes, getUsers } from "../../fetchFunctions/getFunctions";

interface quizData {
    id?: string;
    title: string;
    description: string;
    category: categoryData[];
    questions: { question: string, answers: [{ answer: string, isCorrect: boolean }] }[];
}
interface user {
    id: number;
    login: string;
    email: string;
}
interface categoryData {
    id: number,
    name: string,
    description: string
}
export const Admin = () => {
    const iconStyle = { width: rem(12), height: rem(12) };

    const [data, setData] = useState<quizData[]>([])
    const [userData, setUserData] = useState<user[]>([])
    useEffect(() => {

        const fetchUsers = async () => {
            try {
                const users: user[] = await getUsers();
                setUserData(users);
            }
            catch (error) {
                console.error("Błąd przy pobieraniu użytkowników")
            }
        }
        const fetchData = async () => {
            try {
                const quizData: quizData[] = await getAllQuizzes();
                setData(quizData);
            }
            catch (error) {
                console.error("Błąd przy pobieraniu quizów")
            }
        }

        fetchUsers().then();
        fetchData().then();
    }, [userData]);
    return (
        <Tabs defaultValue="Użytkownicy">
            <Tabs.List mb={15}>
                <Tabs.Tab value="Użytkownicy" leftSection={<IconUsers style={iconStyle} />}>
                    Użytkownicy
                </Tabs.Tab>
                <Tabs.Tab value="Quizy" leftSection={<IconList style={iconStyle} />}>
                    Quizy
                </Tabs.Tab>

            </Tabs.List>

            <Tabs.Panel value="Użytkownicy">
                <Table verticalSpacing={"lg"} highlightOnHover>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Login</Table.Th>
                            <Table.Th>Email</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {userData.map((item) => <UserItem id={item.id} login={item.login} email={item.email}></UserItem>)}
                    </Table.Tbody>
                </Table>
            </Tabs.Panel>

            <Tabs.Panel value="Quizy">
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
                    {data.map((item) => <QuizListItem key={item.id} item={item} />)}
                </SimpleGrid>
            </Tabs.Panel>

        </Tabs>
    );
}