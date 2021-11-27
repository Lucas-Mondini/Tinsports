import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  ButtonsView,
  Button
} from './styles';

interface UserCardProps {
  _id: string;
  callback?: () => void;
  disableButtons?: boolean;
}

const FriendButtons: React.FC<UserCardProps> = ({_id, disableButtons, callback}) =>
{
  if (disableButtons) return null;

  return (
    <ButtonsView>
      <Button onPress={callback ? () => callback() : ()=>{}} style={{backgroundColor: "#c50000"}}>
        <Icon name="trash" color="#fff" size={25}/>
      </Button>
    </ButtonsView>
  )
}

export default FriendButtons;
