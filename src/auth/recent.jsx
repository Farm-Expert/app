import axios from "axios";

const API = "https://farm-expert-app-backend-beige.vercel.app/"


export const recentCrop = async (token) => {
    try {
        const headers = {
            "authorization": `Bearer ${token}`
        };
        const data = await axios.get(API + 'recent/fetch_crop', { headers });
        if (data.data) {
            return data.data;
        }
        else {
            return null
        }
    } catch (error) {
        console.log(error);
    }
}

export const add_recentCrop = async (token, cropname) => {
    try {
        const headers = {
            "authorization": `Bearer ${token}`
        };
        const data = await axios.post(API + 'recent/store_crop', { cropname }, { headers });
        if (data.data) {
            return data.data.data;
        }
        else {
            return null
        }
    } catch (error) {
        console.log(error);
    }
}

export const submitSoil = async (token, nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph) => {
    try {
        const headers = {
            "authorization": `Bearer ${token}`
        };
        const data = await axios.post(API + 'recent/submit_soil', { nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph },{headers});
        console.log("api",data.data);
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

export const submitCrop = async (token, cropname ,nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph) => {
    try {
        const headers = {
            "authorization": `Bearer ${token}`
        };
        const data = await axios.post(API + 'recent/submit_crop', { cropname,nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph },{headers});
        // console.log("from backed",data);
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


export const recentCropForm = async (token) => {
    try {
        const headers = {
            "authorization": `Bearer ${token}`
        };
        const data = await axios.get(API + 'recent/recent_crop', { headers });
        if (data.data) {
            return data.data;
        }
        else {
            return null
        }
    } catch (error) {
        console.log(error);
    }
}

export const recentSoilForm = async (token) => {
    try {
        const headers = {
            "authorization": `Bearer ${token}`
        };
        const data = await axios.get(API + 'recent/recent_soil', { headers });
        console.log("inside api",data.data);
        const arr=data.data.recentSearch
        console.log("type", typeof arr);
        if (arr && Array.isArray(arr) && arr.length > 0) {
            console.log("final", arr[arr.length - 1]);
            return arr[arr.length - 1]; 
        }
        else {
            console.log("failed");
            return null
        }
    } catch (error) {
        console.log(error);
    }
}

export const search_crop=async (cropname)=>{
    try {
        const data = await axios.post("https://search-crop.onrender.com/search_crop", { search: cropname });
        if (data.data.status=="success") {
            return data.data;
        }
        else {
            return null
        }
    } catch (error) {
        console.log(error);
    }
}

export const chat_agro=async (message)=>{
    try {
        const data = await axios.post("https://search-crop.onrender.com/chat", { message: message });
        if (data.data.res) {
            data.data.res=data.data.res.replace(/\*/g, '');
            data.data.res=data.data.res.replace(/Sure, .* :/, ' ');
            return data.data.res;
        }
        else {
            return null
        }
    } catch (error) {
        console.log(error);
    }
}