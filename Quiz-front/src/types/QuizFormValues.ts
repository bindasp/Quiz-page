interface categoryData {
    id: number,
    name: string,
    description: string
}

export type QuizFormValues = {
    id?: string;
    title: string;
    description: string;
    category: string[];
    questions: { question: string, answers: { answer: string, isCorrect: boolean }[] }[];

}

