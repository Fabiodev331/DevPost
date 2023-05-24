import React, { useState, useLayoutEffect, useContext } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { AuthContext } from "../../contexts/auth";

import { Button, ButtonText, Container, Input } from "./styles";

function NewPost(){
    const navigation = useNavigation();
    const [post, setPost] = useState('');
    const { user } = useContext(AuthContext);

    useLayoutEffect(() => {

        const options = navigation.setOptions({
            headerRight: () => (
                <Button onPress={ handlePost } >
                    <ButtonText>Compartilhar</ButtonText>
                </Button>
            )
        })

    }, [navigation, post])

    async function handlePost(){
        if(post === ''){
            console.log('Digite alguma coisa...');
            return;
        }

        let avatarUrl = null;

        try{
            let response = await storage().ref('users').child(user?.uid).getDownloadURL();
            avatarUrl = response;

        }catch(err){
            avatarUrl = null
        }

        await firestore().collection('posts')
        .add({
            created: new Date(),
            content: post,
            autor: user?.nome,
            userId: user?.uid,
            likes: 0,
            avatarUrl,
        })
        .then(()=> {
            setPost('')
            console.log('Post criado com sucesso')
        })
        .catch((error) => {
            console.log('Error ao criar o post ', error)
        })

        navigation.goBack();
       
    }

    return(
        <Container>
            <Input
            placeholder='O que você está pensando?'
            placeholderTextColor="#DDD"
            value={post}
            onChangeText={(text) => setPost(text)}
            autoCorrect={false}
            multiline={true}
            maxLength={300}
            />

        </Container>
    )
}

export default NewPost;