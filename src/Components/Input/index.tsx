import React, { useState } from 'react';
import { Image, ImageSourcePropType } from 'react-native';
import { View } from 'react-native';
import { Label, InputText, InputContainer, InputImageBox, InputTextNoImage, InputTextDescription } from './styles';

interface InputProps{
  label: string;
  image?: ImageSourcePropType;
  multilineActive?: boolean;
  numeric?: boolean;
  value: string;
  maxLength?: number;
  setValue: (value: string) => void;
}

const Input: React.FC<InputProps> = ({label, image, multilineActive, value, numeric, setValue, maxLength}) => {

  let input = <InputText value={value} maxLength={maxLength} onChangeText={setValue}/>;

  let inputImage = image ? (
    <InputImageBox>
      <Image source={image}/>
    </InputImageBox>
  ) : <View />;

  if (!image) {
    input = <InputTextNoImage value={value} maxLength={maxLength} onChangeText={setValue}/>;
  }

  if (multilineActive) {
    input = <InputTextDescription multiline value={value} maxLength={maxLength} onChangeText={setValue} numberOfLines={7}/>;
  } else if (numeric) {
    input = <InputText value={value} keyboardType="numeric" maxLength={maxLength} onChangeText={setValue}/>;
  }

  return (
    <View>
      <Label>{label}</Label>
      <InputContainer>

        {inputImage}
        {input}

      </InputContainer>
    </View>
  );
}

export default Input;