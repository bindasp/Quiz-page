import {QuizFormValues} from "../types/QuizFormValues";
import {UseFormReturnType} from "@mantine/form/lib";

const API_BASE = process.env.REACT_APP_API_BASE_URL || '/api';

export const logout = async()=> {

    try {
        const response = await fetch(`${API_BASE}/signout`, {
            method: 'POST',
            headers: {
                ContentType: 'application/json',
                Authorization: 'Basic ' + window.btoa(""),
            },
            credentials: 'include'
        })

        if (response.status !== 200) throw new Error("Logowanie się nie powiodło");

    }

    catch (e){
        console.log(e);
    }
}

export const postQuiz = async (form: UseFormReturnType<QuizFormValues>)=> {
    const response = fetch(`${API_BASE}/quiz`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.values),
        credentials: 'include'
    });
}

export const saveQuizAttempt = async (quizId: string | undefined, startTime?: Date, completionTime?: Date) => {
    try {
        const response = await fetch(`${API_BASE}/attempt`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                test_id: quizId,
                start_time: startTime ? startTime.toISOString() : undefined,
                completion_time: completionTime ? completionTime.toISOString() : undefined
            }),
            credentials: 'include'
        });

        if (response.status !== 200) {
            throw new Error("Nie udało się zapisać podejścia do quizu");
        }

        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

export const saveQuizAnswer = async (testId: string | undefined, questionNumber: number, answerNumber: number) => {
    try {
        const response = await fetch(`${API_BASE}/attempt/answers`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                test_id: testId,
                question_number: questionNumber,
                answer_number: answerNumber
            }),
            credentials: 'include'
        });

        if (response.status !== 200) {
            throw new Error("Nie udało się zapisać odpowiedzi");
        }

        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

export const saveMultipleQuizAnswers = async (testId: string | undefined, answers: { question_number: number, answer_number: number }[]) => {
    try {
        const response = await fetch(`${API_BASE}/attempt/answers`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                test_id: testId,
                answers: answers
            }),
            credentials: 'include'
        });

        if (response.status !== 201) {
            throw new Error("Nie udało się zapisać odpowiedzi");
        }

        return await response.json();
    } catch (e) {
        console.log(e);
    }
}

export const saveQuizFeedback = async (quizId: string | undefined, comment: string, rating: number) => {
    try {
        const response = await fetch(`${API_BASE}/feedback`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                test_id: quizId,
                comment: comment,
                rating: rating
            }),
            credentials: 'include'
        });

        if (response.status !== 200) {
            throw new Error("Nie udało się zapisać opinii o quizie");
        }

        return await response.json();
    } catch (e) {
        console.log(e);
    }
}
