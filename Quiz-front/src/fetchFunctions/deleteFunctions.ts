export const deleteQuiz= async(id:string|undefined) =>{
    const response = await fetch(`http://localhost:3333/api/quiz/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });

}

export const deleteQuizByAdmin = async(id:string)=>{
    const quiz = await fetch(`http://localhost:3333/api/admin/quiz/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials:'include'

    });

};

export const deleteUser = async(id:number)=>{
    const quiz = await fetch(`http://localhost:3333/api/admin/user/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        credentials:'include'

    });
};