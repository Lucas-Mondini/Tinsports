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
    const user = await AsyncStorage.getItem('user');
    if(user) navigation.navigate('Main');
  }

  function formatUserName(userName: string){
    setName(formatName(userName));
  }

  const handleSignIn = useCallback(async () =>{
    const response = await api.post(`/register/user`,{
      name, email, pass, confPass
    });
    
    await AsyncStorage.setItem('user', JSON.stringify(response.data));
    
    navigation.reset({index: 0, routes:[{name: 'Main'}]});
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
