import {API_URL} from "../../config";

export const login = async(login:string, password:string)=>{
    const response = await fetch(`$http://localhost:3333/auth/login`,{
        method:'POST',
        headers:{
            ContentType: 'application/json',
            Authorization: 'Basic ' + window.btoa(login + ":" + password),
        },
        credentials:'include'
    });

    if(response.status !==200) throw new Error("Logowanie się nie powiodło");
    return await response.json();

}