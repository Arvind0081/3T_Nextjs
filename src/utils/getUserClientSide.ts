'use client'
import { getCookie } from 'cookies-next';
import { jwtDecode } from 'jwt-decode';

const User=()=>{
    const user= getCookie('user');
    if(user){
    let userData=JSON.parse(user)
     const token = jwtDecode(userData.token);
     return token;
    }
    return null;
   };

   export default User;

   export const token=()=>{
    const user= getCookie('user');
    if(user){
    let userData=JSON.parse(user)
     const token = userData.token;
     return token;
    }
    return null;
   };