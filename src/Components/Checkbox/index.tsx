import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { CheckboxEl, CheckboxLabel, CheckboxView } from "./styles";

interface CheckboxProps {
  text: string;
  handleCheckbox: () => void;
  checked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({text, checked, handleCheckbox}) => {
  return (
    <CheckboxView onPress={handleCheckbox}>
      <CheckboxEl style={checked ? {
        borderWidth: 1,
        borderColor: "#22AB5A",
        backgroundColor: "#01C650"
      }:{}}>
        <Icon name="check" size={20} color={checked ? "#FFF" :"#686868"}/>
      </CheckboxEl>
      <CheckboxLabel>{text}</CheckboxLabel>
    </CheckboxView>
  );
}

export default Checkbox;