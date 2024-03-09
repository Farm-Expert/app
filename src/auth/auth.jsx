import axios from "axios";

const API="http://myfarmexpert.tech:5050/"


export const signup=async ({name,email,mobile,password,address,kisanid})=>{
    const data=await axios.post(API+'auth/signup',{name,email,mobile,password,address,kisanid});
    console.log(data.data);
}

export const login=async ({email,password})=>{
    const data=await axios.post(API+'auth/signup',{email,password});
    console.log(data.data);
}