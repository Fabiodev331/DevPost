import React, { useState, useContext, useCallback } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../contexts/auth";
import firestore from '@react-native-firebase/firestore';

import { ButtonPost, Container, ListPosts } from "./styles";
import Header from "../../componets/Header";
import PostList from '../../componets/PostList';

function Home(){
const navigation = useNavigation();
const { user } = useContext(AuthContext);

const [posts, setPosts] = useState ([])
const [loading, setLoading] = useState(true);

useFocusEffect(
    useCallback(()=>{
        let isActive = true;

        function fetchPosts(){
            firestore().collection('posts')
            .orderBy('created', 'desc')
            .limit(5)
            .get()
            .then((snapshot ) => {

                if(isActive){
                    setPosts([]);
                    const postList = [];

                    snapshot.docs.map( u => {
                        postList.push({
                            ...u.data(),
                            id: u.id,
                        })
                    })

                    setPosts(postList);
                    setLoading(false);
                }
            })
        }

        fetchPosts();

        return ()=>{
            isActive = false;
        }

    }, [])
)

    return(
        <Container>
            <Header/>

            { loading ? (
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <ActivityIndicator size={50} color='#e32246' />
                </View>
            ) : (
                <ListPosts
                    showsVerticalScrollIndicator={false}
                    data={posts}
                    renderItem={ ({item}) => (
                        <PostList
                            data={item}
                            userId={user?.uid}
                        />
                    )}
                />
            )}

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