import axios from "axios";

const API="farm-expert-app-backend-beige.vercel.app/"



export const updateProfile=async (name ,mobile,address,kisanid,nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph)=>{
    const data=await axios.post(API+'auth/update_info',{name ,mobile,address,kisanid,nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph});
    console.log(data.data);
}