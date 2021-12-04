import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import Loading from '../../Components/Loading';
import MessageModal from '../../Components/MessageModal';
import { useAuth } from '../../Contexts/Auth';

import {ButtonView, Container, Input, Label, SignInButton, SignInButtonText} from './styles';

const Login: React.FC = () =>
{
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [modal, setModal] = useState<any>();
  const [disableButton, setDisableButton] = useState(true);
  const {signIn, loading} = useAuth();

  async function handleSignIn() {
    await signIn(email, pass, showModal);
  }

  function enableButton() {
    if ((email && email.trim() !== '')
        && (pass && pass.trim() !== '')
       )
        {
          setDisableButton(false);
        } else setDisableButton(true);
  }

  function showModal()
  {
    let modalInfo: any = {message:{title: "Email ou senha incorreto",
                                   message: "Certifique-se que digitou seu e-mail e senha corretamente"}};

    setModal(
      <MessageModal
        visible={true}
        loading={loading}
        setModal={() => setModal(null)}
        message={modalInfo.message}
        buttons={modalInfo.buttons}
      />
    );
  }

  useEffect(() => {
    enableButton();
  }, [email, pass]);

  if (loading) return <Loading />;

  return (
    <Container>
      {modal && modal}
      <ScrollView>
        <Label>Email</Label>
        <Input
          autoCompleteType="email"
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
  );
};

export default Login;
