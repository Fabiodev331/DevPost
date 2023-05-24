import React, { useState } from "react";
import { View, Text } from "react-native";
import Feather from 'react-native-vector-icons/Feather';

import { useNavigation } from "@react-navigation/native";

import { ButtonPost, Container, ListPosts } from "./styles";
import Header from "../../componets/Header";

function Home(){
const navigation = useNavigation();
const [posts, setPosts] = useState ([
    {id: '1', content: 'Teste'},
    {id: '2', content: 'Teste'},
    {id: '3', content: 'Teste'},
    {id: '4', content: 'Teste'},
])

    return(
        <Container>
            <Header/>

            <ListPosts
                data={posts}
                renderItem={ (item) => (<Text>Teste</Text>)}
            />

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