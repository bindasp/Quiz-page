import {API_URL} from "../config";

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
}

export const getAttemptById = async (id: number): Promise<AttemptDetailData> => {
    const response = await fetch(`${API_URL}/attempt/${id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    return await response.json();
}

export const getUserAttempts = async (): Promise<AttemptData[]> => {
    const response = await fetch(`${API_URL}/attempt`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    return await response.json();
}

interface FeedbackData {
    user_id: number;
    comment: string;
    rating: number;
    username: string;
}

export const getQuizFeedback = async (quizId: string | undefined): Promise<FeedbackData[]> => {
    const response = await fetch(`${API_URL}/feedback/test/${quizId}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

    const data = await response.json();
    console.log(data);

    // Check if data has a feedback property that is an array
    if (data && data.feedback && Array.isArray(data.feedback)) {
        return data.feedback;
    }

    // Fallback to the old format or return empty array
    return Array.isArray(data) ? data : [];
}

interface QuizRatingData {
    average_rating: number | null;
    ratings_count: number;
    test_id: number;
    test_name: string;
}

interface QuizRatingsResponse {
    tests: QuizRatingData[];
    tests_count: number;
}

export const getQuizRatings = async (): Promise<QuizRatingData[]> => {
    const response = await fetch(`${API_URL}/feedback/ratings`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json() as QuizRatingsResponse;
    return data.tests || [];
}
