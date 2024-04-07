import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ImageBackground, Image } from 'react-native';
import aibg from '../assets/aibg.jpg';
import chatavatar from '../assets/chatavatar.png';
import { useDispatch, useSelector } from 'react-redux';
import { chat_agro } from './auth/recent';
import { addChat } from '../redux/Auth';

const ChatScreen = () => {
    const userimg = useSelector(state => state.profile_img)
    const name = useSelector(state => state.value.payload.user.name)
    const scrollViewRef = useRef();
    const [messages, setmessages] = useState(useSelector(state=>state.chat));
    const [text, setText] = useState('');
    const [typing, setTyping] = useState(false);
    const dispatch=useDispatch();

    const handleSubmit = async() => {
        if (!text) return;
        setTyping(true);
        const message=text;
        setText('');
        setmessages(prevMessages => [...prevMessages, { id: prevMessages.length + 1, sender: name, text:message }]);
        await chat(message);
        dispatch(addChat(messages))
        setTyping(false);
    }
    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);

    const chat =async (text) => {
        const response =await chat_agro(text);
        if (response != null) {
            setmessages(prevMessages => [...prevMessages, { id: prevMessages.length + 1, sender: "model", text:response }]);
        }
        else {
          showToast(`Error: try again..`)
        }
      }

    return (
        <ImageBackground
            source={aibg}
            style={styles.backgroundImage}
        >
            <View style={{ backgroundColor: "#ffffff" }} className="flex w-full absolute top-0 pt-10 items-center justify-center pb-4 rounded-lg px-4">
                <Text className="font-bold text-2xl">Chat with Agri Tech</Text>
            </View>
            <View className="flex-1 pt-10 w-screen">
                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'flex-end', paddingHorizontal: 10 }}
                >
                    {messages.map(message => (
                        <View key={message.id} style={{ flexDirection: 'row', justifyContent: message.sender === name ? 'flex-end' : 'flex-start', marginBottom: 10 }}>
                            {message.sender !== name && <Image source={chatavatar} style={{ width: 50, height: 50, marginRight: 10 }} />}
                            <View className="" style={{ maxWidth: "80%", padding: 10, borderRadius: 10, backgroundColor: message.sender === name ? 'blue' : 'gray' }}>
                                <Text style={{ color: 'white', fontSize: 18, flexShrink: 1 }}>{message.text}</Text>
                            </View>
                            {message.sender === name && <Image className="rounded-full" source={{ uri: userimg }} style={{ width: 50, height: 50, marginLeft: 10 }} />}
                        </View>
                    ))}
                    {typing &&
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 10 }}>
                            <Image source={chatavatar} style={{ width: 50, height: 50, marginRight: 10 }} />
                            <View className="" style={{ maxWidth: "80%", padding: 10, borderRadius: 10, backgroundColor: 'gray' }}>
                                <Text style={{ color: 'white', fontSize: 18, flexShrink: 1 }}>Typing...</Text>
                            </View>
                        </View>
                    }
                </ScrollView>
                <View style={{ backgroundColor: "#00000030" }} className="flex-row w-full items-center pb-4 pt-2 rounded-lg px-4">
                    <TextInput
                        value={text}
                        onChangeText={(e) => setText(e)}
                        placeholder="Type your message..."
                        className="flex-1 mr-2 py-2 px-4 bg-gray-200 rounded-full"
                    />
                    <TouchableOpacity onPress={handleSubmit} className="p-3 bg-blue-500 rounded-full">
                        <Text className="text-white font-bold">Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        paddingTop: 50,
        alignItems: "center"
    },
    img: {
        height: 180,
        width: 400,
        resizeMode: "contain"
    }
});

export default ChatScreen;
