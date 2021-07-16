import React from 'react';
import { View } from 'react-native';
import EvaluationCard from '../../Components/EvaluationCard';
import {
  ButtonText,
  ButtonView,
  Container,
  EvaluationFinishButton,
  ParticipantsView,
  Title
} from './styles';

const photo = require('../../../assets/photos/photo.jpg');

const Evaluation: React.FC = () => {

  return (
    <Container>
      <ParticipantsView>

        <Title>Evento Finalizado!</Title>

        <ButtonView>
          <EvaluationFinishButton>
            <ButtonText>Finalizar avaliação</ButtonText>
          </EvaluationFinishButton>
        </ButtonView>

        <View>
          <EvaluationCard reputation={45} photo={photo} name="Nein" participated={true} paid={false}/>
          <EvaluationCard reputation={45} photo={photo} name="Nein" participated={true} paid={false}/>
          <EvaluationCard reputation={45} photo={photo} name="Nein" participated={true} paid={false}/>
          <EvaluationCard reputation={45} photo={photo} name="Nein" participated={true} paid={false}/>
          <EvaluationCard reputation={45} photo={photo} name="Nein" participated={true} paid={false}/>
          <EvaluationCard reputation={45} photo={photo} name="Nein" participated={true} paid={false}/>
          <EvaluationCard reputation={45} photo={photo} name="Nein" participated={true} paid={false}/>
          <EvaluationCard reputation={45} photo={photo} name="Nein" participated={true} paid={false}/>
        </View>

      </ParticipantsView>
    </Container>
  );

}

export default Evaluation;