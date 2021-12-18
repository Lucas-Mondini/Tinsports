import React from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';

import{DeleteButton, EditButton} from './styles';

interface GestureProps{
  children: React.ReactNode;
  buttons?: Button[];
}

interface Button {
  type: "Delete" | "Edit" | "Confirm" | "Cancel";
  function: () => void;
}

const Gesture: React.FC<GestureProps> = ({children, buttons}) => {

  function getLeftContent()
  {
    if (!buttons) return null;

    const btns = new Array();
    let key = 0;

    for (const button of buttons) {
      let btn;

      switch (button.type) {
        case "Delete":
          btn = <DeleteButton key={key} onPress={() => button.function()}><Icon name="trash" size={30} color="#fff"/></DeleteButton>
          break;
        case "Edit":
          btn = <EditButton key={key} onPress={() => button.function()}><Icon name="pen" size={30} color="#fff"/></EditButton>
          break;
        case "Confirm":
          btn = <EditButton key={key} onPress={() => button.function()}><Icon name="check" size={30} color="#fff"/></EditButton>
          break;
        case "Cancel":
          btn = <DeleteButton key={key} onPress={() => button.function()}><Icon name="trash" size={30} color="#fff"/></DeleteButton>
          break;
      }

      key++;
      btns.push(btn);
    }

    return btns;
  }

  return (
    <Swipeable
      renderLeftActions={getLeftContent}
    >
      {children}
    </Swipeable>
  );
}

export default Gesture;