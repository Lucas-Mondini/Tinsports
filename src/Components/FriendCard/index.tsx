import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, ImageSourcePropType, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import Metric from '../Metric';
import {
  ButtonsView,
  Button,
  ReputationText,
  ReputationView,
  User,
  UserInfo,
  UserName,
  UserPhoto
} from './styles';

interface UserCardProps {
  name: string;
  _id: string;
  photo: ImageSourcePropType;
  reputation: number;
  invite?: boolean;
  user_ID: string;
  reloadFunction: () => void;
  disableButtons?: boolean;
}

const FriendCard: React.FC<UserCardProps> = ({_id, user_ID, disableButtons, reloadFunction, invite, reputation, name, photo}) => {
  const {user, signOut} = useAuth();
  const navigation = useNavigation<any>();

  function handleDeleteFriend(invite: boolean = false) {
    let title = invite ? "Excluir convite de amizade" : "Excluir amigo";
    let text = invite ? "Tem certeza que deseja excluir o convite de amizade" :
                        "Tem certeza que deseja excluir o amigo";

    Alert.alert(title, text, [{
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

  function friendProfile() {
    navigation.push("Profile", {id: user_ID});
  }

  function handleFriendCardButtons() {
    let buttons;

    if (invite) {
      buttons = disableButtons ? null : (
        <ButtonsView style={{flexDirection: 'row'}}>
          <Button onPress={disableButtons ? ()=>{} :handleConfirmInvite} style={{marginRight: 5, backgroundColor: "#268e01"}}>
            <Icon name="check-square-o" color="#fff" size={25}/>
          </Button>
          <Button onPress={disableButtons ? ()=>{} :() => handleDeleteFriend(true)}  style={{backgroundColor: "#c50000"}}>
            <Icon name="trash" color="#fff" size={25}/>
          </Button>
        </ButtonsView>
      )
    } else {
      buttons = disableButtons ? null : (
        <ButtonsView>
          <Button onPress={disableButtons ? ()=>{} : () => handleDeleteFriend()} style={{backgroundColor: "#c50000"}}>
            <Icon name="trash" color="#fff" size={25}/>
          </Button>
        </ButtonsView>
      )
    }

    return buttons;
  }

  return (
    <User
      onLongPress={disableButtons ? ()=>{} : (invite ? () => handleDeleteFriend(true) : () => handleDeleteFriend())}
      onPress={friendProfile}
    >
      <UserPhoto source={typeof photo === 'string' ? {uri: photo} : photo} />
      <UserInfo>
        <View>
          <UserName>{name}</UserName>
          <ReputationView>
            <ReputationText>Reputação: </ReputationText>
            <Metric reputation={reputation} size={15}/>
          </ReputationView>
        </View>

        {handleFriendCardButtons()}
      </UserInfo>
    </User>
  );
}

export default FriendCard;
