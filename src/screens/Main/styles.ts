import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  padding-top: 20px;
  background-color: #fff;
`;

export const Games = styled.ScrollView`
  width: 100%;
  padding: 0 3% 0 3%;
  margin-bottom: 88px;
`;

export const GameContainer = styled.View`
  width: 100%;
  padding: 0 3% 0 3%;
  padding-bottom: 25px;
`;

export const GameTitleContainer = styled.View`
  width: 100%;
  border-bottom-width:1px;
  border-bottom-color: #E6E6E6;
`;

export const GameTitle = styled.Text`
  font-size: 25px;
  color: #686868;
`;

export const TopImage = styled.View`
  align-items: center;
  padding: 15px 0;
`;

export const BottomNavbar = styled.View`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 88px;
  background: #f9f9f9;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 5% 0 5%;
  border-top-width: 1px;
  border-top-color: #E6E6E6;
  margin-top: 20px;
`;
