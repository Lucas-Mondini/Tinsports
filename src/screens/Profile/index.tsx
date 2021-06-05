import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Text } from 'react-native';
import { useAuth } from '../../Contexts/Auth';
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

interface User{
  email: string;
  _id: string;
  name: string;
}

const Profile: React.FC = () => {

  const isFocused = useIsFocused();
  const {user, checkLogin} = useAuth();

  useEffect(() =>{
    checkLogin();
  },[isFocused]);

  if(!user) return <Text>Carregando...</Text>

  return (
    <Container>
      <UserInfo>
        <UserImageContainer>
          <UserImage source={photo}/>
          <EditProfileButton>
            <Image source={pen} />
          </EditProfileButton>
        </UserImageContainer>

        <UserName>{user.name}</UserName>

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

        <EditProfileLink>
          <EditProfileText>
            Editar perfil
          </EditProfileText>
        </EditProfileLink>

      </UserInfo>
    </Container>
  );
}

export default Profile;