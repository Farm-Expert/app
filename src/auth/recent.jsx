import axios from "axios";

const API="http://myfarmexpert.tech:5050/"


export const recentCrop=async (token)=>{
    try {
        const headers = {
            "authorization":`Bearer ${token}`
        };
        const data = await axios.get(API + 'recent/recent_crop', { headers });
        if (data.data){
            return data.data;
        }
        else{
            return null
        }
    } catch (error) {
        console.log(error);
    }
}

export const add_recentCrop=async (token,cropname)=>{
    try {
        const headers = {
            "authorization":`Bearer ${token}`
        };
        const data = await axios.post(API + 'recent/store_crop_name', {cropname}, { headers });
        if (data.data){
            return data.data.data;
        }
        else{
            return null
        }
    } catch (error) {
        console.log(error);
    }
}


