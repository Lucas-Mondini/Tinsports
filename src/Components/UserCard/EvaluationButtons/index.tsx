import React, { useEffect, useState } from 'react';

import {
  ButtonsView,
  ButtonText,
  ConfirmationButton
} from './styles';

interface EvaluationButtonsProps {
  user_ID: string;
  evaluationList?: any[];
  setEvaluationList?: (value: any[]) => void;
}

const EvaluationButtons: React.FC<EvaluationButtonsProps> = ({user_ID, evaluationList, setEvaluationList}) =>
{
  const [paid, setPaid] = useState(false);
  const [participated, setParticipated] = useState(false);

  function handleEvaluation() {
    const userEvaluation = evaluationList ? evaluationList.filter(evaluation => evaluation.user_ID !== user_ID) : [];
    const user = {
      user_ID,
      paid,
      participated
    };

    userEvaluation.push(user);

    if (setEvaluationList) setEvaluationList(userEvaluation);
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
  );
}

export default EvaluationButtons;