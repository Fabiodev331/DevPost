import React, { useState } from "react";
import { View, Text } from "react-native";

import {Container, Title, Input, Button, ButtonText, SignUpButton, SignUpText} from '../Login/styles';

function Login(){
    const [login, setLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function toggleLogin(){
        setLogin(!login)

        setName('');
        setEmail('');
        setPassword('');
    }

    function handleSignIn(){
        if(email === '' || password === ''){
            console.log("PREENCHA TODOS OS CAMPOS PARA ENTRAR")
            return;
        }
    }
    
    function handleSignUp(){
        if(name === '' || email === '' || password === ''){
            console.log("PREENCHA TODOS OS CAMPOS PARA CADASTRAR")
            return;
        }
    }


    if(login){
        return(
            <Container>
                <Title>
                    Dev<Text style={{color: '#E52246'}}>Post</Text>
                </Title>
                
                <Input 
                    placeholder="Seuemail@teste.com"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
    
                <Input 
                    placeholder="******"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
    
                <Button onPress={handleSignIn} >
                    <ButtonText>Acessar</ButtonText>
                </Button>
    
                <SignUpButton onPress={toggleLogin} >
                    <SignUpText>Criar uma conta</SignUpText>
                </SignUpButton>
                
            </Container>
        )
    }

    return(
        <Container>
            <Title>
                Dev<Text style={{color: '#E52246'}}>Post</Text>
            </Title>

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
            />

            <Button onPress={handleSignUp} >
                <ButtonText>Cadastrar</ButtonText>
            </Button>

            <SignUpButton onPress={toggleLogin} >
                <SignUpText>Já tenho uma conta</SignUpText>
            </SignUpButton>
            
        </Container>
    )
}

export default Login;