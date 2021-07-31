import styled from "styled-components/native";

export const MainView = styled.View`
  flex: 1;
  padding: 0 3% 15px 3%;
  background-color: #fff;
  align-items: center;
`;

export const SearchArea = styled.View`
  height: 100px;
  border-bottom-width: 1px;
  border-bottom-color: #E6E6E6;
  padding-bottom: 10px;
  justify-content: center;
  flex-direction: row;
  margin-top: 35px;
`;

export const FriendsArea = styled.ScrollView`
  flex: 1;
`;

export const SearchFriendText = styled.Text`
  font-family: "Poppins-Regular";
  font-size: 16px;
  margin-top: 15px;
  color: #686868;
  text-align: center;
`;