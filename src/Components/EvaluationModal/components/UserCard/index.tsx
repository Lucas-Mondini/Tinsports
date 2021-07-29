import React, { useEffect, useState } from 'react';
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
  user_ID: string;
  evaluationList: Evaluation[];
  setEvaluationList: (value: Evaluation[]) => void;
}

type Evaluation = {
  user_ID: string;
  paid: boolean;
  participated: boolean;
}

const EvaluationCard: React.FC<UserCardProps> = ({name, reputation, photo, user_ID, evaluationList, setEvaluationList}) => {

  const [paid, setPaid] = useState(false);
  const [participated, setParticipated] = useState(false);

  function handleEvaluation() {
    const userEvaluation = evaluationList.filter(evaluation => evaluation.user_ID !== user_ID);
    const user = {
      user_ID,
      paid,
      participated
    };

    userEvaluation.push(user);

    setEvaluationList(userEvaluation);
  }

  function handleParticipated() {
    setParticipated(!participated);
  }

  function handlePaid() {
    setPaid(!paid);
  }

  useEffect(() => {
    handleEvaluation();
  }, [paid, participated]);

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

          <ConfirmationButton
            style={{backgroundColor: participated ? "#268E01": "#C50000"}}
            onPress={handleParticipated}
          >
            <ButtonText>{participated ? "Participou" : "Furou"}</ButtonText>
          </ConfirmationButton>

          <ConfirmationButton
            style={{backgroundColor: paid ? "#268E01": "#C50000"}}
            onPress={handlePaid}
          >
            <ButtonText>{paid ? "Pagou": "Caloteou"}</ButtonText>
          </ConfirmationButton>

        </ButtonsView>
      </UserInfo>
    </User>
  );
}

export default EvaluationCard;