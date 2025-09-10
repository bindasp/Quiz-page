const API_BASE = process.env.REACT_APP_API_BASE_URL || '/api';

type RegisterFormType = {
  login: string;
  email: string;
  password: string;
  confirmpassword: string;
};
export const register = async (data: RegisterFormType) => {
  const response = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (response.status !== 201) throw new Error('Rejestracja się nie powiodła');
};
