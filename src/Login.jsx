import React, { useState } from 'react'
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

export default function Login({ navigation }) {

    const [emailfocus, setEmailFocus]=useState(false);
    const [passwordfocus, setPassordFocus]=useState(false);
    const [showpassword, setShowPassword]=useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.head}>Log in</Text>
            <View style={styles.inputbox}>
                <AntDesign name="user" size={24} color={emailfocus===true?"red":"black"} />
                <TextInput style={styles.input} placeholder='Email' 
                    onFocus={()=>{
                        setEmailFocus(true)
                        setPassordFocus(false)
                        setShowPassword(false)
                    }}
                ></TextInput>
            </View>
            <View style={styles.inputbox}>
                <Feather name="lock" size={24} color={passwordfocus===true?"red":"black"} />
                <TextInput style={styles.input} placeholder='Password'
                onFocus={()=>{
                    setEmailFocus(false)
                    setPassordFocus(true)
                }}
                secureTextEntry={showpassword==false?true:false}
                ></TextInput>
                <Octicons name={showpassword==false?"eye-closed":"eye"} size={24} 
                onPress={()=>{
                    setShowPassword(!showpassword)
                }}></Octicons>
            </View>

            <TouchableOpacity  style={styles.btn} onPress={()=>navigation.navigate('Home')}>
              <Text style={{color:"white", fontSize:18}} >Register</Text>
            </TouchableOpacity>

            <Text style={{color:"grey"}}>Forgot Password </Text>
            <View className="flex w-screen flex-row items-center justify-center m-0 p-1">
                <Text style={{color:"#E9A11A", marginTop:10}}>New here?</Text>
                <Text style={{color:"black", marginTop:10}} onPress={()=>navigation.navigate('Signup')}> Sign up</Text>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: "#E9A11A",
        backgroundColor:"white",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    head: {
        fontSize: 25,
        color: "#E9A11A",
        textAlign: "center",
        marginVertical: 40,
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
        width:"80%",
        textAlign: "center",
        marginVertical: 30,
        marginHorizontal: 10,
        fontWeight: "200",
        backgroundColor: "rgb(233, 161, 26)",
        borderRadius: 10,
        padding: 10,
        paddingHorizontal: 20,
        alignItems:"center",
        justifyContent:"center",
        
      },

})
