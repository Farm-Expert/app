import axios from "axios";

const API="http://myfarmexpert.tech:5050/"


export const signup = async (name, email, mobile, password, address, kisanid ) => {
    console.log("inside API");
    console.log(name, email, mobile, password, address, kisanid);
    try {
        const data = await axios.post(API+'auth/signup', { name, email, mobile, password, address, kisanid });
        console.log(data);
        if (data.data) console.log(data.data);
    } catch (error) {
        console.log(error);
    }

}

export const login = async ({ email, password }) => {
    const data = await axios.post(API + 'auth/login', { email, password });
    console.log(data.data);
}
