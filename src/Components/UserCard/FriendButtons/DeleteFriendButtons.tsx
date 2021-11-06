import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../../Contexts/Auth';
import { useRequest } from '../../../Contexts/Request';

import {
  ButtonsView,
  Button
} from './styles';

interface UserCardProps {
  _id: string;
  reloadFunction: () => void;
  disableButtons?: boolean;
}

const FriendButtons: React.FC<UserCardProps> = ({_id, disableButtons, reloadFunction}) =>
{
  const {user, signOut} = useAuth();
  const { destroy } = useRequest();

  const navigation = useNavigation<any>();

  function handleDeleteFriend()
  {
    Alert.alert("Excluir amigo",
                "Tem certeza que deseja excluir o amigo",
                [{
                  text: "Sim",
                  async onPress() {
                    try {
                      await destroy(`/friend/${_id}`, reloadFunction);
                    } catch (error) {
                      navigation.reset({index: 0, routes: [{name: "Main"}, {name: "Profile"}]});
                    }
                  }
                }, {text: "Não"}]);
  }

  if (disableButtons) return null;

  return (
    <ButtonsView>
      <Button onPress={handleDeleteFriend} style={{backgroundColor: "#c50000"}}>
        <Icon name="trash" color="#fff" size={25}/>
      </Button>
    </ButtonsView>
  )
}

export default FriendButtons;
