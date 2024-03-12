import axios from "axios";

const API = "http://myfarmexpert.tech:5050/"


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

export const submitSoil = async (nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph) => {
    try {
        const headers = {
            "authorization": `Bearer ${token}`
        };
        const data = await axios.post(API + 'recent/submit_soil', { nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph },{headers});
        console.log(data.data);
    }
    catch (error) {
        console.log(error)
    }
}

export const submitCrop = async (cropname,nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph) => {
    try {
        const headers = {
            "authorization": `Bearer ${token}`
        };
        const data = await axios.post(API + 'recent/submit_crop', { cropname,nitrogen, phosphorous, potassium, temperature, humidity, rainfall, ph },{headers});
        console.log(data.data);
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