import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import CodeConfirmationModal from '../../Components/CodeConfirmationModal';
import Loading from '../../Components/Loading';
import MessageModal from '../../Components/MessageModal';
import { useAuth } from '../../Contexts/Auth';
import { useRequest } from '../../Contexts/Request';

import {
  ButtonView,
  Container,
  ForgotPassButton,
  ForgotPassButtonText,
  Input,
  Label,
  SignInButton,
  SignInButtonText
} from './styles';

const Login: React.FC = () =>
{
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [modal, setModal] = useState<any>();
  const [disableButton, setDisableButton] = useState(true);
  const [forgotPass, setForgotPass] = useState(false);
  const {signIn, loading} = useAuth();
  const {put, post} = useRequest();

  async function handleSignIn() {
    await signIn(email, pass, showModal);
  }

  async function changePass()
  {
    try {
      await post("forgot-pass", ()=>{}, {email: email}, true);

      setModal(
        <CodeConfirmationModal
          visible={true}
          setModal={() => setModal(null)}
          isChangePass
          email={email}
        />
      );
    } catch (error) {
      setModal(null);
    }
  }

  async function onPressFunction()
  {
    enableButton();

    if (!forgotPass) {
      handleSignIn();
    } else {
      changePass();
    }
  }

  function enableButton() {
    if ((email && email.trim() !== '') && (pass && pass.trim() !== '') ||
        forgotPass && (email && email.trim() !== '')) {
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

        {!forgotPass && <><Label>Senha</Label>
        <Input
          placeholder="Digite sua senha"
          placeholderTextColor="#b1b1b1"
          secureTextEntry
          value={pass}
          onChangeText={setPass}/></>}

        <ForgotPassButton activeOpacity={0.6} onPress={() => setForgotPass(!forgotPass)}>
          <ForgotPassButtonText>{!forgotPass?"Esqueci minha senha":"Digitar senha"}</ForgotPassButtonText>
        </ForgotPassButton>

        <ButtonView>
          <SignInButton
            disabled={disableButton}
            style={{backgroundColor: disableButton ? "#686868" : '#007e33'}}
            onPress={onPressFunction}
          >
            <SignInButtonText>{!forgotPass?"Entrar":"Redefinir senha"}</SignInButtonText>
          </SignInButton>
        </ButtonView>
      </ScrollView>
    </Container>
  );
};

export default Login;
