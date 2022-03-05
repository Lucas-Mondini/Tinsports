import styled from 'styled-components/native';

export const BackButton = styled.TouchableOpacity`
  margin-top: 10px;
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export const HeaderContainer = styled.View`
  height: 50px;
  position: absolute;
  top: 0;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 0 3%;
  background-color: #fff;
  border-bottom-color: #f6f6f6;
  border-bottom-width: 1px;
  z-index: 999;
`;