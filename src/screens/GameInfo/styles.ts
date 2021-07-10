import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  padding-top: 20px;
  background-color: #fff;
  flex: 1;
`;

export const GameInfoView = styled.ScrollView`
  width: 100%;
  padding: 0 3% 0% 3%;
`;

export const Title = styled.Text`
  font-size:50px;
  color: #686868;
  text-align: center;
  padding-top: 20%;
  padding-bottom: 25px;
  font-family: "Poppins-Regular";
  line-height: 50px;
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
  padding: 5% 3% 0% 3%;
  font-family: "Poppins-Regular";
  line-height: 25px;
`;

export const UsersTitle = styled.Text`
  font-size:30px;
  color: #686868;
  text-align: center;
  padding-bottom: 10px;
  padding-top: 20px;
  font-family: "Poppins-Regular";
  line-height: 35px;
`;

export const EventFinishedView = styled.View`
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;

export const EventFinishedButton = styled.TouchableOpacity`
  height: 40px;
  width:60%;
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

export const EmptyText = styled.Text`
  height:30px;
  font-family: "Poppins-Regular";
  font-size: 20px;
  text-align: center;
  color: #d9d9d9;
`;

export const InviteButton = styled.TouchableOpacity`
  height: 40px;
  width:60%;
  background-color: #2FB400;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin: 25px auto;
`;