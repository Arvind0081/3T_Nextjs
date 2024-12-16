'use server'
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers'; 


const User= ()=>{
  const cookieStore = cookies();
  const cookieValue = cookieStore.get('user')?.value;
  let jsonObject;
  if (cookieValue) {
  
    const decodedValue = decodeURIComponent(cookieValue);
    jsonObject = JSON.parse(decodedValue);
    const token = jwtDecode(jsonObject.token);
     return token;
  }  
     return null; 
  };

  export default User;

  export const token= ()=>{
   const cookieStore =  cookies();
   const cookieValue = cookieStore.get('user')?.value;
   let jsonObject;
   if (cookieValue) {

     const decodedValue = decodeURIComponent(cookieValue);
     jsonObject = JSON.parse(decodedValue);
     const token =  jsonObject.token;
      return token;
   }  
      return null; 
  }
  
 