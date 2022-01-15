import styled from 'styled-components/native';

export const Card = styled.TouchableOpacity``;

export const PriceView = styled.View`
  flex: 1;
  border-radius: 8px;
  justify-content: center;
`;

export const MonthsText = styled.Text`
  color: #000;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
`;

export const PriceContainer = styled.View`
  height: 24px;
  background-color: #D0D0D0;
  position: relative;
  bottom: -15.5%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const Price = styled.Text`
  color: #000;
  font-size: 14px
  line-height: 24px;
  text-align: center;
`;