import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  ButtonsView,
  Button
} from './styles';

interface UserCardProps {
  _id: string;
  setModalInfo?: (object: {id: string, action: "DeleteFriend" | "DeleteInvite"}) => void;
  disableButtons?: boolean;
}

const FriendButtons: React.FC<UserCardProps> = ({_id, disableButtons, setModalInfo}) =>
{
  if (disableButtons) return null;

  return (
    <ButtonsView>
      <Button onPress={setModalInfo ? () => setModalInfo({id: _id, action: "DeleteFriend"}) : ()=>{}} style={{backgroundColor: "#c50000"}}>
        <Icon name="trash" color="#fff" size={25}/>
      </Button>
    </ButtonsView>
  )
}

export default FriendButtons;
