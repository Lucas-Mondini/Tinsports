import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import api from '../../services/api';

import {ButtonView, Container, Input, Label, SignInButton, SignInButtonText} from './styles';

const Login: React.FC = () => {

  const [email, setEmail] = useState('jdascga@gmail.com');
  const [pass, setPass] = useState('123456');

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  async function checkIfIsLoggedIn() {
    const user = await AsyncStorage.getItem('user');
    if(user) {
      const {auth_token} = JSON.parse(user);
      if(auth_token) navigation.navigate('Main');
    }
  }

  useEffect(() =>{
    checkIfIsLoggedIn();
  }, [isFocused]);

  const handleSignIn = useCallback(async () =>{
    const response = await api.post(`/login`,{
      email, pass
    });
    
    await AsyncStorage.setItem("user", JSON.stringify(response.data));
    
    navigation.reset({index: 0, routes:[{name: 'Main'}]});
  },[navigation]);

  return (

    <Container>
      <Label>Email</Label>
      <Input 
        placeholder="Digite seu email"
        value={email} 
        onChangeText={setEmail}/>

      <Label>Senha</Label>
      <Input 
        placeholder="Digite sua senha" 
        secureTextEntry={true} 
        value={pass} 
        onChangeText={setPass}/>
      
      <ButtonView>
        <SignInButton onPress={handleSignIn}>
          <SignInButtonText>Entrar</SignInButtonText>
        </SignInButton>
      </ButtonView>
    </Container>
    
  );
};

export default Login;
