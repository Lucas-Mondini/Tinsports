import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { useAuth } from '../../../Contexts/Auth';
import { useRequest } from '../../../Contexts/Request';
import {
  AddFriendButton,
  AddFriendButtonText,
  ButtonsView
} from './styles';

interface AddFriendButtonsProps  {
  _id: string;
  reloadFunction?: () => void;
}

const AddFriendButtons: React.FC<AddFriendButtonsProps> = ({_id, reloadFunction}) =>
{
  const { user, signOut } = useAuth();
  const {post} = useRequest();
  const navigation = useNavigation<any>();

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
    <ButtonsView>
      <AddFriendButton onPress={handleAddFriend}>
        <AddFriendButtonText>Adicionar</AddFriendButtonText>
      </AddFriendButton>
    </ButtonsView>
  );
}

export default AddFriendButtons;