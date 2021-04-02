import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  padding-top: 20px;
  background-color: #fff;
`;

export const GameInfoView = styled.ScrollView`
  width: 100%;
  padding: 0 3% 0% 3%;
`;

export const Title = styled.Text`
  font-size:50px;
  color: #686868;
  text-align: center;
  padding-bottom: 25px;
`;

export const BadgeContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 0 3% 0% 3%;
`;

export const Description = styled.Text`
  font-size: 18px;
  color: #686868;
  text-align: center;
  padding: 5% 3% 10% 3%;
`;

export const UsersTitle = styled.Text`
  font-size:30px;
  color: #686868;
  text-align: center;
  padding-bottom: 10px
`;
