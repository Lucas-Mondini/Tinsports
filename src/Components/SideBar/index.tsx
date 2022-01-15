import React from 'react';
import { Modal, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useAuth } from '../../Contexts/Auth';
import { EditButton } from '../Gesture/styles';
import Option from '../Option';

import {
  ButtonView,
  CloseButton,
  ModalBackground,
  ModalContent
} from './styles';

type ModalProps = {
  visible: boolean;
  setModal: () => void;
  style?: object;
}

const SideBar: React.FC<ModalProps> = ({visible, setModal, style}) =>
{
  const {signOut} = useAuth();

  return (
    <Modal transparent onRequestClose={setModal} visible={visible}  style={{flexDirection: "row"}} animationType="fade">
      <ModalBackground>
        <ModalContent style={style ? style : {flex: 1}}>

          <View style={{height: '8%'}}>
            <Option
              text="Sair"
              icon={{name: "exit", size: 35, ionicons: true}}
              actions={signOut}
            />
          </View>

          <ButtonView>
            <CloseButton onPress={setModal}>
              <Icon name="close" size={25} color="#686868"/>
            </CloseButton>
          </ButtonView>
        </ModalContent>
      </ModalBackground>
    </Modal>
  );
}

export default SideBar;