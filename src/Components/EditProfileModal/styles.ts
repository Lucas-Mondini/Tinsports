import styled from 'styled-components/native';

export const Modal = styled.Modal`
  flex: 1;
`;

export const ModalBackground = styled.View`
  flex: 1;
  background-color: "rgba(0,0,0,0.7)";
`;

export const ModalContainer = styled.ScrollView`
  flex: 1;
`;

export const ModalContent = styled.View`
  background-color: #f6f6f6;
  margin: 10% 3%;
  flex: 1;
  border-radius: 8px;
`;

export const Footer = styled.View`
  background-color: #f6f6f6;
  height: 50px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10% 10px 10%;
  position: absolute;
  bottom: 0;
`;

export const ChangePasswordText = styled.Text`
  font-family: "Poppins-Regular";
  font-size: 24px;
  line-height: 30px;
  color: #686868;
  text-align: center;
  text-decoration: underline;
  margin-top: 40px;
`;

export const ConfirmButton = styled.TouchableOpacity`
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: "Poppins-Regular";
`;

export const CancelButton = styled.TouchableOpacity``;

export const CancelText = styled.Text`
  font-family: 'Poppins-regular';
  font-size: 20px;
  line-height: 24px;
  color: #686868;
  text-decoration: underline;
`;