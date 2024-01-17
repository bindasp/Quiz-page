import {API_URL} from "../config";

export const deleteQuiz= async(id:string|undefined) =>{
    const response = await fetch(`${API_URL}/quiz/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

}

export const deleteQuizByAdmin = async(id:string)=>{
    const quiz = await fetch(`${API_URL}/admin/quiz/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials:'include'

    });

};

export const deleteUser = async(id:number)=>{
    const quiz = await fetch(`${API_URL}/admin/user/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials:'include'

    });
};