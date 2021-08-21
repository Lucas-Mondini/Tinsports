import styled from 'styled-components/native';

export const User = styled.TouchableOpacity`
  height:75px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  width: 100%;
`;

export const UserPhoto = styled.Image`
  width: 51px;
  height: 51px;
  border-radius: 50px;
  margin-right: 10px;
`;

export const UserInfo = styled.View`
  height: 100%;
  width: 82%;
  border-bottom-width: 1px;
  border-bottom-color: #E6E6E6;
  padding: 20px 10px 10px 0;
  flex-direction: row;
  justify-content: space-between;
`;

export const UserName = styled.Text`
  color: #686868;
  font-size: 20px;
  font-family: "Poppins-Regular";
  line-height: 24px;
`;

export const ReputationView = styled.View`
  align-items: center;
  flex-direction: row;
  margin-top: 5px;
`;

export const ReputationText = styled.Text`
  color: #686868;
  font-size: 15px;
  flex-direction: row;
  flex-wrap: wrap;
  font-family: "Poppins-Regular";
  line-height: 18px;
`;

export const ConfirmedText = styled.Text`
  color: #686868;
  font-size: 12px;
  padding-top: 28px;
  color: #268E01;
`;

export const UnconfirmedText = styled.Text`
  color: #686868;
  font-size: 12px;
  padding-top: 28px;
  color: #C50000;
`;

export const AddFriendButton = styled.TouchableOpacity`
  background-color: #268E01;
  height: 25px;
  width: 75px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  position: absolute;
  right: 20px;
  top: 50%
`;

export const AddFriendButtonText = styled.Text`
  color: #fff;
  font-family: "Poppins-Regular";

`;
