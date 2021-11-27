import { useNavigation } from '@react-navigation/native';
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
  const navigation = useNavigation();

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
      navigation.reset({index: 0, routes: [{name: "Main"}]});
    }
  }

  return (
    <AddFriendButton onPress={handleAddFriend}>
      <AddFriendButtonText>Adicionar</AddFriendButtonText>
    </AddFriendButton>
  );
}

export default AddFriendButtons;