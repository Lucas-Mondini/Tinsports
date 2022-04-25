import styled from 'styled-components/native';

export const ButtonsView = styled.View`
  flex-direction: column;
`;

export const Button = styled.TouchableOpacity`
  height: 40px;
  margin-top: 5px;
  width: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #000;
`;

export const AddFriendButton = styled.TouchableOpacity`
  background-color: #268E01;
  height: 25px;
  width: 75px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  position: absolute;
  margin-left: auto;
  right: 12%;
  top: 50%;
`;

export const AddFriendButtonText = styled.Text`
  color: #fff;
  font-family: "Poppins-Regular";
`;
