import React, { useState } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, ToastAndroid } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Feather,Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { signup } from './auth/auth';
import { useDispatch } from 'react-redux';
import { add } from '../redux/Auth';
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

export default function Signup({ navigation }) {

    const [emailfocus, setEmailFocus] = useState(false);
    const [passwordfocus, setPassordFocus] = useState(false);
    const [showpassword, setShowPassword] = useState(false);
    const [userfocus, setUserFocus] = useState(false);
    const [phonefocus, setPhoneFocus] = useState(false);
    const [adressfocus, setAddressFocus] = useState(false);
    const [kisanidfocus, setKisanIdFocus] = useState(false)
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [Mobile, setMobile] = useState("");
    const [Password, setPassword] = useState("");
    const [Address, setAddress] = useState("");
    const [KisanID, setKisanID] = useState("");

    function showToast(message) {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    const dispatch = useDispatch();

    const handlesignup = async () => {
        console.log(Name, Email, Mobile, Password, Address, KisanID);
        if(Name=="" || Email=="" || Mobile=="" || Password=="" || Address=="" || KisanID==""){
            showToast("Failed: All fields are required")
            return
        }
        else if(Password.length<6){
            showToast("Failed: Password should be atleast 6 characters long")
                return
        }
        else if(Mobile.length!=10){
            showToast("Failed: Mobile number should be 10 digits long")
            return
        }
        else if(KisanID.length!=12){
            showToast("Failed: KisanID number should be 12 digits long")
            return
        }
        const data = await signup(Name, Email, Mobile, Password, Address, KisanID)
        if (data!=null && data.token) {
            dispatch(add(data));
            if(data.user.profileimg!=null && data.user.profileimg!=""){
                dispatch(addProfileimage(data.user.profileimg));
                save("profile_img",data.user.profileimg)
            }
            setName("");
            setEmail("");
            setMobile("");
            setPassword("");
            setAddress("");
            setKisanID("");
            showToast("Signed up successfully!");
            save("token",data.token)
            save("user",JSON.stringify(data))
            navigation.navigate("Home")
        }
        else {
            showToast(`Authentication Failed: ${data}`)
        }
        
    }

    return (
        <View style={styles.container}>
            <Text className="font-bold" style={styles.head}>Sign up</Text>
            <Image source={require("../assets/farming.png")} style={{ width: "100%", height: "20%", marginTop: 20 }} />
            <KeyboardAvoidingView behavior={"height"} className="w-full flex items-center justify-center">
                <View style={styles.inputbox}>
                    <AntDesign name="user" size={24} color={userfocus === true ? "red" : "black"} />
                    <TextInput style={styles.input} placeholder='User Name'
                        value={Name}
                        onChangeText={(e) => setName(e)}
                        onFocus={() => {
                            setUserFocus(true)
                            setEmailFocus(false)
                            setPhoneFocus(false)
                            setPassordFocus(false)
                            setShowPassword(false)
                            setAddressFocus(false)
                            setKisanIdFocus(false)
                        }}
                    ></TextInput>
                </View>
                <View style={styles.inputbox}>
                    <MaterialCommunityIcons name="email-outline" size={24} color={emailfocus === true ? "red" : "black"} />
                    <TextInput style={styles.input} placeholder='Email'
                        value={Email}
                        onChangeText={(e) => setEmail(e)}
                        onFocus={() => {
                            setUserFocus(false)
                            setEmailFocus(true)
                            setPhoneFocus(false)
                            setPassordFocus(false)
                            setShowPassword(false)
                            setAddressFocus(false)
                            setKisanIdFocus(false)
                        }}
                        keyboardType="email-address"
                    ></TextInput>
                </View>
                <View style={styles.inputbox}>
                    <AntDesign name="idcard" size={24} color={kisanidfocus === true ? "red" : "black"} />
                    <TextInput style={styles.input} placeholder='KisanID'
                        value={KisanID}
                        onChangeText={(e) => setKisanID(e)}
                        onFocus={() => {
                            setUserFocus(false)
                            setEmailFocus(false)
                            setPhoneFocus(false)
                            setPassordFocus(false)
                            setShowPassword(false)
                            setAddressFocus(false)
                            setKisanIdFocus(true)
                        }}
                        keyboardType="number-pad"
                    ></TextInput>
                </View>
                <View style={styles.inputbox}>
                    <Feather name="phone-call" size={24} color={phonefocus === true ? "red" : "black"} />
                    <TextInput style={styles.input} placeholder='Phone Number'
                        value={Mobile}
                        onChangeText={(e) => setMobile(e)}
                        onFocus={() => {
                            setUserFocus(false)
                            setEmailFocus(false)
                            setPhoneFocus(true)
                            setPassordFocus(false)
                            setShowPassword(false)
                            setAddressFocus(false)
                            setKisanIdFocus(false)
                        }}
                        keyboardType="number-pad"
                    ></TextInput>
                </View>
                <View style={styles.inputbox}>
                    <Entypo name="address" size={24} color={adressfocus === true ? "red" : "black"} />
                    <TextInput style={styles.input} placeholder='Address'
                        value={Address}
                        onChangeText={(e) => setAddress(e)}
                        onFocus={() => {
                            setUserFocus(false)
                            setEmailFocus(false)
                            setPhoneFocus(false)
                            setPassordFocus(false)
                            setShowPassword(false)
                            setAddressFocus(true)
                            setKisanIdFocus(false)
                        }}
                    ></TextInput>
                </View>
                <View style={styles.inputbox}>
                    <Feather name="lock" size={24} color={passwordfocus === true ? "red" : "black"} />
                    <TextInput style={styles.input} placeholder='Password'
                        value={Password}
                        onChangeText={(e) => setPassword(e)}
                        onFocus={() => {
                            setUserFocus(false)
                            setEmailFocus(false)
                            setPhoneFocus(false)
                            setPassordFocus(true)
                            setAddressFocus(false)
                            setKisanIdFocus(false)
                        }}
                        secureTextEntry={showpassword == false ? true : false}
                    ></TextInput>
                    <Octicons name={showpassword == false ? "eye-closed" : "eye"} size={24}
                        onPress={() => {
                            setShowPassword(!showpassword)
                        }}></Octicons>
                </View>
            </KeyboardAvoidingView>

            <TouchableOpacity style={styles.btn} onPress={handlesignup}>
                <Text className="font-bold" style={{ color: "white", fontSize: 18 }} >
                    Sign up
                </Text>
            </TouchableOpacity>

            <Text style={{ color: "grey" }}>Forgot Password </Text>
            <View className="flex w-screen flex-row items-center justify-center m-0 p-1">
                <Text style={{ color: "#E9A11A", marginTop: 10 }}>Already have an account? </Text>
                <Text className="font-bold" style={{ color: "black", marginTop: 10 }} onPress={() => navigation.navigate('Login')}>Login</Text>
            </View>
            <Image className="absolute bottom-0 -z-30 opacity-10" source={require("../assets/farmbg.png")} style={{ width: "100%", height: "50%" }} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#E9A11A",
        backgroundColor: "white",
        width: "100%",
        alignItems: "center",
        // justifyContent: "center",
    },
    head: {
        fontSize: 30,
        color: "#E9A11A",
        textAlign: "center",
        // marginVertical: 0,
        zIndex: 10,
        marginTop: 50
    },
    inputbox: {
        flexDirection: "row",
        width: "80%",
        marginVertical: 10,
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        elevation: 20,
    },
    input: {
        fontSize: 18,
        marginLeft: 10,
        width: "80%",
    },
    btn: {
        fontSize: 20,
        color: "black",
        width: "80%",
        textAlign: "center",
        marginVertical: 30,
        marginHorizontal: 10,
        fontWeight: "200",
        backgroundColor: "rgb(233, 161, 26)",
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
        alignItems: "center",
        justifyContent: "center",

    },

})
