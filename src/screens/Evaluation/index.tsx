import React from 'react';
import { Text, View } from 'react-native';
import EvaluationCard from '../../Components/EvaluationCard';
import { ButtonText, ButtonView, Container, EvaluationFinishButton, ParticipantsView, Title } from './styles';

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
          <EvaluationCard photo={photo} name="Nein" participated={true} paid={false}/>
          <EvaluationCard photo={photo} name="Nein" participated={false} paid={false}/>
          <EvaluationCard photo={photo} name="Nein" participated={true} paid={true}/>
          <EvaluationCard photo={photo} name="Nein" participated={true} paid={false}/>
          <EvaluationCard photo={photo} name="Nein" participated={false} paid={false}/>
          <EvaluationCard photo={photo} name="Nein" participated={true} paid={true}/>
          <EvaluationCard photo={photo} name="Nein" participated={true} paid={false}/>
          <EvaluationCard photo={photo} name="Nein" participated={false} paid={false}/>
          <EvaluationCard photo={photo} name="Nein" participated={true} paid={true}/>
          <EvaluationCard photo={photo} name="Nein" participated={true} paid={false}/>
          <EvaluationCard photo={photo} name="Nein" participated={false} paid={false}/>
          <EvaluationCard photo={photo} name="Nein" participated={true} paid={true}/>
        </View>

      </ParticipantsView>
    </Container>
  );

}

export default Evaluation;