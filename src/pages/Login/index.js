import React, { useState, useContext } from "react";
import { View, Text, ActivityIndicator } from "react-native";

import {Container, Title, Input, Button, ButtonText, SignUpButton, SignUpText} from '../Login/styles';

import { AuthContext } from "../../contexts/auth";

import * as Animatable from 'react-native-animatable';

const TitleAnimated = Animatable.createAnimatableComponent(Title);

function Login(){
    const [login, setLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { SignUp, SignIn, loadingAuth } = useContext(AuthContext);

    function toggleLogin(){
        setLogin(!login)

        setName('');
        setEmail('');
        setPassword('');
    }

    async function handleSignIn(){
        if(email === '' || password === ''){
            console.log("PREENCHA TODOS OS CAMPOS PARA ENTRAR")
            return;
        }

        await SignIn(email, password);
    }
    
    async function handleSignUp(){
        if(name === '' || email === '' || password === ''){
            console.log("PREENCHA TODOS OS CAMPOS PARA CADASTRAR")
            return;
        }

        await SignUp(email, password, name);
    }


    if(login){
        return(
            <Container>
                <TitleAnimated animation="flipInY" >
                    Dev<Text style={{color: '#E52246'}}>Post</Text>
                </TitleAnimated>
                
                <Input 
                    placeholder="Email@teste.com"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
    
                <Input 
                    placeholder="******"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
                />
    
                <Button onPress={handleSignIn} >
                    {loadingAuth ? <ActivityIndicator size={20} color='#FFF' /> 
                    : <ButtonText>Acessar</ButtonText>
                    }
                    
                </Button>
    
                <SignUpButton onPress={toggleLogin} >
                    <SignUpText>Criar uma conta</SignUpText>
                </SignUpButton>
                
            </Container>
        )
    }

    return(
        <Container>
            <TitleAnimated animation='flipInX' >
                Dev<Text style={{color: '#E52246'}}>Post</Text>
            </TitleAnimated>

            <Input 
                placeholder="Seu nome"
                value={name}
                onChangeText={(text) => setName(text)}
            />

           <Input 
                placeholder="Seuemail@teste.com"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />

            <Input 
                placeholder="******"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
            />

            <Button onPress={handleSignUp} >
                {loadingAuth ? <ActivityIndicator size={20} color='#FFF' />
                    : <ButtonText>Cadastrar</ButtonText>
                }
                
            </Button>

            <SignUpButton onPress={toggleLogin} >
                <SignUpText>Já tenho uma conta</SignUpText>
            </SignUpButton>
            
        </Container>
    )
}

export default Login;