import { API_URL } from "../../config";

export const login = async (login: string, password: string) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
        credentials: 'include'
    });
    if (response.status !== 200) throw new Error("Logowanie się nie powiodło");

}
