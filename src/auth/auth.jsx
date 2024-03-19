import axios from "axios";

const API="https://farm-expert-app-backend-beige.vercel.app/"


export const signup = async (name, email, mobile, password, address, kisanid ) => {
    try {
        const data = await axios.post(API+'auth/signup', { name, email, mobile, password, address, kisanid });
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

export const login = async (email, password) => {
    
    try {
        const data = await axios.post(API + 'auth/login', { email, password });
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
