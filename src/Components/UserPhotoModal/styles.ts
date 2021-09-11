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

export const PhotoView = styled.View`
  width: 100%;
  height: 300px;
`;

export const ContentView = styled.ScrollView`
  flex: 1;
  margin: 0 3%;
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

export const PhotoButtonsView = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const SendPhotoButton = styled.TouchableOpacity`
  width: 100%;
  height: 30px;
  margin-bottom: 15px;
  flex-direction: row;
  background-color: #23527C;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  max-width: 150px;
`;
