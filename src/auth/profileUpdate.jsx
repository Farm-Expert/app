import axios from "axios";

const API="http://myfarmexpert.tech:5050/"


export const updateProfile=async (token, name ,mobile,address,kisanid,nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph)=>{
    try {
        const headers = {
            "authorization": `Bearer ${token}`
        };
        // console.log("indide api",token, name ,mobile,address,kisanid,nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph);
        const data = await axios.post(API + 'auth/update_info',{name ,mobile,address,kisanid,nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph},{headers});
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