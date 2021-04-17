import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  padding-top: 20px;
  background-color: #fff;
`;

export const ParticipantsView = styled.ScrollView`
  width: 100%;
  padding: 0 3% 0% 3%;
`;

export const Title = styled.Text`
  font-size:30px;
  color: #686868;
  text-align: center;
  padding-bottom: 10px;
  padding-top: 20%;
  font-family: "Poppins-Regular";
  line-height: 35px;
`;

export const ButtonView = styled.View`
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;

export const EvaluationFinishButton = styled.TouchableOpacity`
  height: 40px;
  width:55%;
  background-color: #2FB400;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: "Poppins-Regular";
  line-height: 24px;
`;

