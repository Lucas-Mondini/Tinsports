import styled from 'styled-components/native';

export const Invite = styled.TouchableOpacity`
  height:110px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
`;

export const InviteInfo = styled.View`
  height: 100%;
  width: 82%;
  border-bottom-width: 1px;
  border-bottom-color: #E6E6E6;
  padding: 20px 10px 10px 0;
  flex-direction: row;
  justify-content: space-between;
`;

export const InviteTitle = styled.Text`
  color: #686868;
  font-size: 20px;
  font-family: "Poppins-Regular";
  line-height: 24px;
`;

export const GameNameText = styled.Text`
  color: #686868;
  font-size: 18px;
  font-family: "Poppins-Regular";
  line-height: 23px;
`;

export const LocationText = styled.Text`
  color: #686868;
  font-size: 15px;
  font-family: "Poppins-Regular";
  line-height: 18px;
`;

export const TimeText = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  font-family: "Poppins-Regular";
  line-height: 15px;
  color: #686868;
`;

export const ButtonsView = styled.View`
  margin-top: 20px;
  flex-direction: row;
  justify-content: space-between;
  width: 75px;
`;

export const Button = styled.TouchableOpacity`
  border-radius: 8px;
  height: 35px;
  width: 35px;
  align-items: center;
  justify-content: center;
`