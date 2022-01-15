import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color: #fff;
`;

export const Content = styled.ScrollView`
  padding-top: 50px;
  width: 100%;
  height: 100%;
`;

export const PremiumContainer = styled.View`
  width: 100%;
  padding: 0 3% 0 3%;
`;

export const CardsContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
  padding: 0 3% 0 3%;
  justify-content: space-between;
  flex-direction: row;
`;

export const Title = styled.Text`
  margin-top: 20px;
  font-size: 35px;
  color: #000;
  font-family: "Poppins-Regular";
  line-height: 45px;
  text-align: center;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
`;

export const Item = styled.Text`
  margin-top: 20px;
  font-size: 20px;
  color: #686868;
  font-family: "Poppins-Regular";
  line-height: 25px;
`;

export const TopImage = styled.View`
  background-color: #DBD9FF;
  align-items: center;
  padding: 15px 0;
  width: 100%;
`;

export const SubmitButtonView = styled.View`
  margin-top: 25px;
  margin-bottom: 25px;
  align-items: center;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 50%;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background-color: #007E33;
`;

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: "Poppins-Regular";
  line-height: 24px;
`;