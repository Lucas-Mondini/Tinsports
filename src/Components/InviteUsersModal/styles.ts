import styled from 'styled-components/native';

export const FriendsView = styled.ScrollView`
  flex: 1;
`;

export const Footer = styled.View`
  height: 50px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10% 10px 10%;
`;

export const ConfirmButton = styled.TouchableOpacity`
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

export const CancelButton = styled.TouchableOpacity``;

export const CancelText = styled.Text`
  font-family: 'Poppins-regular';
  font-size: 20px;
  line-height: 24px;
  color: #686868;
  text-decoration: underline;
`;

export const NoFriendsView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const NoFriendsText = styled.Text`
  font-family: 'Poppins-regular';
  font-size: 16px;
  color: #686868;
  text-align: center;
  margin-top: 20px;
`;