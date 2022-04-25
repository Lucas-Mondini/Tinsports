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
  setValue?: (value: string) => void;
  style?: object;
  secureTextEntry?: boolean;
  callback?: () => void;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
    label, callback, icon, size,
    multilineActive, value, numeric,
    secureTextEntry, setValue, maxLength, style,
    autoCapitalize = 'none', disabled
  }) => {

  let input = <InputText
                onFocus={callback}
                onBlur={callback}
                secureTextEntry={secureTextEntry}
                value={value}
                maxLength={maxLength}
                onChangeText={setValue}
                autoCapitalize={autoCapitalize}
                autoFocus={disabled}
                editable={disabled}
                style={{color: "#686868"}}
              />;

  let inputIcon = icon ? (
    <InputImageBox>
      <Icon name={icon} size={size} color="#686868"/>
    </InputImageBox>
  ) : <View />;

  if (!icon) {
    input = <InputTextNoIcon
              onFocus={callback}
              onBlur={callback}
              secureTextEntry={secureTextEntry}
              value={value}
              maxLength={maxLength}
              onChangeText={setValue}
              autoCapitalize={autoCapitalize}
              style={{color: "#686868"}}
            />;
  }

  if (multilineActive) {
    input = <InputTextDescription
              onFocus={callback}
              onBlur={callback}
              multiline
              value={value}
              maxLength={maxLength}
              onChangeText={setValue}
              numberOfLines={10}
              style={{textAlignVertical: "top", color: "#686868"}}
            />;
  } else if (numeric) {
    input = <InputText
              onFocus={callback}
              onBlur={callback}
              value={value}
              keyboardType="numeric"
              maxLength={maxLength}
              onChangeText={setValue}
              style={{color: "#686868"}}
            />;
  }

  return (
    <View style={style}>
      <Label>{label}</Label>
      <InputContainer>

        {inputIcon}
        {input}

      </InputContainer>
    </View>
  );
}

export default Input;