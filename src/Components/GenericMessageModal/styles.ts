import styled from 'styled-components/native';

export const MessageTitle = styled.Text`
  font-family: "Poppins-Regular";
  color: #686868;
  font-size: 20px;
  text-align: center;
  text-decoration: underline;
`;

export const Message = styled.Text`
  font-family: "Poppins-Regular";
  color: #686868;
  font-size: 17px;
  margin: 30px 3%;
  text-align: center;
`;

export const ButtonsView = styled.View`
  width: 100%;
  justify-content: center;
  position: absolute;
  bottom: 15px;
`;

export const Button = styled.TouchableOpacity`
  padding: 3px 10px;
  border-radius: 50px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-family: "Poppins-Regular";
  font-size: 16px;
`;