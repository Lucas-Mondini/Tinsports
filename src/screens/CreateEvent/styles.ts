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

export const CheckboxView = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

export const CheckboxLabel = styled.Text`
  font-size: 20px;
  color: #686868;
  margin-left: 10px;
  font-family: "Poppins-Regular";
  line-height: 30px;
`;

export const Checkbox = styled.View`
  width: 25px;
  height: 25px;
  border: 1px solid #E6E6E6;
  border-radius:5px;
  justify-content: center;
  align-items: center;
`;

export const CheckboxChecked = styled.View`
  width: 25px;
  height: 25px;
  border: 1px solid #22AB5A;
  background-color: #01C650;
  border-radius:5px;
  justify-content: center;
  align-items: center;
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
