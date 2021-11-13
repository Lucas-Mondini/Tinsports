import React from 'react';
import { Modal } from 'react-native';
import Loading from '../Loading';

import {
  ModalBackground,
  ModalContent
} from './styles';

type ModalProps = {
  visible: boolean;
  loading: boolean;
  setModal: () => void;
  children: React.ReactNode;
  animationType?: "slide" | "none" | "fade";
  style?: object;
}

const DefaultModal: React.FC<ModalProps> = ({visible, loading, setModal, children, animationType, style}) =>
{
  return (
    <Modal transparent onRequestClose={setModal} visible={visible} animationType={animationType}>
      <ModalBackground>
        <ModalContent style={style ? style : {flex: 1}}>
          {loading ? <Loading styles={{borderRadius: 8}} /> : children}
        </ModalContent>
      </ModalBackground>
    </Modal>
  );
}

export default DefaultModal;