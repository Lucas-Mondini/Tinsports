import styled from 'styled-components/native';

export const User = styled.View`
  height:80px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
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

export const ButtonsView = styled.View`
  flex-direction: column;
`;

export const ConfirmationButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.main};
  height: 20px;
  margin-top: 5px;
  width: 100px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
ConfirmationButton.defaultProps = {
  theme:{
    main: "#268E01"
  }
}

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 15px;
  font-family: "Poppins-Regular";
  line-height: 18px;
`;
