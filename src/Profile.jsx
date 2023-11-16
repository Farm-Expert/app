import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, StatusBar, ScrollView } from 'react-native';
import profile from "../assets/profile.png"
import avatar from "../assets/avatar.png"
import home from "../assets/home.png"
import bgImage from "../assets/bg4.jpg"
import back from "../assets/back.png"
import CropScroll from './comp/CropScroll';

export default function Profile({ navigation }) {
    return (
        <ImageBackground
            source={bgImage}
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
            <TouchableOpacity onPress={() => navigation.navigate("Home")} className="absolute w-10 left-5 flex items-center justify-center h-10 bg-white rounded-full top-10">
                <Image source={back} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <View className="bg-transparent rounded-full mb-4" style={{ width: 110, height: 110 }}>
                <Image source={avatar} className="w-full h-full" />
            </View>
            <Text className="mb-4 font-extrabold text-white text-lg">Hi Adam</Text>
            <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: "#ffffff60" }} className="flex justify-start items-center w-screen h-full">
                <View className="w-full flex flex-row mb-6 mt-6 justify-around items-center">
                    <View>
                        <Text className="text-center text-xl font-bold">Email</Text>
                        <Text className="text-center">xyz@gmail.com</Text>
                    </View>
                    <View>
                        <Text className="text-center text-xl font-bold">Mobile No.</Text>
                        <Text className="text-center">+91 7392849387</Text>
                    </View>
                </View>
                <View className="w-full flex flex-row mb-6 justify-around items-center">
                    <View>
                        <Text className="text-center text-xl font-bold">PM-Kisan farmer ID</Text>
                        <Text className="text-center">DL938475LC384P</Text>
                    </View>
                </View>
                <View className="w-full flex flex-row mb-6 justify-around items-center">
                    <View className="flex justify-center items-center">
                        <Text className="text-center text-xl font-bold">Address</Text>
                        <Text className="text-center flex flex-wrap w-2/3">Ram vilas, Hno. 102, Solar Colony Faridabad, Haryana</Text>
                    </View>
                </View>
                <View style={{ height: 2 }} className="w-2/3 bg-white"></View>

                <View style={{ width: "90%" }} className="">
                    <View className="h-16 rounded-full mb-6 mt-7 overflow-hidden flex flex-row justify-around items-center w-full bg-green-100">
                        <View className="flex items-center justify-center flex-1"><TouchableOpacity className="w-full h-full flex items-center justify-center"><Text className="font-bold">Edit</Text></TouchableOpacity></View>
                        <View style={{ width: 2, height: 35, backgroundColor: "black" }}></View>
                        <View className="flex items-center justify-center flex-1"><TouchableOpacity className="w-full h-full flex items-center justify-center"><Text className="font-bold">Share</Text></TouchableOpacity></View>
                        <View style={{ width: 2, height: 35, backgroundColor: "black" }}></View>
                        <View className="flex items-center justify-center flex-1"><TouchableOpacity className="w-full h-full flex items-center justify-center"><Text className="font-bold">Log out</Text></TouchableOpacity></View>
                    </View>
                </View>
                <View>
                    <Text className="font-bold text-lg text-white">Your Current Soil Condition</Text>
                </View>
                <View style={{ height: 2 }} className="w-2/3 bg-white"></View>
                <View className="p-5" style={{height:150}}>
                    <ScrollView horizontal={true} bouncesZoom={true} showsHorizontalScrollIndicator={false} bounces={true}>
                        <CropScroll name={"Nitrogen"} value={122}/>
                        <CropScroll name={"PH"} value={122}/>
                        <CropScroll name={"Temperature"} value={122}/>
                        <CropScroll name={"Phosphorus"} value={122}/>
                        <CropScroll name={"Rainfall"} value={122}/>
                        <CropScroll name={"Potassium"} value={122}/>
                        <CropScroll name={"Humidity"} value={122}/>
                    </ScrollView>
                </View>
            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        top: 0,
        paddingTop: 50,
        resizeMode: 'cover',
        paddingHorizontal: 30,
        alignItems: "center"
    },
});