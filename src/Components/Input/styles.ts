import styled from 'styled-components/native';

export const Label = styled.Text`
  color: #686868;
  font-size: 25px;
  padding-top: 25px;
  font-family: "Poppins-Regular";
  line-height: 30px;
`;

export const InputText = styled.TextInput`
  border: 1px solid #E6E6E6;
  width: 90%;
  height: 35px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: 15px;
  padding: 0 10px;
  font-family: "Poppins-Regular";
  line-height: 18px;
`;

export const InputTextNoIcon = styled.TextInput`
  border: 1px solid #E6E6E6;
  width: 100%;
  height: 35px;
  border-radius: 5px;
  font-size: 15px;
  padding-left: 10px;
  padding: 0 10px;
  font-family: "Poppins-Regular";
  line-height: 18px;
`;

export const InputContainer = styled.View`
  flex-direction: row;
`;

export const InputImageBox = styled.View`
  width: 35px;
  height: 35px;
  background-color: #E5E5E5;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
`;

export const InputTextDescription = styled.TextInput`
  border: 1px solid #E6E6E6;
  width: 100%;
  height: 150px;
  border-radius: 5px;
  font-size: 15px;
  padding-left: 10px;
  padding: 10px;
  font-family: "Poppins-Regular";
  line-height: 18px;

  align-items: flex-start;
`;