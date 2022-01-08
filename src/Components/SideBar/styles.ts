import styled from 'styled-components/native';

export const Modal = styled.Modal`
  flex: 1;
`;

export const ModalBackground = styled.View`
  flex: 1;
  background-color: "rgba(0,0,0,0.7)";
`;

export const ModalContent = styled.View`
  background-color: #fff;
  height: 100%;
  width: 60%;
  justify-content: flex-start;
  padding: 0 3%;
`;

export const ButtonView = styled.View`
  position: absolute;
  width: 100%;
  align-items: center;
  bottom: 25px;
`;

export const CloseButton = styled.TouchableOpacity`
  height: 35px;
  width: 35px;
  border-radius: 35px;
  border-width: 2px;
  border-color: #686868;
  justify-content: center;
  align-items: center;
`;