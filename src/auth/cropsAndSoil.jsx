import axios from "axios";

const API="farm-expert-app-backend-beige.vercel.app/"



export const submit=async ({nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph})=>{
    const data=await axios.post(API+'recent/submit',{nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph});
    console.log(data.data);
}