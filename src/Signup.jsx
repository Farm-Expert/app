import React, { useState } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { signup } from './auth/auth';
import { Alert } from 'react-native';

export default function Signup({ navigation }) {

    const [emailfocus, setEmailFocus] = useState(false);
    const [passwordfocus, setPassordFocus] = useState(false);
    const [showpassword, setShowPassword] = useState(false);
    const [userfocus, setUserFocus] = useState(false);
    const [phonefocus, setPhoneFocus] = useState(false);
    const [adressfocus, setAddressFocus] = useState(false);
    const [kisanidfocus, setKisanIdFocus]= useState(false)
    const [Name,setName]=useState("");
    const [Email,setEmail]=useState("");
    const [Mobile,setMobile]=useState("");
    const [Password,setPassword]=useState("");
    const [Address,setAddress]=useState("");
    const [KisanID,setKisanID]=useState("");

    const handlesignup=async()=>{
        const data=await signup(Name,Email,Mobile,Password,Address,KisanID)
        if(data){
            navigation.navigate("Home")
        }
        else{
            Alert.alert("Authentication Failed")
        }
    }

    return (
        <View style={styles.container}>
            <Image source={require("../assets/farming.png")} style={{ width: "100%", height: "20%", marginTop: 50 }} />
            <Text className="font-bold" style={styles.head}>Sign up</Text>
            <View style={styles.inputbox}>
                <AntDesign name="user" size={24} color={userfocus === true ? "red" : "black"} />
                <TextInput style={styles.input} placeholder='User Name'
                value={Name}
                onChange={(e)=>setName(e)}
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
                    onChange={(e)=>setEmail(e)}
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
                <MaterialCommunityIcons name="kisan-id" size={24} color={kisanidfocus === true ? "red" : "black"} />
                <TextInput style={styles.input} placeholder='KisanID'
                    value={KisanID}
                    onChange={(e)=>setKisanID(e)}
                    onFocus={() => {
                        setUserFocus(false)
                        setEmailFocus(false)
                        setPhoneFocus(false)
                        setPassordFocus(false)
                        setShowPassword(false)
                        setAddressFocus(false)
                        setKisanIdFocus(true)
                    }}
                ></TextInput>
            </View>
            <View style={styles.inputbox}>
                <Feather name="phone-call" size={24} color={phonefocus === true ? "red" : "black"} />
                <TextInput style={styles.input} placeholder='Phone Number'
                value={Mobile}
                onChange={(e)=>setMobile(e)}
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
                <MaterialCommunityIcons name="address" size={24} color={adressfocus === true ? "red" : "black"} />
                <TextInput style={styles.input} placeholder='Address'
                    value={Address}
                    onChange={(e)=>setAddress(e)}
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
                onChange={(e)=>setPassword(e)}
                    onFocus={() => {
                        setUserFocus(false)
                        setEmailFocus(false)
                        setPhoneFocus(false)
                        setPassordFocus(true)
                        setAddressFocus(false)
                        setKisanIdFocus(false)
                    }}
                    keyboardType="visible-password"
                    secureTextEntry={showpassword == false ? true : false}
                ></TextInput>
                <Octicons name={showpassword == false ? "eye-closed" : "eye"} size={24}
                    onPress={() => {
                        setShowPassword(!showpassword)
                    }}></Octicons>
            </View>

            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Home')}>
                <Text className="font-bold" style={{ color: "white", fontSize: 18 }} 
                onClick={handlesignup}>Log in</Text>
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
        marginVertical: 40,
        marginTop: 20
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
