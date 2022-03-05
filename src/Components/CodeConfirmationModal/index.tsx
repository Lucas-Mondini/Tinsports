import React, {  useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { useAuth } from '../../Contexts/Auth';
import { useRequest } from '../../Contexts/Request';
import DefaultModal from '../DefaultModal';
import Input from '../Input';
import GenericMessageModal from '../GenericMessageModal';

import {
  Title,
  ButtonText,
  CancelButton,
  CancelText,
  ChangePasswordText,
  ConfirmButton,
  Footer,
  ModalContainer,
} from './styles';

type ModalProps = {
  visible: boolean;
  setModal: () => void;
  isChangePass?: boolean,
  email?: string
}

const CodeConfirmationModal: React.FC<ModalProps> = ({visible, setModal, isChangePass, email}) =>
{
  const { user, checkLogin, setUser, setTemporaryToken } = useAuth();
  const {put, post} = useRequest();

  const [loading, setLoading] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [code, setCode] = useState('');
  const [pass, setPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [messageModal, setMessageModal] = useState<any>(null);

  function onPressFunction()
  {
    if (changePassword) {
      updatePass();
    } else {
      sendCode();
    }
  }

  async function sendCode()
  {
    try {
      if (!isChangePass) {
        await post(`/code`, setLoading, {code});
        await checkLogin();
        return setModal();
      } else {
        const response = await post(`/code`, setLoading, {code, email}, true);

        setTemporaryToken(response);
        setChangePassword(true);
      }
    } catch (err: any) {
      setLoading(false);

      if (err.response && err.response.status === 401)
        return showModal("IncorrectCode");
    }
  }

  async function updatePass()
  {
    try {
      if (pass !== confirmPass) {
        return showModal("PasswordsDontMatch");
      }

      const response = await put(`/change-pass`, setLoading, {pass});

      setModal();
      setUser(response);
      setTemporaryToken("");
    } catch (err: any) {
      setLoading(false);

      if (err.response && err.response.status === 401)
        return showModal("IncorrectCode");
    }
  }

  function enableButton() {
    if (!changePassword && code.trim()){
      setDisableButton(false);
    } else if (changePassword && pass.trim() && confirmPass.trim()) {
      setDisableButton(false);
    } else setDisableButton(true);
  }

  function showModal(type: "IncorrectCode" | "PasswordsDontMatch")
  {
    setMessageModal(
      <GenericMessageModal
        setModal={() => setMessageModal(null)}
        type={type}
      />
    );
  }

  useEffect(() => {
    if (visible) enableButton();
  }, [visible, code, pass, confirmPass]);

  return (
    <DefaultModal loading={loading} setModal={setModal} visible={visible} animationType="slide">

      {messageModal && messageModal}

      <Title>{!changePassword
        ?"Enviamos um código para seu e-mail, digite-o no campo abaixo para confirmar sua conta"
        :"Digite sua nova senha"
      }</Title>

      <ModalContainer>
        {!changePassword ?
          <Input
            style={{marginLeft: '3%', marginRight: '3%'}}
            label="Código"
            icon="code"
            size={28}
            value={code}
            autoCapitalize="words"
            setValue={setCode}
            numeric
          /> : <>
            <Input
              style={{marginLeft: '3%', marginRight: '3%'}}
              label="Nova senha"
              value={pass}
              icon="lock"
              size={28}
              secureTextEntry
              setValue={setPass}
            />

            <Input
              style={{marginLeft: '3%', marginRight: '3%'}}
              label="Confirme sua senha"
              value={confirmPass}
              icon="unlock"
              size={27}
              secureTextEntry
              setValue={setConfirmPass}
            />
          </>
          }

      </ModalContainer>

      <View style={{marginTop: 30}}/>

      <Footer>
        <ConfirmButton
          onPress={onPressFunction}
          style={{
            backgroundColor: disableButton ? '#686868' : "#2FB400",
            height: Dimensions.get("window").width <= 320 ? 30 : 40,
            width: Dimensions.get("window").width <= 320 ? 130 : 150
          }}
        >
          <ButtonText>Confirmar</ButtonText>
        </ConfirmButton>

        <CancelButton onPress={setModal}>
          <CancelText>Cancelar</CancelText>
        </CancelButton>
      </Footer>
    </DefaultModal>
  );
}

export default CodeConfirmationModal;