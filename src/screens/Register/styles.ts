import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding:0 3% 0  3%;
  justify-content: center;
  margin-top: 40%;
`;

export const Label = styled.Text`
  margin-top: 10px;
  font-size: 20px;
  color: #686868;
  text-align: left;
  font-family: "Poppins-Regular";
  line-height: 24px;
`;

export const Input = styled.TextInput`
  width: 100%;
  border: 2px solid #E6E6E6;
  border-radius: 8px;
  padding:10px 15px;
  font-size: 20px;
  font-family: "Poppins-Regular";
  line-height: 24px;
`;

export const ButtonView = styled.View`
  flex: 1;
  align-items: center;
`;
export const SignInButton = styled.TouchableOpacity`
  align-items: center;
  background-color: #007e33;
  margin-top: 32px;
  padding: 8px 0;
  width: 70%;
  border-radius: 160px;
`;

export const SignInButtonText = styled.Text`
  font-size: 24px;
  color: #fff;
  font-family: "Poppins-Regular";
  line-height: 30px;
`;
