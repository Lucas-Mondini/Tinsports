import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  padding-top: 45px;
  background-color: #fff;
  height: 100%;
`;

export const GameInfo = styled.ScrollView`
  width: 100%;
  padding: 0 3% 0 3%;
`;

export const SubmitButtonView = styled.View`
  margin-top: 25px;
  margin-bottom: 25px;
  align-items: center;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 50%;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: "Poppins-Regular";
  line-height: 24px;
`;
