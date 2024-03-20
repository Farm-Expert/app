import axios from 'axios'

export const pricePredict = async (CropName, Location)=>{
    try {
        const data = await axios.post('https://diseases-and-price-prid.onrender.com/priceprediction', {CropName, Location})
        if (data.data) {
            data.data.Success = data.data.Success.substring(7, data.data.Success.length-3)
            const parseData = JSON.parse(data.data.Success);
            console.log("price backend",parseData);
            return parseData
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