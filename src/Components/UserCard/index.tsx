import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { UnconfirmedText, User, UserInfo, UserName, UserPhoto, ReputationText, ReputationView, ConfirmedText} from './styles';


const metric = require('../../../assets/images/Metric.png');

interface UserCardProps{
  name: string;
  //reputation: number;
  photo: ImageSourcePropType;
  confirmation: boolean;
}

const UserCard: React.FC<UserCardProps> = ({name, photo, confirmation})=>{

  const navigation = useNavigation();

  function accessProfile(){
    navigation.navigate("Profile");
  }

  return (
    <User onPress={accessProfile}>
      <UserPhoto source={photo} />
      <UserInfo>
        <View>
          <UserName>{name}</UserName>
          <ReputationView>
            <ReputationText>Reputação: </ReputationText>
            <Image source={metric} />
          </ReputationView>
        </View>

        {(confirmation)
          ?
          <ConfirmedText>Confirmado</ConfirmedText>
          :
          <UnconfirmedText>Não confirmado</UnconfirmedText>
        }
      </UserInfo>
    </User>
  );
}

export default UserCard;