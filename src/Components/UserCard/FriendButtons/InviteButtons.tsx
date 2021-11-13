import { useNavigation } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../../Contexts/Auth';
import { useRequest } from '../../../Contexts/Request';

import {
  ButtonsView,
  Button
} from './styles';

interface FriendsButtonsProps {
  _id: string;
  reloadFunction: () => void;
  setModalInfo?: (object: {id: string, action: "DeleteFriend" | "DeleteInvite"}) => void;
  disableButtons?: boolean;
}

const InviteButtons: React.FC<FriendsButtonsProps> = ({_id, disableButtons, reloadFunction, setModalInfo}) => {
  const {user, signOut} = useAuth();
  const { post } = useRequest();

  const navigation = useNavigation<any>();

  async function handleConfirmInvite() {
    try {
      if (!user) return signOut();

      await post(`/friend/confirm/${_id}`, ()=>{}, {});

      reloadFunction();
    } catch (error) {
      navigation.reset({index: 0, routes: [{name: "Main"}, {name: "Profile"}]});
    }
  }

  if (disableButtons) return null;

  return (
    <ButtonsView style={{flexDirection: 'row'}}>
      <Button onPress={handleConfirmInvite} style={{marginRight: 5, backgroundColor: "#268e01"}}>
        <Icon name="check-square-o" color="#fff" size={25}/>
      </Button>
      <Button onPress={setModalInfo ? () => setModalInfo({id: _id, action: "DeleteInvite"}) : ()=>{}}  style={{backgroundColor: "#c50000"}}>
        <Icon name="trash" color="#fff" size={25}/>
      </Button>
    </ButtonsView>
  );
}

export default InviteButtons;
