import React, {  useEffect, useState } from 'react';
import { Alert, Dimensions, View } from 'react-native';
import { useAuth } from '../../Contexts/Auth';
import { useRequest } from '../../Contexts/Request';
import DefaultModal from '../DefaultModal';
import Input from '../Input';
import GenericMessageModal from '../GenericMessageModal';

import {
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
  reloadFunction: () => void;
}

const EditProfileModal: React.FC<ModalProps> = ({visible, setModal, reloadFunction}) =>
{
  const { user } = useAuth();
  const {put} = useRequest();

  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [messageModal, setMessageModal] = useState<any>(null);

  const [userInfo, setUserInfo] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  async function updateUser()
  {
    try {
      if (userInfo.newPassword !== userInfo.confirmNewPassword) {
        return showModal("PasswordsDontMatch");
      }

      await put(`/register/user`, setLoading, {
        newName: userInfo.name,
        newEmail: userInfo.email,
        newPass: userInfo.newPassword,
        pass: userInfo.password
      });

      setModal();
      setUserInfo({...userInfo, password: ""});
      reloadFunction();
    } catch (err: any) {
      setLoading(false);

      if (err.message == 401)
        return showModal("IncorrectPassword");
    }
  }

  function enableButton() {
    if ((userInfo.name && userInfo.name.trim() !== '')
        && (userInfo.email && userInfo.email.trim() !== '')
        && (userInfo.password && userInfo.password.trim() !== '')
       )
        {
          setDisableButton(false);
        } else setDisableButton(true);
  }

  function showModal(type: any)
  {
    setMessageModal(
      <GenericMessageModal
        type={type}
        setModal={() => setMessageModal(null)}
      />
    );
  }

  useEffect(() => {
    if (visible) enableButton();
  }, [visible, userInfo]);

  return (
    <DefaultModal loading={loading} setModal={setModal} visible={visible} animationType="slide">

      {messageModal && messageModal}

      <ModalContainer>
        <Input
          style={{marginLeft: '3%', marginRight: '3%'}}
          label="Nome"
          icon="user"
          size={28}
          value={userInfo.name}
          autoCapitalize="words"
          setValue={value => setUserInfo({...userInfo, name: value})}
        />
        <Input
          style={{marginLeft: '3%', marginRight: '3%'}}
          label="Email"
          value={userInfo.email}
          icon="at"
          size={28}
          setValue={value => setUserInfo({...userInfo, email: value})}
        />

        <Input
          style={{marginLeft: '3%', marginRight: '3%'}}
          label="Sua senha atual"
          value={userInfo.password}
          icon="unlock"
          size={27}
          secureTextEntry
          setValue={value => setUserInfo({...userInfo, password: value})}
        />

        <ChangePasswordText>Mudar senha?</ChangePasswordText>
        <Input
          style={{marginLeft: '3%', marginRight: '3%'}}
          label="Nova senha"
          value={userInfo.newPassword}
          icon="lock"
          size={28}
          secureTextEntry
          setValue={value => setUserInfo({...userInfo, newPassword: value})}
        />
        <Input
          style={{marginLeft: '3%', marginRight: '3%', paddingBottom: 50}}
          label="Confirme a nova senha"
          value={userInfo.confirmNewPassword}
          icon="unlock-alt"
          size={28}
          secureTextEntry
          setValue={value => setUserInfo({...userInfo, confirmNewPassword: value})}
        />

      </ModalContainer>

      <View style={{marginTop: 30}}/>

      <Footer>
        <ConfirmButton
          onPress={updateUser}
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

export default EditProfileModal;