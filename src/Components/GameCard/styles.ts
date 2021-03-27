import styled from 'styled-components/native';

export const Game = styled.TouchableOpacity`
  height:80px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
`;

export const GameInfo = styled.View`
  height: 100%;
  width: 82%;
  border-bottom-width: 1px;
  border-bottom-color: #E6E6E6;
  padding: 20px 10px 10px 0;
  flex-direction: row;
  justify-content: space-between;
`;

export const GameTitle = styled.Text`
  color: #686868;
  font-size: 20px;
`;

export const LocationText = styled.Text`
  color: #686868;
  font-size: 15px;
`;

export const TimeText = styled.Text`
  color: #686868;
  font-size: 12px;
`;