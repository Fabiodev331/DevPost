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

    const [loadingRefresh, setLoadingRefrash] = useState(false);
    const [lastItem, setLastItem] = useState('');
    const [emptyList, setEmptyList] = useState(false);


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
                        setLastItem(snapshot.docs[snapshot.docs.length -1]);
                        setEmptyList(!!snapshot.empty);
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

    async function handleRefreshPost(){
        setLoadingRefrash(true);

        firestore().collection('posts')
            .orderBy('created', 'desc')
            .limit(5)
            .get()
            .then((snapshot ) => {

                    
                setPosts([]);
                const postList = [];

                snapshot.docs.map( u => {
                    postList.push({
                        ...u.data(),
                        id: u.id,
                    })
                })

                setPosts(postList);
                setLastItem(snapshot.docs[snapshot.docs.length -1]);
                setEmptyList(false);
                setLoading(false);
                    
            })

            setLoadingRefrash(false);

    }

    async function getListPost(){
        if(emptyList){
            setLoading(false);
            return null;
        }
        
        if(loading) return;

        firestore().collection('posts')
            .orderBy('created', 'desc')
            .limit(5)
            .startAfter(lastItem)
            .get()
            .then((snapshot) => {
                const postList = [];

                snapshot.docs.map( u => {
                    postList.push({
                        ...u.data(),
                        id: u.id,
                    })
                })

                setEmptyList(!!snapshot.empty);
                setLastItem(snapshot.docs[snapshot.docs.length -1]);
                setPosts(oldPosts => [...oldPosts, ...postList]);
                setLoading(false);
                    
            })

            setLoadingRefrash(false);

    }

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

                    refreshing={loadingRefresh}
                    onRefresh={ handleRefreshPost }
                    onEndReached={() => getListPost()}
                    onEndReachedThreshold={0.1}
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