import styled from 'styled-components/native';

export const Modal = styled.Modal`
  flex: 1;
`;

export const ModalBackground = styled.View`
  flex: 1;
  background-color: "rgba(0,0,0,0.7)";
`;

export const ModalContent = styled.View`
  background-color: #f6f6f6;
  margin: 10% 3%;
  flex: 1;
  justify-content: space-between;
  border-radius: 8px;
`;

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
  height: 40px;
  width: 150px;
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