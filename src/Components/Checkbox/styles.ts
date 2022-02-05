import styled from 'styled-components/native';

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

export const CheckboxEl = styled.View`
  width: 25px;
  height: 25px;
  border: 1px solid #E6E6E6;
  border-radius:5px;
  justify-content: center;
  align-items: center;
`;