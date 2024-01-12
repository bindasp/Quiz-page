import {API_URL} from "../../config";

type RegisterFormType = {
    login:string;
    email:string;
    password:string;
    confirmpassword:string;
}
export const register = async (data:RegisterFormType)=>{

    const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })

    if (response.status !== 201) throw new Error("Rejestracja się nie powiodła");

}
