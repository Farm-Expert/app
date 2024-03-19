import axios from "axios";

const API="https://farm-expert-app-backend-beige.vercel.app/"


export const updateProfile=async (token, name ,mobile,address,kisanid,nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph, profileimg)=>{
    try {
        const headers = {
            "authorization": `Bearer ${token}`
        };
        // console.log("indide api",token, name ,mobile,address,kisanid,nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph);
        const data = await axios.post(API + 'auth/update_info',{name ,mobile,address,kisanid,nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph,profileimg},{headers});
        // console.log("profile curr",data.data);
        if (data.data) {
            return data.data;
        }
        else {
            return null
        }
    }
    catch (error) {
        console.log(error)
    }
}