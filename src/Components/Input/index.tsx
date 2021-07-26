import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Label, InputText, InputContainer, InputImageBox, InputTextNoIcon, InputTextDescription } from './styles';

interface InputProps{
  label: string;
  icon?: string;
  size?: number;
  multilineActive?: boolean;
  numeric?: boolean;
  value: string;
  maxLength?: number;
  setValue: (value: string) => void;
}

const Input: React.FC<InputProps> = ({label, icon, size, multilineActive, value, numeric, setValue, maxLength}) => {

  let input = <InputText
                value={value}
                maxLength={maxLength}
                onChangeText={setValue}
              />;

  let inputIcon = icon ? (
    <InputImageBox>
      <Icon name={icon} size={size} color="#686868"/>
    </InputImageBox>
  ) : <View />;

  if (!icon) {
    input = <InputTextNoIcon
              value={value}
              maxLength={maxLength}
              onChangeText={setValue}
            />;
  }

  if (multilineActive) {
    input = <InputTextDescription
              multiline
              value={value}
              maxLength={maxLength}
              onChangeText={setValue}
              numberOfLines={10}
              style={{textAlignVertical: "top"}}
            />;
  } else if (numeric) {
    input = <InputText
              value={value}
              keyboardType="numeric"
              maxLength={maxLength}
              onChangeText={setValue}
            />;
  }

  return (
    <View style={{width: "100%"}}>
      <Label>{label}</Label>
      <InputContainer>

        {inputIcon}
        {input}

      </InputContainer>
    </View>
  );
}

export default Input;