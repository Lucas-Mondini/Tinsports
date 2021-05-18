import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';
import { formatName } from '../../utils/functions';

import {ButtonView, Container, Input, Label, SignInButton, SignInButtonText} from './styles';

const Register: React.FC = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [name, setName] = useState('jdascgas@gmail.com');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');

  async function checkIfIsLoggedIn() {
    const token = await AsyncStorage.getItem('auth_token');
    if(token) navigation.navigate('Main');
  }

  function formatUserName(userName: string){
    setName(formatName(userName));
  }

  const handleSignIn = useCallback(() =>{
    api.post(`/register/user`,{
      name, email, pass, confPass
    }).then(response => {
      navigation.navigate('Main');
    }).catch(err => console.log(err));
    
  },[navigation]);
  
  useEffect(() =>{
    checkIfIsLoggedIn();
  }, [isFocused]);

  return (
  
    <Container>
      <Label>Nome</Label>
      <Input 
        placeholder="Digite seu nome" 
        value={name}
        onChangeText={formatUserName}/>

      <Label>Email</Label>
      <Input 
        placeholder="Digite seu email" 
        value={email}
        onChangeText={setEmail}/>

      <Label>Senha</Label>
      <Input 
        placeholder="Digite sua senha" 
        value={pass} 
        secureTextEntry={true}
        onChangeText={setPass}/>

      <Label>Confirme sua senha</Label>
      <Input 
        placeholder="Digite sua senha novamente" 
        value={confPass} 
        secureTextEntry={true}
        onChangeText={setConfPass}/>
      
      <ButtonView>
        <SignInButton onPress={handleSignIn}>
          <SignInButtonText>Registrar</SignInButtonText>
        </SignInButton>
      </ButtonView>

    </Container>
  )
};

export default Register;
