import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Platform, TouchableOpacity, View} from "react-native";
import Input from '../../Components/Input';
import { useAuth } from '../../Contexts/Auth';
import api from '../../services/api';
import DateTimePicker, {Event} from "@react-native-community/datetimepicker";

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
  formatMoney,
  hourToString,
  toDateString
} from '../../utils/functions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Header from '../../Components/Header';
import { Game } from '../../utils/types';

const CreateEvent: React.FC = ()=>{
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [game, setGame] = useState({} as Game);
  const [paid, setPaid] = useState(false);
  const [datePicker, setDatePicker] = useState(false);
  const [hourPicker, setHourPicker] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());

  const {user, signOut} = useAuth();

  async function sendData() {

    if (!user) return signOut();
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

      setDisableButton(true);
      navigation.reset({index: 0, routes: [{name: "Main"}]});
    } catch(err) {
      setDisableButton(true);

      if (err.response && err.response.status === 401) {
        Alert.alert(
          "Você ainda não é premium",
          "Somente usuários premium podem inserir mais de 5 jogos",
          [{
            text: "OK",
            onPress: () => navigation.reset({index: 0, routes: [{name: "Main"}]})
          }]);
      } else {
        navigation.reset({index: 0, routes: [{name: "Main"}]});
      }
    }
  }

  function handleCheckbox() {
    setPaid(!paid);
  }

  function enableButton() {
    if ((game.name && game.name.trim() !== '')
        && (game.type && game.type.trim() !== '')
        && (game.location && game.location.trim() !== '')
        && (game.date && game.date.trim() !== '')
        && (game.hour && game.hour.trim() !== '')
        && ((paid && game.value && game.value.trim() !== '') || (!paid))
       )
        {
          setDisableButton(false);
        } else setDisableButton(true);
  }

  function datePickerComponent()
  {
    let datePicker = <DateTimePicker
                       value={date}
                       onChange={(_: Event, date?: Date) => {
                            setDatePicker(false);
                            setDate(date || new Date());
                            setGame({...game, date: date ? toDateString(date) : ""});
                          }
                       }
                       mode="date"
                     />

    return datePicker;
  }

  function hourPickerComponent()
  {
    let datePicker = <DateTimePicker
                       value={hour}
                       onChange={(_: Event, date?: Date) => {
                            setHourPicker(false);
                            setHour(date || new Date());
                            setGame({...game, hour: date ? hourToString(date) : ""});
                          }
                       }
                       mode="time"
                     />

    return datePicker;
  }

  useEffect(() => {
    if (isFocused) enableButton();
  }, [game, paid, isFocused]);

  return (
    <Container>
      <Header />

      {datePicker && datePickerComponent()}
      {hourPicker && hourPickerComponent()}

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
          maxLength={17}
          setValue={type => setGame({...game, type})}
          />
        <Input
          label="Local"
          icon="map-marker"
          size={28}
          value={game.location}
          setValue={location => setGame({...game, location})}
          />

        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity activeOpacity={1} onPress={() => setDatePicker(true)} style={{flex: 1}}>
            <View pointerEvents="none">
              <Input
                label="Data"
                icon="calendar-o"
                size={25}
                value={game.date}
                numeric
                style={{flex:1, marginRight: 15}}
                maxLength={10}
                disabled={false}
                setValue={date => setGame({...game, date: formatDate(date)})}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={1} onPress={() => setHourPicker(true)} style={{flex: 1}}>
              <View pointerEvents="none">
                <Input
                  label="Hora"
                  icon="clock-o"
                  size={28}
                  value={game.hour}
                  numeric
                  style={{flex:1}}
                  maxLength={5}
                  disabled={false}
                  setValue={hour => setGame({...game, hour: formatHour(hour)})}
                  />
              </View>
            </TouchableOpacity>
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
          <SubmitButton
            disabled={disableButton ? true : false}
            style={{backgroundColor: disableButton ? "#686868" : "#007E33"}}
            onPress={sendData}>
            <SubmitButtonText>Cadastrar</SubmitButtonText>
          </SubmitButton>
        </SubmitButtonView>
      </GameInfo>
    </Container>
  );
}

export default CreateEvent;