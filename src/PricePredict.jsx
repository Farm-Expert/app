import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, ScrollView, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import bgimage from '../assets/bg.webp';
import CropScroll from './comp/CropScroll';
import back from "../assets/back.png";
import { useSelector } from 'react-redux';
import { recentCrop } from './auth/recent';
import searchicon from "../assets/seach.png";
import crop_json from './data/crop_json';
import bg2 from '../assets/bg2.jpg';
// import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import PriceSuggestionCrop from './comp/PriceSuggestionCrop';
import { diseasePredict, pricePredict } from './auth/ml_api';
import stringSimilarity from 'string-similarity';
// import { Feather } from '@expo/vector-icons';
import detective from '../assets/detective.png';
import crop2 from '../assets/crop2.png';

export default function PricePredict({ navigation }) {

    const [search, setSearch] = useState("");
    const [cropName, setCropName] = useState("");
    const [location, setLocation] = useState("India");
    const [price, setPrice] = useState("");
    const [priceType, setPriceType] = useState("per kg");
    const [predict, setPredict] = useState([]);
    const [suggestedCrop, setSuggestedCrop] = useState([]);
    const [suggestedLocation, setSuggestedLocation] = useState([]);
    const [showComponent, setShowComponent] = useState(false);
    const user_data = useSelector(state => state.value)

    const handlePredict = async () => {
        if (search) {
            const data = await pricePredict(search, user_data.payload.user.address);
            if (data) {
                console.log("data", data);
                const capitalizedCropName = data.crop_name.charAt(0).toUpperCase() + data.crop_name.slice(1);
                setCropName(capitalizedCropName);
                setLocation(data.location);
                setPrice(data.price);
                setSuggestedCrop(data.suggested_crops);
                setSuggestedLocation(data.locations_with_higher_prices);
                setShowComponent(true);
                // setPrice(`${data.price.split(' ')[1]} - ${data.price.split(' ')[3]}`);
                // setPriceType(`${data.price.split(' ')[4]}`)
            }
            setSearch("")
        }
        else {
            Alert.alert("Failed")
        }
    }

    // const handleDisease = async () => {
    //     console.log("predict");
    //     // const data = await pricePredict("mango", "indore");
    //     // const data1 = await diseasePredict("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGPutPjeeswgPGpoVYE7SfBSOKChl_FCB1zA&s");
    //     const data2 = await diseasePredict("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnuwXIC8XWUG4JByPU7FteFFro1TWkw4Nuig&s")
    // }


    return (
        <ImageBackground
            source={bgimage}
            style={styles.backgroundImage}
        >
            <StatusBar backgroundColor='transparent'
                barStyle='light-content'
                color='white'
                hidden={false}
                translucent={true}
                networkActivityIndicatorVisible={true}
                showHideTransition='slide'
            />

            <TouchableOpacity onPress={() => navigation.navigate("Home")} className="absolute w-10 left-5 flex items-center justify-center h-10 bg-white rounded-full top-12">
                <Image source={back} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View className="flex justify-center w-full items-center mb-6 mt-10">
                <Text className="text-white font-bold text-center text-2xl">Live Market Price</Text>
                <Text className="" style={{ fontSize: 12, color: "#B4B4B8" }}>Get live market price based on your location</Text>
            </View>
            <View className="rounded-3xl flex gap-2 flex-row items-center justify-center" style={styles.input}>
                <TextInput value={search} onChangeText={e => setSearch(e)} className="font-bold mb-2 text-lg" style={{ width: "80%" }} placeholder="Search crop name...." />
                <TouchableOpacity onPress={handlePredict} activeOpacity={0.7}><Image source={searchicon} style={{ width: 30, height: 30 }} /></TouchableOpacity>
            </View>

            <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: "#ffffff60" }} className="flex flex-1 items-center justify-center w-screen h-full pl-5 pr-5 pt-5">
                {showComponent ? (
                    <>
                        <ScrollView className=" w-full" showsVerticalScrollIndicator={false}>



                            <View className="flex flex-row items-center justify-between mb-8">
                                <View className=" items-center top-0 h-20 w-20 justify-start rounded-lg overflow-hidden">
                                    <Image source={crop2} className="rounded-full h-full w-full m-0 p-0" width={28} style={styles.priceimg} />
                                </View>
                                <Text className="text-white mt-2 w-full mb-6 font-bold text-center text-4xl">{cropName}</Text>
                            </View>

                            <View className="flex flex-row justify-around w-full">
                                <View className="flex flex-wrap w-1/4 items-center">
                                    <EvilIcons name="location" size={30} color="black" />
                                    <Text className="text-white font-bold w-full text-center text-2xl mt-2">{location}</Text>
                                    <Text className=" w-full text-center text-sm text-gray-300" style={{ color: "black" }}>India</Text>
                                </View>
                                <View className="flex flex-wrap w-1/4 items-center">
                                    <Ionicons name="pricetag-outline" size={20} color="black" />
                                    <Text className="text-white font-bold w-full text-center text-2xl mt-2">{price}</Text>
                                    <Text className=" w-full text-center text-sm text-gray-300" style={{ color: "black" }}>{priceType}</Text>
                                </View>
                            </View>

                            <View className="flex mt-10 items-center  w-full">
                                <Text className=" text-green-900 mb-4 text-sm text-center">Crops with higher price at your location: </Text>
                                <ScrollView horizontal={true} className=" h-1/6" showsHorizontalScrollIndicator={false}>
                                    {
                                        suggestedCrop.map((crop, i) => {
                                            return (
                                                <PriceSuggestionCrop key={i} crop={crop} />
                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>

                            <View className="flex mt-10 mb-20 items-center  w-full">
                                <Text className="text-green-900 mb-4 text-sm text-center">Locations to sell your crop at higher price: </Text>
                                <ScrollView horizontal={true} className=" h-1/6" showsHorizontalScrollIndicator={false}>
                                    {
                                        suggestedLocation.map((loc, i) => {
                                            return (
                                                <CropScroll key={i} name={loc.location} value={loc.price} />
                                            )
                                        })
                                    }
                                </ScrollView>
                            </View>
                        </ScrollView>

                    </>
                ) : (
                    <View className="flex flex-col items-center justify-center" >
                        <View className=" items-center top-0 h-60 w-60 justify-start rounded-lg overflow-hidden">
                            <Image source={detective} className="rounded-full h-full w-full m-0 p-0" width={28} style={styles.priceimg} />
                        </View>
                        <Text style={styles.noDataMessage} className="text-center">Search for a crop to get live market price based on your location.</Text>
                    </View>
                )}
            </View>


        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        paddingTop: 50,
        resizeMode: 'cover',
        paddingHorizontal: 30,
        alignItems: "center"
    },
    input: {
        height: 50,
        backgroundColor: "white",
        marginBottom: 16,
        paddingLeft: 15,
        paddingRight: 15,
        width: '100%',
    },
    priceimg: {
        justifyContent: 'center',
        height: "100%",
        width: "100%",
        resizeMode: 'cover',
        marginBottom: 40,
    },
    noDataMessage: {
        color: 'white',
        fontSize: 16,
        marginTop: 50
    },
});