import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../../Contexts/Auth';
import api from '../../../services/api';
import {
  ButtonsView,
  Button
} from './styles';

interface FriendsButtonsProps {
  _id: string;
  reloadFunction: () => void;
  disableButtons?: boolean;
}

const InviteButtons: React.FC<FriendsButtonsProps> = ({_id, disableButtons, reloadFunction}) => {
  const {user, signOut} = useAuth();
  const navigation = useNavigation<any>();

  function handleDeleteFriend()
  {
    Alert.alert("Excluir convite de amizade",
                "Tem certeza que deseja excluir o convite de amizade",
                [{
                text: "Sim",
                async onPress() {
                  try {
                    if (!user) return signOut();

                    await api.delete(`/friend/${_id}`, {
                      headers: {
                        auth_token: user.auth_token,
                      }
                    });

                    reloadFunction();
                  } catch (error) {
                    navigation.reset({index: 0, routes: [{name: "Main"}, {name: "Profile"}]});
                  }
                }
              }, {text: "Não"}]);
  }

  async function handleConfirmInvite() {
    try {
      if (!user) return signOut();

      await api.post(`/friend/confirm/${_id}`, {}, {
        headers: {
          auth_token: user.auth_token,
        }
      });

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
      <Button onPress={handleDeleteFriend}  style={{backgroundColor: "#c50000"}}>
        <Icon name="trash" color="#fff" size={25}/>
      </Button>
    </ButtonsView>
  );
}

export default InviteButtons;
