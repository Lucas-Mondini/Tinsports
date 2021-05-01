import React, { useState } from 'react';
import { Image, Text, View} from "react-native";
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
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');


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
        <Input 
          label="Nome" 
          value={name}
          setValue={setName}
          />

        <Input 
          label="Tipo de partida" 
          image={gameIcon}
          value={type}
          setValue={setType}
          />
        <Input 
          label="Local" 
          image={mapIcon}
          value={location}
          setValue={setLocation}
          />

        <View>
          <Input 
            label="Data" 
            image={calendarIcon}
            value={date}
          setValue={setDate}
            />
          <Input 
            label="Hora" 
            image={clockIcon}
            value={time}
            setValue={setTime}
            />
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
            <Input 
              label="Valor" 
              image={moneyIcon}
              value={cost}
              setValue={setCost}
              />
            :
            <View />
        }

        <Input 
          label="Descrição" 
          multilineActive={true}
          value={description}
          setValue={setDescription}
          />

        <SubmitButtonView>
          <SubmitButton>
            <SubmitButtonText>Cadastrar partida</SubmitButtonText>
          </SubmitButton>
        </SubmitButtonView>
      </GameInfo>
      <Text>{name}, {type}, {location}, {cost}, {date}, {time}, {description}</Text>
    </Container>
  );
}

export default CreateEvent;