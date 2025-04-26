interface user {
    id: number;
    login: string;
    email: string;
}
interface quizData {
    id?: string;
    title: string;
    description: string;
    category: categoryData[];
    questions: { question: string, answers: [{ answer: string, isCorrect: boolean }] }[];
}
interface categoryData {
    id: number,
    name: string,
    description: string
}
export const getUsers = async (): Promise<user[]> => {
    const response = await fetch(`http://localhost:3333/api/admin/user`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    return await response.json();
}

export const getAllQuizzes = async (): Promise<quizData[]> => {
    const response = await fetch(`http://localhost:3333/api/admin/quiz`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });
    return await response.json();
}

export const getQuizById = async (id: string | undefined): Promise<quizData> => {
    const response = await fetch(`http://localhost:5000/quiz/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

    });
    return await response.json();
}

export const getCategories = async (): Promise<categoryData[]> => {
    const response = await fetch(`http://localhost:5000/category`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },

    })
    return await response.json();
}
export const getUserQuizzes = async (): Promise<quizData[]> => {
    const response = await fetch(`http://localhost:5000/quiz`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    return await response.json();
}

export const getQuizzes = async (endpoint: string): Promise<quizData[]> => {
    const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
}
