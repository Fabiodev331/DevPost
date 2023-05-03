import React, { useState, createContext } from "react";

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'

export const AuthContext = createContext({});

function AuthProvider({ children }){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);


    async function SignUp(email, password, name){
        setLoading(true);
        await auth().createUserWithEmailAndPassword(email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await firestore().collection('users')
            .doc(uid).set({
                nome: name,
                createdAt: new Date(),
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email
                }
    
                setUser(data);
                setLoading(false);
            })
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    async function SignIn(email, password){
        setLoading(true);
        await auth().signInWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;
            const userProfile = await firestore().collection('users')
            .doc(uid).get();

            let data = {
                uid: uid,
                nome: userProfile.data().nome,
                email: value.user.email
            }

            setUser(data);
            setLoading(false);

        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })     
        
    }


    return(
        <AuthContext.Provider value={{ signed: !!user, SignUp, SignIn, loading }} >
            { children }
        </AuthContext.Provider>
    )
}

export default AuthProvider;