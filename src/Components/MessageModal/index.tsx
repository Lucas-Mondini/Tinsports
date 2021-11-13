import React from 'react';
import DefaultModal from '../DefaultModal';

import {
  Button,
  ButtonsView,
  ButtonText,
  Message,
  MessageTitle
} from './styles';

type MessageModalProps = {
  message: {title: string, message: string}
  visible: boolean;
  loading: boolean;
  setModal: () => void;
  buttons?: Button[]
}

type Button = {
  text: string;
  color: "green" | "red" | "yellow";
  function: () => void;
  style?: object;
}

const MessageModal: React.FC<MessageModalProps> = ({message, visible, loading, setModal, buttons}) =>
{
  function renderButtons()
  {
    let buttonsArray: any;
    let justifyContent: "center" | "space-between";

    if (!buttons) {
      justifyContent = "center";
      buttonsArray = <Button onPress={setModal} style={{backgroundColor: "#268E01"}}><ButtonText>OK</ButtonText></Button>
    } else {
      buttonsArray = [];
      justifyContent = "space-between";

      let i = 0;

      for (const button of buttons) {
        const buttonColor = button.color === "green" ? "#268E01" : (button.color === "red" ? "#C50000" : "");

        buttonsArray.push(
          <Button
            key={button.text}
            onPress={button.function}
            style={{backgroundColor: buttonColor, marginLeft: i > 0 ? 5 : 0}}
          >
            <ButtonText>{button.text}</ButtonText>
          </Button>
        );

        i++
      }
    }

    return <ButtonsView style={{flexDirection: "row"}}>{buttonsArray}</ButtonsView>
  }

  return (
    <DefaultModal
      setModal={setModal}
      loading={loading}
      visible={visible}
      animationType={"slide"}
      style={{flex: 0, marginTop: "50%", height: "30%", paddingTop: 20}}
    >
      <MessageTitle>{message.title}</MessageTitle>

      <Message>{message.message}</Message>

      {renderButtons()}
    </DefaultModal>
  );
}

export default MessageModal;