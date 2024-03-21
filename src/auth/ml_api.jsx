import axios from 'axios'

export const pricePredict = async (CropName, Location)=>{
    try {
        const data = await axios.post('https://diseases-and-price-prid.onrender.com/priceprediction', {CropName, Location})
        if (data.data) {
            data.data.Success = data.data.Success.substring(7, data.data.Success.length-3)
            const parseData = JSON.parse(data.data.Success);
            console.log("price backend",parseData);
            return parseData;
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

export const diseasePredict = async (imgurl)=>{
    try {
        const data = await axios.post('https://diseases-and-price-prid.onrender.com/vision', {imgurl})
        if (data.data) {
            data.data.Success = data.data.Success.substring(8, data.data.Success.length-3)
            const parseData = JSON.parse(data.data.Success);
            console.log("disease backend",parseData);
            return parseData;
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

export const soilPredict = async (N, P, K, temperature, humidity, ph, rainfall, label)=>{
    try {
        console.log("back", N);
        const data = await axios.post('https://crop-ai-backend.onrender.com/predict_soil', {N, P, K, temperature, humidity, ph, rainfall, label})
        console.log("backkk",data);
        if (data.data) {
            console.log("backend soil",data.data);
            return data.data;
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

export const cropPredict = async (N, P, K, temperature, humidity, ph, rainfall)=>{
    try {
        const data = await axios.post('https://crop-ai-backend.onrender.com/predict_crop', {N, P, K, temperature, humidity, ph, rainfall})
        if (data.data) {
            console.log("backend crop",data.data);
            return data.data;
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}