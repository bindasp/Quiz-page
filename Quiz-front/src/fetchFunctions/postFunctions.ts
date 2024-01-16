import {QuizFormValues} from "../types/QuizFormValues";
import {UseFormReturnType} from "@mantine/form/lib";

export const logout = async()=> {

    try {
        const response = await fetch('http://localhost:3333/api/auth/signout', {
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
    const response = fetch(`http://localhost:3333/api/quiz`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form.values),
        credentials: 'include'
    });
}