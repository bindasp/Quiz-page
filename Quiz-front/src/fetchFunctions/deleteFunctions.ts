

const API_BASE = process.env.REACT_APP_API_BASE_URL || '/api';

export const deleteQuiz= async(id:string|undefined) =>{
    const response = await fetch(`${API_BASE}/quiz/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

}

export const deleteQuizByAdmin = async(id:string)=>{
    const quiz = await fetch(`${API_BASE}/admin/quiz/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials:'include'

    });

};

export const deleteUser = async(id:number)=>{
    const quiz = await fetch(`${API_BASE}/admin/user/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials:'include'

    });
};