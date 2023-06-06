import React, { useLayoutEffect, useState, useCallback, useContext} from "react";
import { View, Text, ActivityIndicator } from "react-native";

import { AuthContext } from "../../contexts/auth";

import { useRoute, useNavigation, useFocusEffect } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';

import PostList from "../../componets/PostList";
import { Container, ListPosts } from "./styles";

function PostsUser(){
    const route = useRoute();
    const navigation = useNavigation();
    const { user } = useContext(AuthContext);

    const [title, setTitle] = useState(route.params?.title)
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: title === '' ? '' : title
        })

    },[navigation, title])

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            firestore().collection('posts')
            .where('userId', "==", route.params?.userId )
            .orderBy('created', 'desc')
            .get()
            .then((snapshot) => {
                const postList = [];

                snapshot.docs.map( u => {
                    postList.push({
                        ...u.data(),
                        id: u.id,
                    })
                })

                if(isActive){
                    setPosts(postList);
                    setLoading(false);
                }
            } )

            return () => {
                isActive = false;
            }
        }, [])
    )

    return(
        <Container>
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
                            userId={user.uid}
                        />
                    )}

                />
            )}
        </Container>
    )
}

export default PostsUser;