import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Metric from '../../Components/Metric';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import {
  Container, EditProfileButton, EditProfileLink,
  EditProfileText, MetricBlock, MetricText,
  UserImage, UserImageContainer, UserInfo,
  UserName
} from './styles';

const photo = require('../../../assets/photos/photo.jpg');

type User = {
  email: string;
  _id: string;
  name: string;
  reputation: number;
}

type Params = {
  id: string | null;
}

const Profile: React.FC = () => {

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const {user, signOut} = useAuth();
  const route = useRoute();
  const params = route.params as Params;
  const [ friend, setFriend ] = useState<User>();
  const [loading, setLoading] = useState(false);

  const handleGoToFriendsList = useCallback(() => {
    navigation.navigate('FriendsList');
  }, [])

  async function getUser() {
    setLoading(true);
    try {
      if (!user) return signOut();

      const response = await api.get(`/user/${params.id}`, {headers: {auth_token: user.auth_token}});

      setFriend(response.data);
      setLoading(false);
    } catch (err) {
      signOut();
    }
  }

  if (params) {
    useEffect(() =>{
      getUser();
    },[isFocused]);
  }


  if(!user) return null;
  if(loading) return <Text>Carregando...</Text>;

  return (
    <Container>
      <UserInfo>
        <UserImageContainer>
          <UserImage source={photo}/>
          <EditProfileButton>
            <Icon name="pen" size={23} color="#686868"/>
          </EditProfileButton>
        </UserImageContainer>

        <UserName>{friend ? friend.name : user.name}</UserName>

        <MetricText>Reputação</MetricText>
        <Metric reputation={params && friend ? friend.reputation : user.reputation} size={70}/>

        {!friend &&
          <EditProfileLink onPress={handleGoToFriendsList}>
            <EditProfileText>
              Lista de amigos
            </EditProfileText>
          </EditProfileLink>
        }

        {!friend &&
          <EditProfileLink>
            <EditProfileText>
              Editar perfil
            </EditProfileText>
          </EditProfileLink>
        }

      </UserInfo>
    </Container>
  );
}

export default Profile;