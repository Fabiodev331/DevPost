import React, { useState, useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button, ButtonText, Container, Input } from "./styles";

function NewPost(){
    const navigation = useNavigation();
    const [post, setPost] = useState('');

    useLayoutEffect(() => {

        const options = navigation.setOptions({
            headerRight: () => (
                <Button>
                    <ButtonText>Compartilhar</ButtonText>
                </Button>
            )
        })

    }, [navigation, post])

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