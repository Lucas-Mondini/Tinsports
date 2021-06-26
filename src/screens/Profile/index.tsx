import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Text } from 'react-native';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import {
  Container, EditProfileButton, EditProfileLink,
  EditProfileText, MetricBlock, MetricText,
  UserImage, UserImageContainer, UserInfo,
  UserName
} from './styles';

const photo = require('../../../assets/photos/photo.jpg');
const pen = require('../../../assets/images/pen.png');
const star = require('../../../assets/images/star.png');
const halfStar = require('../../../assets/images/half-star.png');
const emptyStar = require('../../../assets/images/empty-star.png');
const medal = require('../../../assets/images/medal.png');
const halfMedal = require('../../../assets/images/Half-medal.png');
const emptyMedal = require('../../../assets/images/empty-medal.png');

type User = {
  email: string;
  _id: string;
  name: string;
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
            <Image source={pen} />
          </EditProfileButton>
        </UserImageContainer>

        <UserName>{friend ? friend.name : user.name}</UserName>

        <MetricText>Reputação</MetricText>
        <MetricBlock>
          <Image source={star}/>
          <Image source={star}/>
          <Image source={star}/>
          <Image source={halfStar}/>
          <Image source={emptyStar}/>
        </MetricBlock>

        <MetricText>Presença</MetricText>
        <MetricBlock>
          <Image source={medal}/>
          <Image source={medal}/>
          <Image source={medal}/>
          <Image source={halfMedal}/>
          <Image source={emptyMedal}/>
        </MetricBlock>

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