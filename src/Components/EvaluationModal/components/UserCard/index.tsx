import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ImageSourcePropType, View } from 'react-native';
import Metric from '../../../Metric';
import {
  ButtonsView,
  ButtonText,
  ConfirmationButton,
  ReputationText,
  ReputationView,
  User,
  UserInfo,
  UserName,
  UserPhoto
} from './styles';

interface UserCardProps {
  name: string;
  reputation: number;
  photo: ImageSourcePropType;
  participated: boolean;
  paid: boolean;
  user_ID: string;
}

const EvaluationCard: React.FC<UserCardProps> = ({name, reputation, photo, participated, paid, user_ID})=>{

  const navigation = useNavigation();
  function accessProfile(){
    navigation.navigate("Profile");
  }

  return (
    <User>
      <UserPhoto source={photo} />
      <UserInfo>
        <View>
          <UserName>{name}</UserName>
          <ReputationView>
            <ReputationText>Reputação: </ReputationText>
            <Metric reputation={reputation} size={15}/>
          </ReputationView>
        </View>

        <ButtonsView>

          <ConfirmationButton style={{backgroundColor: participated ? "#268E01": "#C50000"}}>
            <ButtonText>Participou</ButtonText>
          </ConfirmationButton>

          <ConfirmationButton style={{backgroundColor: paid ? "#268E01": "#C50000"}}>
            <ButtonText>Pagou</ButtonText>
          </ConfirmationButton>

        </ButtonsView>
      </UserInfo>
    </User>
  );
}

export default EvaluationCard;