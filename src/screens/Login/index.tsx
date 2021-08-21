import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import Loading from '../../Components/Loading';
import { useAuth } from '../../Contexts/Auth';

import {ButtonView, Container, Input, Label, SignInButton, SignInButtonText} from './styles';

const Login: React.FC = () => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [disableButton, setDisableButton] = useState(true);
  const {signIn, loading} = useAuth();

  async function handleSignIn() {
    await signIn(email, pass);
  }

  function enableButton() {
    if ((email && email.trim() !== '')
        && (pass && pass.trim() !== '')
       )
        {
          setDisableButton(false);
        } else setDisableButton(true);
  }

  useEffect(() => {
    enableButton();
  }, [email, pass]);

  function load() {
    if (loading) return <Loading />
    else {
      return (
        <Container>
          <ScrollView>
            <Label>Email</Label>
            <Input
              placeholder="Digite seu email"
              placeholderTextColor="#b1b1b1"
              value={email}
              onChangeText={setEmail}/>

            <Label>Senha</Label>
            <Input
              placeholder="Digite sua senha"
              placeholderTextColor="#b1b1b1"
              secureTextEntry
              value={pass}
              onChangeText={setPass}/>

            <ButtonView>
              <SignInButton
                disabled={disableButton}
                style={{backgroundColor: disableButton ? "#686868" : '#007e33'}}
                onPress={handleSignIn}
              >
                <SignInButtonText>Entrar</SignInButtonText>
              </SignInButton>
            </ButtonView>
          </ScrollView>
        </Container>
      )
    }
  }

  return load();
};

export default Login;
