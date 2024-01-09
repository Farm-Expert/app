import axios from "axios";

const API="farm-expert-app-backend-beige.vercel.app/"


export const recentCrop=async ({cropname})=>{
    const data=await axios.post(API+'recent/recent_crop');
    console.log(data.data);
}


