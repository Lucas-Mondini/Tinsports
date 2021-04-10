import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import Input from '../../Components/Input';
import { Checkbox, CheckboxChecked, CheckboxLabel, CheckboxView, Container, GameInfo, SubmitButton, SubmitButtonText, SubmitButtonView } from './styles';

const gameIcon = require('../../../assets/images/futbol-small.png');
const moneyIcon = require('../../../assets/images/money.png');
const clockIcon = require('../../../assets/images/clock.png');
const calendarIcon = require('../../../assets/images/calendar.png');
const mapIcon = require('../../../assets/images/map-marker.png');
const checkIcon = require('../../../assets/images/check.png');

const CreateEvent: React.FC = ()=>{

  const [paid, setPaid] = useState(false);

  function handleCheckbox(){
    if(paid == true){
      setPaid(false);
    } else {
      setPaid(true);
    }
  }

  return (
    <Container>
      <GameInfo>
        <Input label="Nome"/>
        <Input label="Tipo de partida" image={gameIcon}/>
        <Input label="Tipo de partida" image={mapIcon}/>

        <View>
          <Input label="Nome" image={calendarIcon}/>
          <Input label="Tipo de partida" image={clockIcon}/>
        </View>

          {(paid == false)
            ?
            <CheckboxView onPress={handleCheckbox}>
              <Checkbox/>
              <CheckboxLabel>Evento pago?</CheckboxLabel>  
            </CheckboxView>
            :
            <CheckboxView onPress={handleCheckbox}>
              <CheckboxChecked>
                <Image source={checkIcon} />
              </CheckboxChecked>
              <CheckboxLabel>Evento pago!</CheckboxLabel>  
            </CheckboxView>
          }

        {(paid == true)
            ?
            <Input label="Valor" image={moneyIcon}/>
            :
            <View />
        }

        <Input label="Descrição" multilineActive={true}/>

        <SubmitButtonView>
          <SubmitButton>
            <SubmitButtonText>Cadastrar partida</SubmitButtonText>
          </SubmitButton>
        </SubmitButtonView>
      </GameInfo>

    </Container>
  );
}

export default CreateEvent;