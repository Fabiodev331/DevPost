import React, { useContext, useState } from "react";
import { View, Text} from "react-native";

import { AuthContext } from "../../contexts/auth";
import { 
    Container, 
    Name, 
    Email, 
    Button, 
    ButtonText,
    UploadButton,
    UploadText,
    Avatar,

} from "./styles";

import Header from "../../componets/Header";

function Profile(){
    const { signOut, user } = useContext(AuthContext)

    const [nome, setNome] = useState(user?.nome);
    const [url, setUrl] = useState('https://sujeitoprogramador.com/steve.png');

    async function handleSignOut(){
        signOut();
    }

    return(
        <Container>
            <Header/>

            {url ? (
                <UploadButton onPress={() => alert('clicou1')} >
                    <UploadText>+</UploadText>
                    <Avatar
                        source={{uri: url}}
                    />

                </UploadButton>
            ) : (
                <UploadButton onPress={() => alert('clicou2')}>
                    <UploadText>+</UploadText>
                </UploadButton>
            )}

            <Name>{user?.nome}</Name>
            <Email>{user?.email}</Email>

            <Button bg="#428cfd">
                <ButtonText color="#FFF" >Atualizar perfil</ButtonText>
            </Button>

            <Button bg="#DDD" onPress={handleSignOut} >
                <ButtonText color="#353840" >Sair</ButtonText>
            </Button>

        </Container>
    )
}

export default Profile;