import axios from "axios";

const API="farm-expert-app-backend-beige.vercel.app/"



export const updateProfile=async ({name ,mobile,address,kisanid})=>{
    const data=await axios.post(API+'auth/update_info',{name ,mobile,address,kisanid});
    console.log(data.data);
}