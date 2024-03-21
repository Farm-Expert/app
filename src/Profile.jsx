import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground, StatusBar, ScrollView, ToastAndroid } from 'react-native';
import bgImage from "../assets/bg4.jpg"
import back from "../assets/back.png"
import CropScroll from './comp/CropScroll';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { FontAwesome } from '@expo/vector-icons';
import { updateProfile } from './auth/profileUpdate';
import { AntDesign } from '@expo/vector-icons';
import { storage } from './firebase/firebaseconfig'
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addProfileimage } from '../redux/Auth';
import { TextInput } from 'react-native';

export default function Profile({ navigation }) {
    const [Nitrogen, setNitrogen] = useState("");
    const [Phosphorous, setPhosphorous] = useState("");
    const [Potassium, setPotassium] = useState("");
    const [Humidity, setHumidity] = useState("");
    const [Temperature, setTemperature] = useState("");
    const [Rainfall, setRainfall] = useState("");
    const [pH, setPH] = useState("");
    const [imgsrc, setImgSrc] = useState(useSelector(state => state.profile_img));
    const user_data = useSelector(state => state.value)
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(user_data.payload.user.name);
    const [mobile, setMobile] = useState(user_data.payload.user.mobile);
    const [address, setAddress] = useState(user_data.payload.user.address);
    const [kisanId, setKisanId] = useState(user_data.payload.user.kisanid);
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
        setNitrogen(Number(user_data.payload.user.nitrogen));
        setPhosphorous(Number(user_data.payload.user.phosphorous));
        setPotassium(Number(user_data.payload.user.potassium));
        setHumidity(Number(user_data.payload.user.humidity));
        setTemperature(Number(user_data.payload.user.temperature));
        setRainfall(Number(user_data.payload.user.rainfall));
        setPH(Number(user_data.payload.user.ph));
    }, []);

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    // Function to save changes
    const saveChanges = async () => {
        // Update profile here with the new data
        try {
            const data = await updateProfile(
                user_data.payload.token, name, mobile, address, kisanId, Nitrogen, Phosphorous, Potassium, Temperature, Humidity, Rainfall, pH
            );
            if (data) {
                setName(name);
                setMobile(mobile);
                setAddress(address);
                setKisanId(kisanId);
                showToast('Profile updated successfully!');
                toggleEditMode(); // Exit edit mode after saving changes
            } else {
                showToast('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            showToast('Failed to update profile');
        }
    };

    const discardChanges = () => {
        // Reset fields to original values
        setName(user_data.payload.user.name);
        setMobile(user_data.payload.user.mobile);
        setAddress(user_data.payload.user.address);
        setKisanId(user_data.payload.user.kisanid);
        toggleEditMode(); // Exit edit mode
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });
        if (!result.canceled) {
            console.log(result.assets[0].uri);
            const response = await fetch(result.assets[0].uri);
            const blob = await response.blob();
            const storageRef = ref(storage, (`images/${Date.now()}.png`));
            try {
                await uploadBytes(storageRef, blob)
                showToast('Image uploaded successfully!')
                const img_URL = await getDownloadURL(storageRef)
                dispatch(addProfileimage(img_URL));
                setImgSrc(img_URL);
                const data = await updateProfile(user_data.payload.token, user_data.payload.user.name, user_data.payload.user.mobile, user_data.payload.user.address, user_data.payload.user.kisanid, Nitrogen, Phosphorous, Potassium, Temperature, Humidity, Rainfall, pH, img_URL)
                if (data) {
                    console.log("profile updated", img_URL);
                    console.log("profile updated done", user_data.payload.user.profileimg);
                }
                else {
                    console.log("failed updating profile");
                }
            } catch (error) {
                console.error('Error uploading image:', error.message);
            }
        }
    };



    const share = () => {
        console.log("share")
        const profile_link = `http://myfarmexpert.tech:5050/share/${user_data.payload.token}`
        console.log(profile_link);
        console.log(user_data.payload.user);
        Clipboard.setString(profile_link);
    }

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
            <TouchableOpacity onPress={pickImage} className="absolute z-40 top-12 right-10"><FontAwesome5 name="user-edit" size={24} color="white" /></TouchableOpacity>
            <View className="bg-transparent rounded-full mb-4 overflow-hidden" style={{ width: 110, height: 110 }}>
                <Image source={{ uri: imgsrc }} className="w-full h-full" />
            </View>
            {editMode ? ( // Render TextInput with edit icon when editMode is true
                <View className=" flex justify-center" style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                        style={{ marginBottom: 4, fontWeight: 'bold', fontSize: 20, color: 'white' }}
                        value={name}
                        onChangeText={setName}
                        placeholder="Enter your name"
                        placeholderTextColor="gray"
                    />
                    <TouchableOpacity>
                        <AntDesign name="edit" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            ) : ( // Render Text field when editMode is false
                <Text style={{ marginBottom: 4, fontWeight: 'bold', fontSize: 20, color: 'white' }}>
                    Hi {user_data.payload.user.name}
                </Text>
            )}
            {/* <TextInput></TextInput> */}
            <View style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50, backgroundColor: "#ffffff60" }} className="flex justify-start items-center w-screen h-full">
                <View className="w-full flex flex-row mb-6 mt-6 justify-around items-center">
                    <View>
                        <View className="flex flex-row items-center justify-center gap-1">
                            <MaterialIcons name="email" size={24} color="black" />
                            <Text className="text-center text-xl font-bold">Email</Text>
                        </View>
                        <Text className="text-center">{user_data.payload.user.email}</Text>
                    </View>

                    <View>
                        <View className="flex flex-row items-center justify-center gap-1">
                            <Entypo name="phone" size={24} color="black" />
                            <Text className="text-center text-xl font-bold">Mobile No.</Text>
                        </View>
                        {editMode ? ( // Render TextInput with edit icon when editMode is true
                            <View className=" flex justify-center" style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    value={mobile.toString()}
                                    onChangeText={setMobile}
                                    placeholder="Enter your Number"
                                    placeholderTextColor="gray"
                                />
                                <TouchableOpacity>
                                    <AntDesign name="edit" size={20} />
                                </TouchableOpacity>
                            </View>
                        ) : ( // Render Text field when editMode is false
                            <Text className="text-center">{user_data.payload.user.mobile}</Text>
                        )}
                    </View>
                </View>
                <View className="w-full flex flex-row mb-6 justify-around items-center">
                    <View>
                        <View className="flex flex-row items-center justify-center gap-1">
                            <AntDesign name="idcard" size={24} color="black" />
                            <Text className="text-center text-xl font-bold">PM-Kisan farmer ID</Text>
                        </View>
                        {editMode ? ( // Render TextInput with edit icon when editMode is true
                            <View className=" flex justify-center" style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    value={kisanId.toString()}
                                    onChangeText={setKisanId}
                                    placeholder="Enter your KisanID"
                                    placeholderTextColor="gray"
                                />
                                <TouchableOpacity>
                                    <AntDesign name="edit" size={20} />
                                </TouchableOpacity>
                            </View>
                        ) : ( // Render Text field when editMode is false
                            <Text className="text-center">{user_data.payload.user.kisanid}</Text>
                        )}
                    </View>
                </View>
                <View className="w-full flex flex-row mb-6 justify-around items-center">
                    <View className="flex justify-center items-center">
                        <View className="flex flex-row items-center justify-center gap-1">
                            <FontAwesome name="address-book" size={24} color="black" />
                            <Text className="text-center text-xl font-bold">Address</Text>
                        </View>
                        {editMode ? ( // Render TextInput with edit icon when editMode is true
                            <View className=" flex flex-row items-center justify-center ">
                                <TextInput
                                    className="text-center"
                                    value={address}
                                    onChangeText={setAddress}
                                    placeholder="Enter your email"
                                    placeholderTextColor="gray"
                                />
                                <TouchableOpacity>
                                    <AntDesign name="edit" size={20} />
                                </TouchableOpacity>
                            </View>
                        ) : ( // Render Text field when editMode is false
                            <Text className="text-center">{user_data.payload.user.address}</Text>
                        )}
                    </View>
                </View>
                <View style={{ height: 2 }} className="w-2/3 bg-white"></View>

                <View style={{ width: "90%" }} className="">
                    <View className="h-16 rounded-full mb-6 mt-7 overflow-hidden flex flex-row justify-around items-center w-full bg-green-100">
                        <View className="flex items-center justify-center flex-1">
                            {/* <TouchableOpacity className="w-full h-full flex items-center justify-center" onPress={toggleEditMode}>
                                <AntDesign name="edit" size={24} color="black" />
                                <Text className="font-bold">Edit</Text>

                            </TouchableOpacity> */}
                            {/* // Edit mode toggle button */}
                            {!editMode && (
                                <TouchableOpacity onPress={toggleEditMode} style={styles.editButton}>
                                    <AntDesign name="edit" size={24} color="black" />
                                    <Text className="font-bold">Edit</Text>
                                </TouchableOpacity>
                            )}

                            {/* Save and Discard buttons */}
                            {editMode && (
                                <View style={styles.editButtonsContainer}>
                                    <TouchableOpacity onPress={saveChanges} style={[styles.editButton, { backgroundColor: '#ffc61a' }]}>
                                        <Text style={styles.editButtonText}>Save</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={discardChanges} style={[styles.editButton, { backgroundColor: '#ff8080' }]}>
                                        <Text style={styles.editButtonText}>Discard</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                        </View>
                        <View style={{ width: 2, height: 35, backgroundColor: "black" }}></View>
                        <View className="flex items-center justify-center flex-1">
                            <TouchableOpacity className="w-full h-full flex items-center justify-center" onPress={share}>
                                <AntDesign name="sharealt" size={24} color="black" />
                                <Text className="font-bold">Share</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: 2, height: 35, backgroundColor: "black" }}></View>
                        <View className="flex items-center justify-center flex-1">
                            <TouchableOpacity onPress={() => navigation.navigate('Login')} className="w-full h-full flex items-center justify-center">
                                <MaterialIcons name="logout" size={24} color="black" />
                                <Text className="font-bold">Log out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <Text className="font-bold text-lg text-white">Your Current Soil Condition</Text>
                </View>
                <View style={{ height: 2 }} className="w-2/3 bg-white"></View>
                <View className="p-5" style={{ height: 150 }}>
                    <ScrollView horizontal={true} bouncesZoom={true} showsHorizontalScrollIndicator={false} bounces={true}>
                        <CropScroll name={"Nitrogen"} value={Nitrogen} />
                        <CropScroll name={"PH"} value={pH} />
                        <CropScroll name={"Temperature"} value={Temperature} />
                        <CropScroll name={"Phosphorus"} value={Phosphorous} />
                        <CropScroll name={"Rainfall"} value={Rainfall} />
                        <CropScroll name={"Potassium"} value={Potassium} />
                        <CropScroll name={"Humidity"} value={Humidity} />
                    </ScrollView>
                </View>
            </View>


        </ImageBackground >
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
    editButton: {
        position: 'absolute',
        top: 12,
        right: 10,
        zIndex: 40,
        backgroundColor: 'transparent',
    },

    // Container for Save and Discard buttons
    editButtonsContainer: {
        flexDirection: 'col',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 7,
        marginBottom: 7,
        gap: 5,
    },

    // Style for Save and Discard buttons
    editButton: {
        width: '55%',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Style for text inside Save and Discard buttons
    editButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        padding: 5,
    },
});
