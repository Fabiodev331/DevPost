import React, { useContext, useState } from "react";
import { View, Text, Modal, Platform} from "react-native";

import firestore from '@react-native-firebase/firestore';

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
    ModalContainer,
    ButtonBack,
    Input,

} from "./styles";

import Feather from 'react-native-vector-icons/Feather';

import Header from "../../componets/Header";

function Profile(){
    const { signOut, user, setUser, storageUser } = useContext(AuthContext)

    const [nome, setNome] = useState(user?.nome);
    const [url, setUrl] = useState('https://sujeitoprogramador.com/steve.png');
    const [openModal, setOpenModal] = useState(false);

    async function handleSignOut(){
        signOut();
    }

    async function updateProfile(){
        if(nome === ''){
            return;
        }

        await firestore().collection('users')
        .doc(user?.uid)
        .update({
            nome: nome
        })

        const postDocs = await firestore().collection('posts')
        .where('userId', '==', user?.uid).get();

        postDocs.forEach( async doc => {
            await firestore().collection('posts').doc(doc.id)
            .update({
                autor: nome,
            })
        } )

        let data = {
            uid: user.uid,
            nome: nome,
            email: user.email,
        }

        setUser(data);
        storageUser(data);
        setOpenModal(false);

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

            <Button bg="#428cfd" onPress={() => setOpenModal(true)}>
                <ButtonText color="#FFF" >Atualizar perfil</ButtonText>
            </Button>

            <Button bg="#DDD" onPress={handleSignOut} >
                <ButtonText color="#353840" >Sair</ButtonText>
            </Button>

            <Modal visible={openModal} animationType="slide" transparent={true}>
                <ModalContainer behavior={Platform.OS === 'android' ? '' : 'padding'} >
                    <ButtonBack onPress={ () => setOpenModal(false)}>
                        <Feather
                        name="arrow-left"
                        size={22}
                        color="#121212"
                        style={{paddingRight: 5}}
                        />
                        
                        <ButtonText color="#121212" >Voltar</ButtonText>
                    </ButtonBack>


                    <Input
                        placeholder={user?.nome}
                        value={nome}
                        onChangeText={(text) => setNome(text) }
                    />

                    <Button bg="#428cfd" onPress={ updateProfile } >
                        <ButtonText color="#FFF" >Salvar</ButtonText>
                    </Button>
                </ModalContainer>
            </Modal>

        </Container>
    )
}

export default Profile;