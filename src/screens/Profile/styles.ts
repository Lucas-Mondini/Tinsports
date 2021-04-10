import styled from 'styled-components/native';

export const Container = styled.View`
  align-items: center;
  padding-top: 20px;
  background-color: #fff;
  height: 100%;
`;

export const UserInfo = styled.ScrollView`
  width: 100%;
  padding: 0 3% 0 3%;
`;

export const UserImageContainer = styled.View`
  margin-top: 60px;
  height: 185px;
  justify-content: center;
  align-items: center;
`;

export const UserImage = styled.Image`
  width: 185px;
  height: 185px;
  border-radius: 100px;
`;

export const EditProfileButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  background-color: #E8E8E8;
  border-radius: 40px;
  position: relative;
  top: -40px;
  left: 50px;
`;

export const UserName = styled.Text`
  color: #686868;
  font-size: 35px;
  text-align: center;
`;

export const MetricBlock = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: #E6E6E6;
  padding-bottom: 10px;
`;

export const MetricText = styled.Text`
  font-size: 35px;
  color: #686868;
  text-align: left;
  padding-top: 40px;
`;

export const EditProfileText = styled.Text`
  color: #686868;
  border-bottom-width: 1px;
  border-bottom-color: #686868;
  text-align: center;
  font-size: 35px;
`;

export const EditProfileLink = styled.TouchableOpacity`
  height: 40px;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
`;