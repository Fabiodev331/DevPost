import React from "react";
import { View, Text } from "react-native";
import Feather from 'react-native-vector-icons/Feather';

import { useNavigation } from "@react-navigation/native";

import { ButtonPost, Container } from "./styles";

function Home(){
const navigation = useNavigation();

    return(
        <Container>
            <ButtonPost 
            activeOpacity={0.5} 
            onPress={() => navigation.navigate('NewPost') }
            >
                <Feather 
                    name='edit-2' 
                    size={25} 
                    color='#fff' 
                />
            </ButtonPost>
        </Container>
    )
}

export default Home;