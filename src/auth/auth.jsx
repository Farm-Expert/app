import axios from "axios";

const API="farm-expert-app-backend-beige.vercel.app/"


export const signup=async ({name,email,mobile,password,address,kisanid})=>{
    const data=await axios.post(API+'auth/signup',{name,email,mobile,password,address,kisanid});
    console.log(data.data);
}

export const login=async ({email,password})=>{
    const data=await axios.post(API+'auth/login',{email,password});
    console.log(data.data);
}
