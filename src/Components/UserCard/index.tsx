import React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { ConfirmationText, User, UserInfo, UserName, UserPhoto, ReputationText, ReputationView} from './styles';


const metric = require('../../../assets/images/Metric.png');

const themeRed = {
  main: '#C50000'
}

interface UserCardProps{
  name: string;
  //reputation: number;
  photo: ImageSourcePropType;
  confirmation: string;
}

const UserCard: React.FC<UserCardProps> = ({name, photo, confirmation})=>{
  return (
    <User >
      <UserPhoto source={photo} />
      <UserInfo>
        <View>
          <UserName>{name}</UserName>
          <ReputationView>
            <ReputationText>Reputação: </ReputationText>
            <Image source={metric} />
          </ReputationView>
        </View>

        {(confirmation == "Confirmado")
          ?
          <ConfirmationText> {confirmation} </ConfirmationText>
          :
          <ConfirmationText theme={themeRed}> {confirmation} </ConfirmationText>
        }
      </UserInfo>
    </User>
  );
}

export default UserCard;