import axios from "axios";

const API="http://13.127.182.217:5050/"

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
