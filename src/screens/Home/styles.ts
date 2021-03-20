import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #dbd9ff;
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
`;

export const RegisterText = styled.Text`
  font-size: 16px;
  margin: 24px 0 8px;
`;

export const RegisterButton = styled.TouchableOpacity``;

export const RegisterButtonText = styled.Text`
  color: #281947;
  font-size: 28px;
  text-decoration: underline;
`;
