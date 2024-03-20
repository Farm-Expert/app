import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, ScrollView, TouchableOpacity, StatusBar, TextInput } from 'react-native';
import bgimage from '../assets/bg.webp';
import CropScroll from './comp/CropScroll';
import back from "../assets/back.png"
import { useSelector } from 'react-redux';
import { recentCrop } from './auth/recent';
import searchicon from "../assets/seach.png"
import crop_json from './data/crop_json';
import bg2 from '../assets/bg2.jpg';
// import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import PriceSuggestionCrop from './comp/PriceSuggestionCrop';
import PriceSuggestionLocation from './comp/PriceSuggestionLocation';

export default function PricePredict({ navigation }) {

    const [search, setSearch] = useState("");
    const [predict, setPredict] = useState([]);
    const user_data = useSelector(state => state.value)

    useEffect(() => {
        handlesearch();
    }, [])

    const handlesearch = async () => {
        const data = await recentCrop(user_data.payload.token)

        if (data.recentCrop) {
            let filtercrop = []
            data.recentCrop.filter(recentCrop => crop_json.some(crop => crop.name === recentCrop.crop))
                .map((recentCrop, i) => {
                    const matchingCrop = crop_json.find(crop => crop.name === recentCrop.crop);
                    filtercrop = [...filtercrop, matchingCrop]
                }
                )
            filtercrop = filtercrop.reverse()
            setPredict(filtercrop);
        }
        else {
            Alert.alert("Failed", data)
        }
    }

    const handlePredict = async () => {
        console.log("predict");
    }

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

            <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: "#ffffff60" }} className="flex items-center w-screen h-full p-5">

                <View className=" items-center top-0 h-28 w-28 justify-start rounded-lg overflow-hidden">
                    <Image source={bg2} className="rounded-full h-full w-full m-0 p-0" style={styles.priceimg} />
                </View>
                <Text className="text-white mt-2 w-full mb-6 font-bold text-center text-3xl">Rice</Text>

                <View className="flex flex-row justify-around w-full">
                    <View className="flex flex-wrap w-1/4 items-center">
                        {/* <Entypo name="location-pin" size={24} color="black" /> */}
                        <EvilIcons name="location" size={30} color="#DDDDDD" />
                        <Text className="text-black w-full text-center text-xl mt-2">Gwalior</Text>
                        <Text className=" w-full text-center text-sm" style={{color:"#DDDDDD"}}>Madhya Pradesh</Text>
                    </View>
                    <View className="flex flex-wrap w-1/4 items-center">
                        {/* <Entypo name="price-tag" size={24} color="black" /> */}
                        <Ionicons name="pricetag-outline" size={20} color="#DDDDDD" />
                        <Text className="text-black w-full text-center text-xl mt-2">1000 INR </Text>
                        <Text className=" w-full text-center text-sm" style={{color:"#DDDDDD"}}>per kg </Text>
                    </View>
                </View>

                <View className="flex mt-10 items-center w-full">
                    <Text>Crops with higher price at your location: </Text>
                    {/* <PriceSuggestionCrop/> */}
                </View>

                <View className="flex mt-10 items-center w-full">
                    <Text>Locations to sell your crop at higher price: </Text>
                    {/* <PriceSuggestionLocation/> */}
                </View>

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
});