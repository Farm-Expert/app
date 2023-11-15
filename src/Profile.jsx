import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, StatusBar } from 'react-native';
import profile from "/home/arjunkumarsoni/Desktop/Code/FARM-EXPERT-APP/assets/profile.png"
import home from "/home/arjunkumarsoni/Desktop/Code/FARM-EXPERT-APP/assets/home.png"
import bgImage from "/home/arjunkumarsoni/Desktop/Code/FARM-EXPERT-APP/assets/bg3.jpg"

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
            <View style={{ width: "100%" }} className="absolute bottom-12">
                <View className="h-16 rounded-full mt-7 overflow-hidden flex flex-row justify-around items-center w-full bg-green-100">
                    <TouchableOpacity onPress={() => navigation.navigate("Home")} className="flex items-center justify-center flex-1"><Image source={home} style={{ width: 30, height: 30 }} /></TouchableOpacity>
                    <View style={{ width: 2, height: 35, backgroundColor: "black" }}></View>
                    <TouchableOpacity className="flex-1 opacity-25 flex items-center justify-center"><Image source={profile} style={{ width: 30, height: 30 }} /></TouchableOpacity>
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
});