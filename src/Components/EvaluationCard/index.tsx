import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageSourcePropType, View } from 'react-native';
import { ButtonsView, ButtonText, ConfirmationButton, ReputationText, ReputationView, User, UserInfo, UserName, UserPhoto } from './styles';



const metric = require('../../../assets/images/Metric.png');

const themeRed = {
  main: '#C50000'
}

interface UserCardProps{
  name: string;
  //reputation: number;
  photo: ImageSourcePropType;
  participated: boolean;
  paid: boolean;
}

const EvaluationCard: React.FC<UserCardProps> = ({name, photo, participated, paid})=>{

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
            <Image source={metric} />
          </ReputationView>
        </View>

        <ButtonsView>

          {(participated == true)
            ?
            <ConfirmationButton>
              <ButtonText>Participou</ButtonText>
            </ConfirmationButton>
            :
            <ConfirmationButton theme={themeRed}>
              <ButtonText>Furou</ButtonText>
            </ConfirmationButton>
          }

          {(paid == true)
            ?
            <ConfirmationButton>
              <ButtonText>Pagou</ButtonText>
            </ConfirmationButton>
            :
            <ConfirmationButton theme={themeRed}>
              <ButtonText>Caloteou</ButtonText>
            </ConfirmationButton>
          }

        </ButtonsView>
      </UserInfo>
    </User>
  );
}

export default EvaluationCard;