import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { useCallback } from 'react';
import { View} from "react-native";
import Input from '../../Components/Input';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import { Checkbox,
  CheckboxChecked,
  CheckboxLabel,
  CheckboxView,
  Container,
  GameInfo,
  SubmitButton,
  SubmitButtonText,
  SubmitButtonView
} from './styles';

import {
  formatDate,
  formatHour,
  formatMoney
} from '../../utils/functions';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Game {
  name: string;
  type: string;
  location: string
  date: string;
  hour: string;
  value: string;
  description: string,
}

const CreateEvent: React.FC = ()=>{
  const navigation = useNavigation();

  const [game, setGame] = useState({} as Game);

  const [paid, setPaid] = useState(false);
  const {user, signOut} = useAuth();

  async function sendData(){

    if(user){
      const data = {
        name: game.name, type: game.type, location: game.location, description: game.description,
        hour: game.hour, date: game.date, value: game.value,
        host_ID: user._id
      }

      try{
        await api.post(`/games`, data,{
          headers: {
            auth_token: user.auth_token
          },
        });

        navigation.reset({index: 0, routes: [{name: "Main"}]});
      } catch(err){
        signOut();
      }
    } else {
      signOut();
    }
  }

  const handleSubmit = useCallback(()=>{
    sendData();
  }, [sendData]);

  function handleCheckbox(){
    setPaid(!paid);
  }

  return (
    <Container>
      <GameInfo>
        <Input
          label="Nome"
          value={game.name}
          setValue={name => setGame({...game, name})}
          />

        <Input
          label="Tipo de partida"
          icon="soccer-ball-o"
          size={25}
          value={game.type}
          setValue={type => setGame({...game, type})}
          />
        <Input
          label="Local"
          icon="map-marker"
          size={28}
          value={game.location}
          setValue={location => setGame({...game, location})}
          />

        <View>
          <Input
            label="Data"
            icon="calendar-o"
            size={25}
            value={game.date}
            numeric
            maxLength={10}
            setValue={date => setGame({...game, date: formatDate(date)})}
            />
          <Input
            label="Hora"
            icon="clock-o"
            size={28}
            value={game.hour}
            numeric
            maxLength={5}
            setValue={hour => setGame({...game, hour: formatHour(hour)})}
            />
        </View>

          {(paid == false)
            ?
            <CheckboxView onPress={handleCheckbox}>
              <Checkbox>
                <Icon name="check" size={20} color="#686868"/>
              </Checkbox>
              <CheckboxLabel>Evento pago?</CheckboxLabel>
            </CheckboxView>
            :
            <CheckboxView onPress={handleCheckbox}>
              <CheckboxChecked>
                <Icon name="check" size={20} color="#fff"/>
              </CheckboxChecked>
              <CheckboxLabel>Evento pago!</CheckboxLabel>
            </CheckboxView>
          }

        {(paid == true)
            ?
            <Input
              label="Valor"
              icon="money"
              size={25}
              value={game.value}
              numeric
              maxLength={5}
              setValue={value => setGame({...game, value: formatMoney(value)})}
              />
            :
            <View />
        }

        <Input
          label="Descrição"
          multilineActive={true}
          value={game.description}
          setValue={description => setGame({...game, description})}
          />

        <SubmitButtonView>
          <SubmitButton onPress={handleSubmit}>
            <SubmitButtonText>Cadastrar partida</SubmitButtonText>
          </SubmitButton>
        </SubmitButtonView>
      </GameInfo>
    </Container>
  );
}

export default CreateEvent;