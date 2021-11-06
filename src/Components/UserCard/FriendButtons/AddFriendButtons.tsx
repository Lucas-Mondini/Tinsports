import React from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../../../Contexts/Auth';
import { useRequest } from '../../../Contexts/Request';
import {
  AddFriendButton,
  AddFriendButtonText
} from './styles';

interface AddFriendButtonsProps  {
  _id: string;
  reloadFunction?: () => void;
}

const AddFriendButtons: React.FC<AddFriendButtonsProps> = ({_id, reloadFunction}) =>
{
  const { user, signOut } = useAuth();
  const {post} = useRequest();

  async function handleAddFriend()
  {
    if (!user) return signOut();

    try {
      await post('/friend', () => {}, {
        user_ID: user._id,
        friend_ID: _id
      });

      if (reloadFunction) reloadFunction();
    } catch(err: any) {
      if (err.response && err.response.status === 401) {
        Alert.alert("Amigos", "Você já enviou convite de amizade para esse usuário ou vocês já são amigos");
      }
    }
  }

  return (
    <AddFriendButton onPress={handleAddFriend}>
      <AddFriendButtonText>Adicionar</AddFriendButtonText>
    </AddFriendButton>
  );
}

export default AddFriendButtons;