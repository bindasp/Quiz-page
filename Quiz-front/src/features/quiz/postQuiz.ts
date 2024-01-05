import {API_URL} from "../../config";
import {QuizFormValues} from "../../types/QuizFormValues";

export const postQuiz= async(quiz:QuizFormValues)=>{
    const response = await fetch(`http://localhost:3333/quiz`,{
        method:'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(quiz),

    });
    console.log(response);

    if(response.status !==200) throw new Error("Przesłanine quizu się nie powiodło");
    return await response.json();

}