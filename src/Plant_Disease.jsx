import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, TouchableOpacity, ToastAndroid, Button } from 'react-native';
import bgimage from '../assets/bg.webp';
import img from '../assets/lead_disease.png';
import back from "../assets/back.png"
import * as ImagePicker from 'expo-image-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase/firebaseconfig';


export default function Plant_Disease({ navigation }) {
    const [imgSrc, setImgSrc] = useState(null);
    function showToast(message) {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access media library denied');
            }
        })();
    }, [])

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            const { assets } = result;
            if (assets && assets.length > 0) {
                const { uri } = assets[0];
                console.log(uri);
                const response = await fetch(uri);
                const blob = await response.blob();
                const storageRef = ref(storage, (`plant_disease/${Date.now()}.png`));
                try {
                    await uploadBytes(storageRef, blob)
                    showToast('Image uploaded successfully!')
                    const img_URL = await getDownloadURL(storageRef)
                    setImgSrc(img_URL);
                } catch (error) {
                    console.error('Error uploading image:', error.message);
                }
            }
        }
    };

    const upload_image = async () => {
        if (imgSrc) {
            // logic to send image to backend
            showToast('Image uploaded successfully!')
            setImgSrc(null)
        }
        else {
            showToast('Please upload an image to get started!')
        }
    }

    return (
        <ImageBackground
            source={bgimage}
            style={styles.backgroundImage}
        >

            <View className="flex w-screen flex-row items-center justify-center m-0 p-0">
                <Image source={img} className="h-full w-screen m-4 p-4" style={styles.img} />
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Home")} className="absolute w-10 left-5 flex items-center justify-center h-10 bg-white rounded-full top-10">
                <Image source={back} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
            <Text className="text-2xl text-white font-bold">Plant Disease Prediction</Text>
            <View style={{ height: 20 }}></View>

            {imgSrc && <Image source={{ uri: imgSrc }} style={{ width: 200, height: 200, borderRadius: 10 }} />}
            {!imgSrc &&
                <TouchableOpacity onPress={pickImage}>
                    <View className="flex items-center justify-center"
                        style={{
                            backgroundColor: 'white',
                            padding: 10,
                            width: 200,
                            height: 200,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'black'
                        }}
                    >
                        <Text className="text-black absolute font-bold z-30">Click to open camera</Text>
                    </View>
                </TouchableOpacity>
            }

            <View style={{ marginTop: 20 }}>
                <TouchableOpacity activeOpacity={0.5} style={{ borderRadius: 10, padding: 10 }} onPress={upload_image}>
                    <Text className="text-xl font-bold" style={{ color: "white", textAlign: "center", backgroundColor: "#6d9eeb", paddingHorizontal: 30, paddingVertical: 10, borderRadius: 10 }}>Upload Image</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        padding: 30,
        alignItems: "center"
    },
    img: {
        height: 180,
        width: 400,
        resizeMode: "contain"
    }
});