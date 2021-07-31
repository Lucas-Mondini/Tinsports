import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, ImageSourcePropType, View } from 'react-native';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import Metric from '../Metric';
import {
  UnconfirmedText,
  User,
  UserInfo,
  UserName,
  UserPhoto,
  ReputationText,
  ReputationView,
  ConfirmedText,
  AddFriendButton,
  AddFriendButtonText
} from './styles';

interface UserCardProps{
  name: string;
  id: string;
  invitationId?: string;
  reputation: number;
  photo: ImageSourcePropType;
  confirmation?: boolean;
  addFriend?: boolean;
  handleLongPress?: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({name, id, photo, invitationId, reputation, confirmation, addFriend, handleLongPress})=>{

  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  function accessProfile(){
    navigation.navigate("Profile", {id});
  }

  async function handleAddFriend() {
    if (!user) return signOut();
    
    try {
      await api.post('/friend', {
        user_ID: user._id,
        friend_ID: id
      }, {headers: {
        auth_token: user.auth_token
      }});
    } catch(err) {
      if (err.response && err.response.status === 401) {
        Alert.alert("Amigos", "Você já enviou convite de amizade para esse usuário ou vocês já são amigos");
      }
    }
  }

  let addFriendButton = <AddFriendButton onPress={handleAddFriend}><AddFriendButtonText>Adicionar</AddFriendButtonText></AddFriendButton>;

  let confirmed = <ConfirmedText>Confirmado</ConfirmedText>
  if (!confirmation) confirmed = <UnconfirmedText>Não confirmado</UnconfirmedText>

  return (
    <User onPress={accessProfile} onLongPress={handleLongPress && invitationId ? () => handleLongPress(invitationId) : () =>{}}>
      <UserPhoto source={photo} />
      <UserInfo>
        <View>
          <UserName>{name}</UserName>
          <ReputationView>
            <ReputationText>Reputação: </ReputationText>
            <Metric reputation={reputation} size={15}/>
          </ReputationView>
        </View>

        {addFriend ? addFriendButton : confirmed}
      </UserInfo>
    </User>
  );
}

export default UserCard;