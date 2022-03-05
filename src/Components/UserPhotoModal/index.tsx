import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Modal } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../Contexts/Auth';

import NoContent from '../NoContent';
import {
  ButtonText,
  CancelButton,
  CancelText,
  ConfirmButton,
  Footer,
  ContentView,
  ModalBackground,
  ModalContent,
  PhotoView,
  PhotoButtonsView,
  SendPhotoButton
} from './styles';
import DefaultModal from '../DefaultModal';
import { useRequest } from '../../Contexts/Request';
import { PhotoType } from '../../utils/types';

type ModalProps = {
  visible: boolean;
  setModal: () => void;
  reloadFunction: () => void;
}

const UserPhotoModal: React.FC<ModalProps> = ({visible, setModal, reloadFunction}) =>
{
  const { user } = useAuth();
  const {put, uploadPhoto} = useRequest();

  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState<PhotoType>();
  const [disableButton, setDisableButton] = useState(true);


  function takePhoto()
  {
    launchCamera({
      mediaType: 'photo',
      maxHeight: 800
    }, (res) => {
      if (res && res.assets && !res.didCancel) {
        setDisableButton(false);
        setPhoto({uri: res.assets[0].uri});
      }
    });
  }

  function pickPhoto()
  {
    launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 800
    }, res => {
      if (res && res.assets && !res.didCancel) {
        setDisableButton(false);
        setPhoto({uri: res.assets[0].uri});
      }
    });
  }

  async function sendImage()
  {
    try {
      const photoUrl = await uploadPhoto(`PICTURES_DIRECTORY/${user?._id}`, setLoading, photo);

      await put("/register/photo", setLoading, {
        photoUrl
      });

      reloadFunction();
      setModal();
    } catch (err: any) {
      setLoading(false);
      setModal();
    }
  }

  useEffect(() => {
    if (visible) !photo?.uri && setDisableButton(true);
  }, [visible]);

  return (
    <DefaultModal loading={loading} setModal={() => {
        setPhoto({uri: ""});
        setModal();
      }} visible={visible} animationType="fade">

      <ContentView>
        <PhotoView>
          {!photo?.uri
            ? <NoContent text="Sem foto para enviar"/>
            : <Image style={{
                width: '100%',
                height: Dimensions.get('window').width * 3/4,
                resizeMode: 'center'
              }}
              source={{uri: photo.uri}}
            />}
        </PhotoView>

        <PhotoButtonsView>
          <SendPhotoButton onPress={takePhoto}>
            <Icon name="camera" size={15} color="#fff" style={{marginRight: 5}}/>
            <ButtonText>Tirar foto</ButtonText>
          </SendPhotoButton>

          <SendPhotoButton onPress={pickPhoto}>
            <Icon name="photo" size={15} color="#fff" style={{marginRight: 5}}/>
            <ButtonText>Enviar foto</ButtonText>
          </SendPhotoButton>
        </PhotoButtonsView>
      </ContentView>

      <Footer>
        <ConfirmButton
          onPress={sendImage}
          disabled={disableButton}
          style={{
            backgroundColor: disableButton ? "#686868" : '#2FB400',
            height: Dimensions.get("window").width <= 320 ? 30 : 40,
            width: Dimensions.get("window").width <= 320 ? 130 : 150
          }}
        >
          <ButtonText>Enviar</ButtonText>
        </ConfirmButton>

        <CancelButton onPress={() => {
          setPhoto({uri: ""});
          setModal();
        }}>
          <CancelText>Cancelar</CancelText>
        </CancelButton>
      </Footer>
    </DefaultModal>
  );
}

export default UserPhotoModal;