import axios from 'axios';
import Cookies from 'js-cookie';

export const registerUser = async (userData: { name: string; lastName: string; email: string; password: string; role:string }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', userData, {
    
    });
   
    return response.data;
   
  } catch (error) {
    console.error('Error register');
    throw error;
  }
};

export const loginUser = async (userData: { email: string; password: string; }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', userData, {
     
    });

    const { token, user } = response.data;
    console.log(token);
    // Token'ı bir çerezde saklıyoruz
    Cookies.set('authToken', token, { expires: 7, sameSite: 'Lax', secure: false });// 7 gün boyunca geçerli olacak

    console.log('Login successful, token stored in cookies:', token);
    return { token, user };
  } catch (error) {
    console.error('Error logging in user');
    throw error;
  }
};
